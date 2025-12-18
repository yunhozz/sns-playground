import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment.ts";
import { useUpdateComment } from "@/hooks/mutations/comment/use-update-comment.ts";
import { type ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

type TCreateMode = {
    type: "CREATE",
    postId: number
};

type TEditMode = {
    type: "EDIT",
    commentId: number,
    initialContent: string,
    onClose: () => void
};

type TReplyMode = {
    type: "REPLY",
    postId: number,
    parentCommentId: number,
    rootCommentId: number,
    onClose: () => void
};

type TProps = TCreateMode | TEditMode | TReplyMode;

export default (props: TProps) => {
    const [content, setContent] = useState("");

    const { mutate: createComment, isPending: isCreateCommentPending } = useCreateComment({
        onSuccess: () => {
            setContent("");
            if (props.type === "REPLY") props.onClose();
        },
        onError: (error) => {
            toast.error("댓글 추가에 실패했습니다", {
                position: "top-center"
            });
        }
    });

    const { mutate: updateComment, isPending: isUpdateCommentPending } = useUpdateComment({
        onSuccess: () => {
            (props as TEditMode).onClose();
        },
        onError: (error) => {
            toast.error("댓글 수정에 실패했습니다", {
                position: "top-center"
            });
        }
    });

    useEffect(() => {
        if (props.type === "EDIT") {
            setContent(props.initialContent);
        }
    }, []);

    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const onClickCancelButton = () => {
        (props as TEditMode).onClose();
    };

    const onClickSubmitButton = () => {
        if (content.trim() === "") return;

        switch (props.type) {
            case "CREATE":
                createComment({
                    postId: props.postId,
                    content
                });
                break;
            case "REPLY":
                createComment({
                    postId: props.postId,
                    content,
                    parentCommentId: props.parentCommentId,
                    rootCommentId: props.rootCommentId
                });
                break;
            case "EDIT":
                updateComment({
                    id: props.commentId,
                    content
                });
                break;
        }
    };

    const isPending = isCreateCommentPending || isUpdateCommentPending;

    return (
        <div className={"flex flex-col gap-2"}>
            <Textarea value={content} onChange={onChangeContent} disabled={isPending}/>
            <div className={"flex justify-end gap-2"}>
                {props.type === "EDIT" || props.type === "REPLY" &&
                    <Button variant={"outline"}
                            onClick={onClickCancelButton}
                            disabled={isPending}>취소
                    </Button>}
                <Button onClick={onClickSubmitButton} disabled={isPending}>작성</Button>
            </div>
        </div>
    );
}