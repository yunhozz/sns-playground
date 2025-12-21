import type { Session } from "@supabase/supabase-js";
import { combine, devtools } from "zustand/middleware";
import { create } from "zustand/react";

type TState = {
    isLoaded: boolean;
    session: Session | null;
}

const initialState = {
    isLoaded: false,
    session: null
} as TState;

const useSessionState = create(
    devtools(
        combine(initialState, (setState, getState, store) => ({
            actions: {
                setSession: (session: Session | null) => {
                    setState({ session, isLoaded: true });
                }
            }
        })),
        {
            name: "SessionState"
        }
    )
);

export const useSession = () => useSessionState(state => state.session);

export const useIsSessionLoaded = () => useSessionState(state => state.isLoaded);

export const useSetSession = () => useSessionState(state => state.actions.setSession);