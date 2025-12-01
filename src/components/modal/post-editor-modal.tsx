import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post.ts";
import { usePostEditorModal } from "@/store/post-editor-modal.ts";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default () => {
    const [content, setContent] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { isOpen, close } = usePostEditorModal();
    const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
        onSuccess: () => {
            close();
        },
        onError: () => {
            toast.error("포스트 생성에 실패했습니다.", {
                position: "top-center"
            });
        }
    });

    const onOpenChangeDialog = () => {
        close();
    };

    const onClickSavePostButton = () => {
        if (content.trim() === "") return;
        createPost(content);
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [content]);

    useEffect(() => {
        if (!isOpen) return;
        textareaRef.current?.focus();
        setContent("");
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChangeDialog}>
            <DialogContent className={"max-h-[90vh]"}>
                <DialogTitle>포스트 작성</DialogTitle>
                <textarea className={"max-h-125 min-h-25 focus:outline-none"}
                          value={content}
                          onChange={e => setContent(e.target.value)}
                          ref={textareaRef}
                          disabled={isCreatePostPending}
                          placeholder={"무슨 일이 있었나요?"}/>
                <Button className={"cursor-pointer"} variant={"outline"} disabled={isCreatePostPending}>
                    <ImageIcon/>
                    이미지 추가
                </Button>
                <Button className={"cursor-pointer"}
                        onClick={onClickSavePostButton}
                        disabled={isCreatePostPending}>저장
                </Button>
            </DialogContent>
        </Dialog>
    );
}