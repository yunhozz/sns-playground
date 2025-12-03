import { Button } from "@/components/ui/button.tsx";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel.tsx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post.ts";
import { useOpenAlertModal } from "@/store/alert-modal.ts";
import { usePostEditorModal } from "@/store/post-editor-modal.ts";
import { useSession } from "@/store/session.ts";
import { ImageIcon, XIcon } from "lucide-react";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TImage = {
    file: File;
    previewUrl: string;
}

export default () => {
    const session = useSession();

    const [content, setContent] = useState("");
    const [images, setImages] = useState<TImage[]>([]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { isOpen, close } = usePostEditorModal();
    const openAlertModal = useOpenAlertModal();

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

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [content]);

    useEffect(() => {
        if (!isOpen) {
            images.forEach(image => {
                URL.revokeObjectURL(image.previewUrl);
            });
            return;
        }
        textareaRef.current?.focus();
        setContent("");
        setImages([]);
    }, [isOpen]);

    const onOpenChangeDialog = () => {
        if (content !== "" || images.length > 0) {
            openAlertModal({
                title: "게시글 작성이 마무리 되지 않았습니다",
                description: "이 화면에서 나가면 작성중이던 내용이 사라집니다.",
                onPositive: () => {
                    close();
                }
            });
            return;
        }
        close();
    };

    const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                setImages(prevImages => [
                    ...prevImages,
                    { file, previewUrl: URL.createObjectURL(file) }
                ]);
            });
        }
        e.target.value = "";
    };

    const onClickDeleteImage = (image: TImage) => {
        const previewUrl = image.previewUrl;
        setImages(prevImages => prevImages.filter(pi => pi.previewUrl !== previewUrl));
        URL.revokeObjectURL(previewUrl);
    };

    const onClickAddFileButton = () => {
        fileInputRef.current?.click();
    };

    const onClickSavePostButton = () => {
        if (content.trim() === "") return;
        createPost({
            content,
            images: images.map(image => image.file),
            userId: session!.user.id
        });
    };

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
                <Input className={"hidden"}
                       type={"file"}
                       accept={"image/*"}
                       onChange={onChangeFileInput}
                       ref={fileInputRef}
                       multiple/>
                {
                    images.length > 0 && (
                        <Carousel>
                            <CarouselContent>
                                {
                                    images.map(image => <CarouselItem className={"basis-2/5"} key={image.previewUrl}>
                                        <div className={"relative"}>
                                            <img className={"h-full w-full rounded-sm object-cover"}
                                                 src={image.previewUrl}/>
                                            <div
                                                className={"absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"}
                                                onClick={() => onClickDeleteImage(image)}>
                                                <XIcon className={"h-4 w-4 text-white"}/>
                                            </div>
                                        </div>
                                    </CarouselItem>)
                                }
                            </CarouselContent>
                        </Carousel>
                    )
                }
                <Button className={"cursor-pointer"}
                        variant={"outline"}
                        onClick={onClickAddFileButton}
                        disabled={isCreatePostPending}>
                    <ImageIcon/>이미지 추가
                </Button>
                <Button className={"cursor-pointer"}
                        onClick={onClickSavePostButton}
                        disabled={isCreatePostPending}>저장
                </Button>
            </DialogContent>
        </Dialog>
    );
}