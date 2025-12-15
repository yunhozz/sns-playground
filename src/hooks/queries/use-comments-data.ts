import { fetchComments } from "@/api/comment.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useQuery } from "@tanstack/react-query";

export const useCommentsData = (postId: number) => {
    return useQuery({
        queryKey: QUERY_KEYS.comment.post(postId),
        queryFn: () => fetchComments(postId)
    });
};