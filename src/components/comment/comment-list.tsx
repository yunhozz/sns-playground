import CommentItem from "@/components/comment/comment-item.tsx";
import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import { useCommentsData } from "@/hooks/queries/use-comments-data.ts";
import type { TComment, TNestedComment } from "@/types.ts";

const toNestedComments = (comments: TComment[]): TNestedComment[] => {
    const result: TNestedComment[] = [];
    comments.forEach(comment => {
        // 최상위 댓글일 경우
        if (!comment.parent_comment_id) {
            result.push({
                ...comment,
                children: []
            });
        } else { // 대댓글일 경우
            const parentCommentIndex = result.findIndex(item => item.id === comment.parent_comment_id);
            const parentComment = result[parentCommentIndex];

            parentComment.children.push({
                ...comment,
                children: [],
                parentComment
            });
        }
    });

    return result;
};

export default ({ postId }: { postId: number }) => {
    const {
        data: comments,
        error: fetchCommentsError,
        isPending: isFetchCommentsPending
    } = useCommentsData(postId);

    if (fetchCommentsError) return <Fallback/>;
    if (isFetchCommentsPending) return <Loader/>;

    const nestedComments = toNestedComments(comments);

    return (
        <div className={"flex flex-col gap-5"}>
            {nestedComments.map(comment => <CommentItem key={comment.id} {...comment}/>)}
        </div>
    );
}