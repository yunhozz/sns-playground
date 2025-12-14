import AlertModal from "@/components/modal/alert-modal.tsx";
import PostEditorModal from "@/components/modal/post-editor-modal.tsx";
import ProfileEditorModal from "@/components/modal/profile-editor-modal.tsx";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default ({ children }: { children: ReactNode }) => {
    return (
        <div>
            {createPortal(
                <>
                    <PostEditorModal/>
                    <AlertModal/>
                    <ProfileEditorModal/>
                </>,
                document.getElementById("modal-root")!
            )}
            {children}
        </div>
    );
}