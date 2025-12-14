import defaultAvatar from "@/assets/default-avatar.jpg";
import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useUpdateProfile } from "@/hooks/mutations/profile/use-update-profile.ts";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import { useProfileEditorModal } from "@/state/profile-editor-modal-state.ts";
import { useSession } from "@/state/session-state.ts";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TImage = {
    file: File;
    previewUrl: string;
}

export default () => {
    const session = useSession();

    const [avatarImage, setAvatarImage] = useState<TImage | null>(null);
    const [nickname, setNickname] = useState("");
    const [bio, setBio] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        data: profile,
        error: fetchProfileError,
        isPending: isFetchProfilePending
    } = useProfileData(session?.user.id);

    const {
        isOpen,
        actions: { close }
    } = useProfileEditorModal();

    const { mutate: updateProfile, isPending: isUpdateProfilePending } = useUpdateProfile({
        onSuccess: () => {
            close();
        },
        onError: (error) => {
            toast.error("프로필 수정에 실패했습니다", {
                position: "top-center"
            });
        }
    });

    useEffect(() => {
        if (!isOpen && avatarImage) {
            URL.revokeObjectURL(avatarImage.previewUrl);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && profile) {
            setNickname(profile.nickname);
            setBio(profile.bio);
            setAvatarImage(null);
        }
    }, [isOpen, profile]);

    const onClickAvatarImage = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const onChangeAvatarImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];

        if (avatarImage) {
            URL.revokeObjectURL(avatarImage.previewUrl);
        }

        setAvatarImage({
            file,
            previewUrl: URL.createObjectURL(file)
        });
    };

    const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const onChangeBio = (e: ChangeEvent<HTMLInputElement>) => {
        setBio(e.target.value);
    };

    const onClickEditButton = () => {
        if (nickname.trim() === "") return;
        updateProfile({
            userId: session!.user.id,
            nickname,
            bio,
            avatarImageFile: avatarImage?.file
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className={"flex flex-col gap-5"}>
                <DialogTitle>프로필 수정하기</DialogTitle>
                {fetchProfileError && <Fallback/>}
                {isFetchProfilePending && <Loader/>}
                {!fetchProfileError && !isFetchProfilePending && (
                    <>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"text-muted-foreground"}>프로필 이미지</div>
                            <Input className={"hidden"}
                                   type={"file"}
                                   accept={"image/*"}
                                   onChange={onChangeAvatarImage}
                                   ref={fileInputRef}
                                   disabled={isUpdateProfilePending}/>
                            <img className={"h-20 w-20 cursor-pointer rounded-full object-cover"}
                                 src={avatarImage?.previewUrl || profile.avatar_url || defaultAvatar}
                                 onClick={onClickAvatarImage}/>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"text-muted-foreground"}>닉네임</div>
                            <input className={"border border-input rounded-md px-3 py-2 text-sm"}
                                   value={nickname}
                                   onChange={onChangeNickname}
                                   disabled={isUpdateProfilePending}/>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"text-muted-foreground"}>소개</div>
                            <input className={"border border-input rounded-md px-3 py-2 text-sm"}
                                   value={bio}
                                   onChange={onChangeBio}
                                   disabled={isUpdateProfilePending}/>
                        </div>
                        <Button className={"cursor-pointer"}
                                onClick={onClickEditButton}
                                disabled={isUpdateProfilePending}>
                            수정하기
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}