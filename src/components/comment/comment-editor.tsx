import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment.ts";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";

export default ({ postId }: { postId: number }) => {
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

    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const onClickSubmitButton = () => {
        if (content.trim() === "") return;
        createComment({ postId, content });
    };

    return (
        <div className={"flex flex-col gap-2"}>
            <Textarea value={content} onChange={onChangeContent}/>
            <div className={"flex justify-end"}>
                <Button onClick={onClickSubmitButton}>작성</Button>
            </div>
        </div>
    );
}