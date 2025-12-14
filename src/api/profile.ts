import { deleteImagesInPath, uploadImage } from "@/api/image.ts";
import supabase from "@/lib/supabase.ts";
import { getRandomNickname } from "@/lib/utils.ts";

export const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase.from("profile")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) throw error;

    return data;
};

export const createProfile = async (userId: string) => {
    const { data, error } = await supabase.from("profile")
        .insert({
            id: userId,
            nickname: getRandomNickname()
        })
        .select()
        .single();

    if (error) throw error;

    return data;
};

export const updateProfile = async ({ userId, nickname, bio, avatarImageFile }: {
    userId: string,
    nickname?: string,
    bio?: string,
    avatarImageFile?: File
}) => {
    let uploadedAvatarImageUrl;

    if (avatarImageFile) {
        await deleteImagesInPath(`${userId}/avatar`);

        const fileExtension = avatarImageFile.name.split(".").pop() || "webp";
        const filePath = `${userId}/avatar/${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;

        uploadedAvatarImageUrl = await uploadImage({
            file: avatarImageFile,
            filePath
        });
    }

    const { data, error } = await supabase.from("profile")
        .update({
            nickname,
            bio,
            avatar_url: uploadedAvatarImageUrl
        })
        .eq("id", userId)
        .select()
        .single();

    if (error) throw error;

    return data;
};