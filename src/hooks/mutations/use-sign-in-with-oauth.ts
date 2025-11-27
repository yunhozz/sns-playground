import { signInWithOAuth } from "@/api/auth.ts";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithOauth = () => {
    return useMutation({
        mutationFn: signInWithOAuth
    });
};