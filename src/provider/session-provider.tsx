import GlobalLoader from "@/components/global-loader.tsx";
import supabase from "@/lib/supabase.ts";
import { useIsSessionLoaded, useSetSession } from "@/store/session.ts";
import { type ReactNode, useEffect } from "react";

export default ({ children }: { children: ReactNode }) => {
    const setSession = useSetSession();
    const isSessionLoaded = useIsSessionLoaded();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });
    }, []);

    if (!isSessionLoaded) {
        return <GlobalLoader/>;
    }

    return children;
}