import { uploadImage } from "@/api/image.ts";
import supabase from "@/lib/supabase.ts";
import type { TPostEntity } from "@/types.ts";

export const fetchPosts = async () => {
    const { data, error } = await supabase.from("post")
        .select("*, author: profile!author_id (*)")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
};

export const createPost = async (content: string) => {
    const { data, error } = await supabase.from("post")
        .insert({ content })
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updatePost = async (post: Partial<TPostEntity> & { id: number }) => {
    const { data, error } = await supabase.from("post")
        .update(post)
        .eq("id", post.id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deletePost = async (id: number) => {
    const { data, error } = await supabase.from("post")
        .delete()
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const createPostWithImages = async ({ content, images, userId }: {
    content: string,
    images: File[],
    userId: string
}) => {
    const post = await createPost(content);
    if (images.length === 0) return post;

    try {
        const imageUrls = await Promise.all(
            images.map(image => {
                const fileExtension = image.name.split(".").pop() || "webp";
                const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
                const filePath = `${userId}/${post.id}/${fileName}`;
                return uploadImage({ file: image, filePath });
            })
        );

        return await updatePost({
            id: post.id,
            image_urls: imageUrls
        });
    } catch (error) {
        await deletePost(post.id);
        throw error;
    }
};