import { createPostWithImages } from "@/api/post.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = (callbacks?: TMutationCallback) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPostWithImages,
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess();

            queryClient.resetQueries({
                queryKey: QUERY_KEYS.post.list
            });
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};