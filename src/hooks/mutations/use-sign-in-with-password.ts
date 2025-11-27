import { signInWithPassword } from "@/api/auth.ts";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithPassword = () => {
    return useMutation({
        mutationFn: signInWithPassword
    });
};