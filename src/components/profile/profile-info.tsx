import defaultAvatar from "@/assets/default-avatar.jpg";
import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";

export default ({ userId }: { userId: string }) => {
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
        </div>
    );
}