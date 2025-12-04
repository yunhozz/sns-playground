import { fetchPosts } from "@/api/post.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useQuery } from "@tanstack/react-query";

export const usePostsData = () => {
    return useQuery({
        queryKey: QUERY_KEYS.post.list,
        queryFn: () => fetchPosts()
    });
};