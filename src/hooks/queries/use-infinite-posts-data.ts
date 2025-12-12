import { fetchPosts } from "@/api/post.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useSession } from "@/state/session-state.ts";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export const useInfinitePostsData = () => {
    const queryClient = useQueryClient();
    const session = useSession();

    return useInfiniteQuery({
        queryKey: QUERY_KEYS.post.list,
        queryFn: async ({ pageParam }) => {
            const from = pageParam * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;
            const posts = await fetchPosts({ from, to, userId: session!.user.id });

            posts?.forEach(post => {
                queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
            });

            return posts?.map(post => post.id);
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return allPages.length;
        },
        staleTime: Infinity
    });
};