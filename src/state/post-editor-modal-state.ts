import { combine, devtools } from "zustand/middleware";
import { create } from "zustand/react";

type TCreateMode = {
    isOpen: true;
    type: "CREATE";
}

type TEditMode = {
    isOpen: true;
    type: "EDIT";
    postId: number;
    content: string;
    imageUrls: string[] | null;
}

type TOpenState = TCreateMode | TEditMode;

type TCloseState = {
    isOpen: false;
}

type TState = TOpenState | TCloseState;

const initialState = {
    isOpen: false
} as TState;

const usePostEditorModalState = create(
    devtools(
        combine(initialState, (setState, getState, store) => ({
            actions: {
                openCreate: () => {
                    setState({ isOpen: true, type: "CREATE" });
                },
                openEdit: (param: Omit<TEditMode, "isOpen" | "type">) => {
                    setState({ isOpen: true, type: "EDIT", ...param });
                },
                close: () => {
                    setState({ isOpen: false });
                }
            }
        })),
        {
            name: "postEditorModelState"
        }
    )
);

export const useOpenCreatePostModal = () => usePostEditorModalState(state => state.actions.openCreate);

export const useOpenEditPostModal = () => usePostEditorModalState(state => state.actions.openEdit);

export const usePostEditorModal = () => {
    const state = usePostEditorModalState();
    return state as typeof state & TState;
};