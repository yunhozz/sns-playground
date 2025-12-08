import { Button } from "@/components/ui/button.tsx";
import { useOpenEditPostModal } from "@/state/post-editor-modal-state.ts";
import type { TPostEntity } from "@/types.ts";

export default (props: TPostEntity) => {
    const openEditPostModal = useOpenEditPostModal();

    const onClickEditButton = () => {
        openEditPostModal({
            postId: props.id,
            content: props.content,
            imageUrls: props.image_urls
        });
    };

    return (
        <Button className={"cursor-pointer"} onClick={onClickEditButton} variant={"ghost"}>
            수정
        </Button>
    );
}