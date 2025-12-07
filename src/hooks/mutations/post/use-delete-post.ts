import { deleteImagesInPath } from "@/api/image.ts";
import { deletePost } from "@/api/post.ts";
import type { TMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";

export const useDeletePost = (callbacks?: TMutationCallback) => {
    return useMutation({
        mutationFn: deletePost,
        onSuccess: async (deletedPost) => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
            if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
                await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
            }
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};