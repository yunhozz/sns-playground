import { deleteComment } from "@/api/comment.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useDeleteComment = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};