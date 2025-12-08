import { deleteImagesInPath } from "@/api/image.ts";
import { deletePost } from "@/api/post.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = (callbacks?: TMutationCallback) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePost,
        onSuccess: async (deletedPost) => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
            const imageUrls = deletedPost.image_urls;

            if (imageUrls && imageUrls.length > 0) {
                await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
            }

            queryClient.resetQueries({
                queryKey: QUERY_KEYS.post.list
            });
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};