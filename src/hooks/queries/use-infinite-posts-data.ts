import { fetchPosts } from "@/api/post.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export const useInfinitePostsData = () => {
    return useInfiniteQuery({
        queryKey: QUERY_KEYS.post.list,
        queryFn: async ({ pageParam }) => {
            const from = pageParam * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;
            return await fetchPosts({ from, to });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return allPages.length;
        }
    });
};