import { signInWithPassword } from "@/api/auth.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithPassword = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: signInWithPassword,
        onError: (error) => {
            console.error(error);
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};