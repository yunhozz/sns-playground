import { signUp } from "@/api/auth.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: signUp,
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};