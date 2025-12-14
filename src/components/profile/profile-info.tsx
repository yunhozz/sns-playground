import defaultAvatar from "@/assets/default-avatar.jpg";
import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import EditProfileButton from "@/components/profile/edit-profile-button.tsx";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import { useSession } from "@/state/session-state.ts";

export default ({ userId }: { userId: string }) => {
    const session = useSession();

    const {
        data: profile,
        error: fetchProfileError,
        isPending: isFetchProfilePending
    } = useProfileData(userId);

    if (fetchProfileError) return <Fallback/>;
    if (isFetchProfilePending) return <Loader/>;

    return (
        <div className={"flex flex-col items-center justify-center gap-5"}>
            <img className={"h-30 w-30 rounded-full object-cover"} src={profile.avatar_url || defaultAvatar}/>
            <div className={"flex flex-col items-center gap-2"}>
                <div className={"text-xl font-bold"}>{profile.nickname}</div>
                <div className={"text-muted-foreground"}>{profile.bio}</div>
            </div>
            {session?.user.id === userId && <EditProfileButton/>}
        </div>
    );
}