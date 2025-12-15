import CommentEditor from "@/components/comment/comment-editor.tsx";
import CommentList from "@/components/comment/comment-list.tsx";
import PostItem from "@/components/post/post-item.tsx";
import { Navigate, useParams } from "react-router";

export default () => {
    const params = useParams();
    const postId = params.postId;

    if (!postId) return <Navigate to={"/"}/>;
    const postIdNum = Number(postId);

    return (
        <div className={"flex flex-col gap-5"}>
            <PostItem postId={postIdNum} type={"DETAIL"}/>
            <div className={"text-xl font-bold"}>댓글</div>
            <CommentEditor postId={postIdNum}/>
            <CommentList postId={postIdNum}/>
        </div>
    );
}