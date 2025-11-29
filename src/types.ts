import type { Database } from "@/database.types.ts";

export interface ITodo {
    id: string;
    content: string;
    isDone: boolean;
}

export type TPost = Database["public"]["Tables"]["post"]["Row"];

export type TMutationCallback = {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onMutate?: () => void;
    onSettled?: () => void;
}