import { combine, devtools } from "zustand/middleware";
import { create } from "zustand/react";

const initialState = {
    isOpen: false
};

const useProfileEditorModalState = create(
    devtools(
        combine(initialState, (setState, getState, store) => ({
            actions: {
                open: () => setState({ isOpen: true }),
                close: () => setState({ isOpen: false })
            }
        })),
        {
            name: "ProfileEditorModalState"
        }
    )
);

export const useProfileEditorModal = () => useProfileEditorModalState();

export const useOpenProfileEditorModal = () => useProfileEditorModalState(state => state.actions.open);