import defaultAvatar from "@/assets/default-avatar.jpg";
import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import DeletePostButton from "@/components/post/delete-post-button.tsx";
import EditPostButton from "@/components/post/edit-post-button.tsx";
import LikePostButton from "@/components/post/like-post-button.tsx";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel.tsx";
import { usePostByIdData } from "@/hooks/queries/use-post-by-id-data.ts";
import { formatTimeAgo } from "@/lib/utils.ts";
import { useSession } from "@/state/session-state.ts";
import { MessageCircle } from "lucide-react";

export default ({ postId }: { postId: number }) => {
    const session = useSession();
    const { data: post, isPending, error } = usePostByIdData({ postId, type: "FEED" });

    if (isPending) return <Loader/>;
    if (error) return <Fallback/>;

    const userId = session?.user.id;
    const isMine = post.author_id === userId;

    return (
        <div className={"flex flex-col gap-4 border-b pb-8"}>
            <div className={"flex justify-between"}>
                <div className={"flex items-start gap-4"}>
                    <img className={"h-10 w-10"}
                         src={post.author.avatar_url || defaultAvatar}
                         alt={`${post.author.nickname}의 프로필 이미지`}/>
                    <div>
                        <div className={"font-bold hover:underline"}>
                            {post.author.nickname}
                        </div>
                        <div className={"text-muted-foreground text-sm"}>
                            {formatTimeAgo(post.created_at)}
                        </div>
                    </div>
                </div>
                <div className={"text-muted-foreground flex text-sm"}>
                    {isMine && (
                        <>
                            <EditPostButton {...post}/>
                            <DeletePostButton id={post.id}/>
                        </>
                    )}
                </div>
            </div>
            <div className={"flex cursor-pointer flex-col gap-5"}>
                <div className={"line-clamp-2 wrap-break-word whitespace-pre-wrap"}>
                    {post.content}
                </div>
                <Carousel>
                    <CarouselContent>
                        {post.image_urls?.map((url, index) => (
                            <CarouselItem className={`basis-3/5`} key={index}>
                                <div className={"overflow-hidden rounded-xl"}>
                                    <img className={"h-full max-h-[350px] w-full object-cover"} src={url}/>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className={"flex gap-2"}>
                <LikePostButton id={post.id} likeCount={post.like_count} isLiked={post.isLiked}/>
                <div
                    className={"hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm"}>
                    <MessageCircle className={"h-4 w-4"}/>
                    <span>댓글 달기</span>
                </div>
            </div>
        </div>
    );
}