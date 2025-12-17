import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment.ts";
import { useUpdateComment } from "@/hooks/mutations/comment/use-update-comment.ts";
import { type ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

type TCreateMode = {
    type: "CREATE",
    postId: number
}

type TEditMode = {
    type: "EDIT",
    commentId: number,
    initialContent: string,
    onClose: () => void
}

type TProps = TCreateMode | TEditMode;

export default (props: TProps) => {
    const [content, setContent] = useState("");

    const { mutate: createComment, isPending: isCreateCommentPending } = useCreateComment({
        onSuccess: () => {
            setContent("");
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

        if (props.type === "CREATE") {
            createComment({
                postId: props.postId,
                content
            });
        } else {
            updateComment({
                id: props.commentId,
                content
            });
        }
    };

    const isPending = isCreateCommentPending || isUpdateCommentPending;

    return (
        <div className={"flex flex-col gap-2"}>
            <Textarea value={content} onChange={onChangeContent} disabled={isPending}/>
            <div className={"flex justify-end gap-2"}>
                {props.type === "EDIT" &&
                    <Button variant={"outline"}
                            onClick={onClickCancelButton}
                            disabled={isPending}>취소
                    </Button>}
                <Button onClick={onClickSubmitButton} disabled={isPending}>작성</Button>
            </div>
        </div>
    );
}