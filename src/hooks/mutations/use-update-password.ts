import { updatePassword } from "@/api/auth.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};