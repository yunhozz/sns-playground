import PostFeed from "@/components/post/post-feed.tsx";
import ProfileInfo from "@/components/profile/profile-info.tsx";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

export default () => {
    const params = useParams();
    const userId = params.userId;

    if (!userId) return <Navigate to={"/"} replace/>;

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <div className={"flex flex-col gap-10"}>
            <ProfileInfo userId={userId}/>
            <div className={"border-b"}></div>
            <PostFeed authorId={userId}/>
        </div>
    );
}