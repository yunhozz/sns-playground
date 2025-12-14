import supabase from "@/lib/supabase.ts";
import type { Provider, Session, User, WeakPassword } from "@supabase/supabase-js";

export const signUp = async ({ email, password }: { email: string, password: string }): Promise<{
    user: User | null,
    session: Session | null
}> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
};

export const signInWithPassword = async ({ email, password }: { email: string, password: string }): Promise<{
    user: User | null,
    session: Session | null,
    weakPassword?: WeakPassword | null | undefined
}> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
};

export const signInWithOAuth = async (provider: Provider): Promise<{
    provider: Provider,
    url: string
}> => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw error;
    return data;
};

export const requestPasswordResetEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`
    });
    if (error) throw error;
    return data;
};

export const updatePassword = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
        password
    });
    if (error) throw error;
    return data;
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        await supabase.auth.signOut({ scope: "local" });
    }
};