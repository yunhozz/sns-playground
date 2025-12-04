import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import PostItem from "@/components/post/post-item.tsx";
import { usePostsData } from "@/hooks/queries/use-posts-data.ts";

export default () => {
    const { data: posts, error, isPending } = usePostsData();

    if (error) return <Fallback/>;
    if (isPending) return <Loader/>;

    return (
        <div className={"flex flex-col gap-10"}>
            {
                posts.map(post => <PostItem key={post.id} {...post}/>)
            }
        </div>
    );
}