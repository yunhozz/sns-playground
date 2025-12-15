import CommentEditor from "@/components/comment/comment-editor.tsx";
import CommentList from "@/components/comment/comment-list.tsx";
import PostItem from "@/components/post/post-item.tsx";
import { Navigate, useParams } from "react-router";

export default () => {
    const params = useParams();
    const postId = params.postId;

    if (!postId) return <Navigate to={"/"}/>;

    return (
        <div className={"flex flex-col gap-5"}>
            <PostItem postId={Number(postId)} type={"DETAIL"}/>
            <div className={"text-xl font-bold"}>댓글</div>
            <CommentEditor postId={Number(postId)}/>
            <CommentList/>
        </div>
    );
}