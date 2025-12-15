import CommentItem from "@/components/comment/comment-item.tsx";

export default () => {
    return (
        <div className={"flex flex-col gap-5"}>
            <CommentItem/>
            <CommentItem/>
            <CommentItem/>
        </div>
    );
}