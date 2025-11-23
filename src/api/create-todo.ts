import { API_URL } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";

export const createTodo = async (content: string): Promise<ITodo> => {
    const response = await fetch(`${API_URL}/todos`, {
        method: "post",
        body: JSON.stringify({
            content,
            isDone: false
        })
    });

    if (!response.ok) {
        throw new Error("Create Todo Failed");
    }

    return await response.json();
};