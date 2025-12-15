import CommentItem from "@/components/comment/comment-item.tsx";
import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import { useCommentsData } from "@/hooks/queries/use-comments-data.ts";

export default ({ postId }: { postId: number }) => {
    const {
        data: comments,
        error: fetchCommentsError,
        isPending: isFetchCommentsPending
    } = useCommentsData(postId);

    if (fetchCommentsError) return <Fallback/>;
    if (isFetchCommentsPending) return <Loader/>;

    return (
        <div className={"flex flex-col gap-5"}>
            {comments.map(comment => <CommentItem key={comment.id} {...comment}/>)}
        </div>
    );
}