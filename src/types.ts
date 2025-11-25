import type { Database } from "@/database.types.ts";

export interface ITodo {
    id: string;
    content: string;
    isDone: boolean;
}

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];