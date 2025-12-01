import supabase from "@/lib/supabase.ts";

export const createPost = async (content: string) => {
    const { data, error } = await supabase.from("post")
        .insert({ content });

    if (error) throw error;
    return data;
};