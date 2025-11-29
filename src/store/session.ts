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

const useSessionStore = create(
    devtools(
        combine(initialState, (setState, getState, store) => ({
            actions: {
                setSession: (session: Session | null) => {
                    setState({ session, isLoaded: true });
                }
            }
        })),
        {
            name: "sessionStore"
        }
    )
);

export const useSession = () => useSessionStore(state => state.session);

export const useIsSessionLoaded = () => useSessionStore(state => state.isLoaded);

export const useSetSession = () => useSessionStore(state => state.actions.setSession);