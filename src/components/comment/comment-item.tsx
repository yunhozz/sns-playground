import defaultAvatar from "@/assets/default-avatar.jpg";
import CommentEditor from "@/components/comment/comment-editor.tsx";
import { useDeleteComment } from "@/hooks/mutations/comment/use-delete-comment.ts";
import { formatTimeAgo } from "@/lib/utils.ts";
import { useOpenAlertModal } from "@/state/alert-modal-state.ts";
import { useSession } from "@/state/session-state.ts";
import type { TComment } from "@/types.ts";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default (props: TComment) => {
    const session = useSession();

    const [isEditing, setIsEditing] = useState(false);

    const { mutate: deleteComment, isPending: isDeleteCommentPending } = useDeleteComment({
        onError: (error) => {
            toast.error("댓글 삭제에 실패했습니다", {
                position: "top-center"
            });
        }
    });

    const openAlertModal = useOpenAlertModal();

    const toggleIsEditing = () => {
        setIsEditing(!isEditing);
    };

    const onClickDeleteButton = () => {
        openAlertModal({
            title: "댓글 삭제",
            description: "삭제된 댓글은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
            onPositive: () => {
                deleteComment(props.id);
            }
        });
    };

    const isMine = session?.user.id === props.author_id;

    return (
        <div className={"flex flex-col gap-8  border-b pb-5"}>
            <div className="flex items-start gap-4">
                <Link to={"#"}>
                    <div className="flex h-full flex-col">
                        <img className="h-10 w-10 rounded-full object-cover"
                             src={props.author.avatar_url || defaultAvatar}/>
                    </div>
                </Link>
                <div className="flex w-full flex-col gap-2">
                    <div className="font-bold">{props.author.nickname}</div>
                    {isEditing ?
                        <CommentEditor type={"EDIT"}
                                       commentId={props.id}
                                       initialContent={props.content}
                                       onClose={toggleIsEditing}/>
                        : <div>{props.content}</div>}
                    <div className="text-muted-foreground flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer hover:underline">댓글</div>
                            <div className="bg-border h-[13px] w-[2px]"></div>
                            <div>{formatTimeAgo(props.created_at)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isMine && (
                                <>
                                    <div className="cursor-pointer hover:underline"
                                         onClick={toggleIsEditing}>수정
                                    </div>
                                    <div className="bg-border h-[13px] w-[2px]"></div>
                                    <div className="cursor-pointer hover:underline"
                                         onClick={onClickDeleteButton}>삭제
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}