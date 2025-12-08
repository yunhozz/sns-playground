import { fetchPostById } from "@/api/post.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useQuery } from "@tanstack/react-query";

export const usePostByIdData = ({ postId, type }: { postId: number, type: "FEED" | "DETAIL" }) => {
    return useQuery({
        queryKey: QUERY_KEYS.post.byId(postId),
        queryFn: () => fetchPostById(postId),
        enabled: type === "DETAIL"
    });
};