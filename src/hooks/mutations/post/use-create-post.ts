import { createPost } from "@/api/post.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useCreatePost = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};