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

const initialStore = {
    isOpen: false
} as TState;

const useAlertModalStore = create(
    devtools(
        combine(initialStore, (setState, getState, store) => ({
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
            name: "alertModalStore"
        }
    )
);

export const useAlertModal = () => {
    const store = useAlertModalStore();
    return store as typeof store & TState;
};

export const useOpenAlertModal = () => useAlertModalStore(state => state.actions.open);