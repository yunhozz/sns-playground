import { createComment } from "@/api/comment.ts";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useSession } from "@/state/session-state.ts";
import type { TComment, TMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = (callbacks?: TMutationCallback) => {
    const queryClient = useQueryClient();

    const session = useSession();
    const { data: profile } = useProfileData(session?.user.id);

    return useMutation({
        mutationFn: createComment,
        onSuccess: (newComment) => {
            if (callbacks?.onSuccess) callbacks.onSuccess();

            queryClient.setQueryData<TComment[]>(
                QUERY_KEYS.comment.post(newComment.post_id),
                (comments) => {
                    if (!comments)
                        throw new Error("댓글이 캐시 데이터에 보관되어 있지 않습니다");
                    if (!profile)
                        throw new Error("사용자의 프로필 정보를 찾을 수 없습니다");

                    return [{ ...newComment, author: profile }, ...comments];
                }
            );
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error);
        }
    });
};