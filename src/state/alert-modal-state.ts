import { combine, devtools } from "zustand/middleware";
import { create } from "zustand/react";

type TOpenState = {
    isOpen: true;
    title: string;
    description: string;
    onPositive?: () => void;
    onNegative?: () => void;
};

type TCloseState = {
    isOpen: false;
};

type TState = TOpenState | TCloseState;

const initialState = {
    isOpen: false
} as TState;

const useAlertModalState = create(
    devtools(
        combine(initialState, (setState, getState, store) => ({
            actions: {
                open: (params: Omit<TOpenState, "isOpen">) => {
                    setState({ ...params, isOpen: true });
                },
                close: () => {
                    setState({ isOpen: false });
                }
            }
        })),
        {
            name: "AlertModalState"
        }
    )
);

export const useAlertModal = () => {
    const state = useAlertModalState();
    return state as typeof state & TState;
};

export const useOpenAlertModal = () => useAlertModalState(state => state.actions.open);