import type { Database } from "@/database.types.ts";

export interface ITodo {
    id: string;
    content: string;
    isDone: boolean;
}

export type TPostEntity = Database["public"]["Tables"]["post"]["Row"];

export type TProfileEntity = Database["public"]["Tables"]["profile"]["Row"];

export type TCommentEntity = Database["public"]["Tables"]["comment"]["Row"];

export type TPost = TPostEntity & { author: TProfileEntity, isLiked: boolean };

export type TComment = TCommentEntity & { author: TProfileEntity };

export type TNestedComment = TComment & { parentComment?: TComment, children: TNestedComment[] };

export type TMutationCallback = {
    onSuccess?: () => void,
    onError?: (error: Error) => void,
    onMutate?: () => void,
    onSettled?: () => void,
};