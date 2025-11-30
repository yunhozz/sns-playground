import { createProfile, fetchProfile } from "@/api/profile.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useSession } from "@/store/session.ts";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export const useProfileData = (userId?: string) => {
    const session = useSession();

    return useQuery({
        queryKey: QUERY_KEYS.profile.byId(userId!),
        queryFn: async () => {
            try {
                return await fetchProfile(userId!);
            } catch (error) {
                const isMine = userId === session?.user.id;
                const isProfileNotExist = (error as PostgrestError).code === "PGRST116";
                // 내 프로필 데이터가 없을 때
                if (isMine && isProfileNotExist) {
                    return await createProfile(userId!);
                }
                throw error;
            }
        },
        enabled: !!userId
    });
};