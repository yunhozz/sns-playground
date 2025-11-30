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