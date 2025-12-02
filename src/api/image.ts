import { BUCKET_NAME } from "@/lib/constants.ts";
import supabase from "@/lib/supabase.ts";

export const uploadImage = async ({ file, filePath }: { file: File, filePath: string }) => {
    const { data, error } = await supabase.storage.from(BUCKET_NAME)
        .upload(filePath, file);

    if (error) throw error;

    const {
        data: { publicUrl }
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data?.path);

    return publicUrl;
};