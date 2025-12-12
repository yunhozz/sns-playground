import { fetchPostById } from "@/api/post.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useSession } from "@/state/session-state.ts";
import { useQuery } from "@tanstack/react-query";

export const usePostByIdData = ({ postId, type }: { postId: number, type: "FEED" | "DETAIL" }) => {
    const session = useSession();

    return useQuery({
        queryKey: QUERY_KEYS.post.byId(postId),
        queryFn: () => fetchPostById({ postId, userId: session!.user.id }),
        enabled: type === "DETAIL"
    });
};