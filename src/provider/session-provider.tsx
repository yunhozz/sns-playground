import GlobalLoader from "@/components/global-loader.tsx";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import supabase from "@/lib/supabase.ts";
import { useIsSessionLoaded, useSession, useSetSession } from "@/state/session-state.ts";
import { type ReactNode, useEffect } from "react";

export default ({ children }: { children: ReactNode }) => {
    const session = useSession();
    const setSession = useSetSession();
    const isSessionLoaded = useIsSessionLoaded();

    const { data: profile, isLoading: isProfileLoading } = useProfileData(session?.user.id);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });
    }, []);

    if (!isSessionLoaded || isProfileLoading) {
        return <GlobalLoader/>;
    }

    return children;
}