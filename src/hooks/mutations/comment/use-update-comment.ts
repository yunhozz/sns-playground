import { updateComment } from "@/api/comment.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useUpdateComment = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: updateComment,
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};