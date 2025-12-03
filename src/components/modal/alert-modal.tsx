import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import { useAlertModal } from "@/store/alert-modal.ts";

export default () => {
    const alertModal = useAlertModal();
    if (!alertModal.isOpen) return null;

    const onClickCancelButton = () => {
        if (alertModal.onNegative) alertModal.onNegative();
        alertModal.actions.close();
    };

    const onClickActionButton = () => {
        if (alertModal.onPositive) alertModal.onPositive();
        alertModal.actions.close();
    };

    return (
        <AlertDialog open={alertModal.isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{alertModal.title}</AlertDialogTitle>
                    <AlertDialogDescription>{alertModal.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClickCancelButton}>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={onClickActionButton}>확인</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}