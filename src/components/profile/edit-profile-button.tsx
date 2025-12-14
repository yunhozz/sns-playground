import { Button } from "@/components/ui/button.tsx";
import { useOpenProfileEditorModal } from "@/state/profile-editor-modal-state.ts";

export default () => {
    const openProfileEditorModal = useOpenProfileEditorModal();

    const onClickEditProfileButton = () => {
        openProfileEditorModal();
    };

    return (
        <Button className={"cursor-pointer"}
                variant={"secondary"}
                onClick={onClickEditProfileButton}>
            프로필 수정
        </Button>
    );
}