import { signUp } from "@/api/auth.ts";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
    return useMutation({
        mutationFn: signUp
    });
};