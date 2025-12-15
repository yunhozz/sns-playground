import { createComment } from "@/api/comment.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useCreateComment = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};