import { updateComment } from "@/api/comment.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { TComment, TMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateComment = (callbacks?: TMutationCallback) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateComment,
        onSuccess: (updatedComment) => {
            if (callbacks?.onSuccess) callbacks.onSuccess();

            queryClient.setQueryData<TComment[]>(
                QUERY_KEYS.comment.post(updatedComment.post_id),
                (comments) => {
                    if (!comments)
                        throw new Error("댓글이 캐시 데이터에 보관되어 있지 않습니다");

                    return comments.map(comment => {
                        if (comment.id === updatedComment.id) {
                            return { ...comment, ...updatedComment };
                        }
                        return comment;
                    });
                }
            );
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};