import { updateProfile } from "@/api/profile.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { TMutationCallback, TProfileEntity } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = (callbacks?: TMutationCallback) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (updatedProfile) => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
            queryClient.setQueryData<TProfileEntity>(QUERY_KEYS.profile.byId(updatedProfile.id), updatedProfile);
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};