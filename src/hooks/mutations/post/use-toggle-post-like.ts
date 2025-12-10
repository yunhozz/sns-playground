import { togglePostLike } from "@/api/post.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useTogglePostLike = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: togglePostLike,
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};