import { updatePost } from "@/api/post.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePost = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};