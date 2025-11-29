import { signInWithOAuth } from "@/api/auth.ts";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithOAuth = () => {
    return useMutation({
        mutationFn: signInWithOAuth
    });
};