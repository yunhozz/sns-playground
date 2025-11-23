import { API_URL } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";

export const fetchTodoById = async (id: string): Promise<ITodo> => {
    const response = await fetch(`${API_URL}/todos/${id}`);

    if (!response.ok) {
        throw new Error("Fetch Failed");
    }

    return await response.json();
};