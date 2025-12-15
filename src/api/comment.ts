import supabase from "@/lib/supabase.ts";

export const createComment = async ({ postId, content }: { postId: number, content: string }) => {
    const { data, error } = await supabase.from("comment")
        .insert({
            post_id: postId,
            content
        })
        .select()
        .single();

    if (error) throw error;

    return data;
};