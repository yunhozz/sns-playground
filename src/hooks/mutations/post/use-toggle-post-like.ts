import { togglePostLike } from "@/api/post.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { TMutationCallback, TPost } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTogglePostLike = (callbacks?: TMutationCallback) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: togglePostLike,
        onMutate: async ({ postId }) => {
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.post.byId(postId)
            });

            const prevPost = queryClient.getQueryData<TPost>(QUERY_KEYS.post.byId(postId));

            queryClient.setQueryData<TPost>(QUERY_KEYS.post.byId(postId), (post) => {
                if (!post) throw new Error("포스트가 존재하지 않습니다.");
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1
                };
            });

            return { prevPost };
        },
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess();
        },
        onError: (error, _, context) => {
            if (context && context.prevPost) {
                queryClient.setQueryData(QUERY_KEYS.post.byId(context.prevPost.id), context.prevPost);
            }
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};