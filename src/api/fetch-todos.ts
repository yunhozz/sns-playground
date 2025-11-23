import { API_URL } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";

export const fetchTodos = async (): Promise<ITodo[]> => {
    const response = await fetch(`${API_URL}/todos`);

    if (!response.ok) {
        throw new Error("Fetch Failed");
    }

    return await response.json();
};