import { signInWithOAuth } from "@/api/auth.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithOAuth = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: signInWithOAuth,
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};