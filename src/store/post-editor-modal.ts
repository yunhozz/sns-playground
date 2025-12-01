import { combine, devtools } from "zustand/middleware";
import { create } from "zustand/react";

const initialStore: { isOpen: boolean } = {
    isOpen: false
};

const usePostEditorModalStore = create(
    devtools(
        combine(initialStore, (setState, getState, store) => ({
            actions: {
                open: () => {
                    setState({ isOpen: true });
                },
                close: () => {
                    setState({ isOpen: false });
                }
            }
        })),
        {
            name: "postEditorModelStore"
        }
    )
);

export const useOpenPostEditorModal = () => usePostEditorModalStore(state => state.actions.open);

export const usePostEditorModal = () => {
    const { isOpen, actions: { open, close } } = usePostEditorModalStore();
    return { isOpen, open, close };
};