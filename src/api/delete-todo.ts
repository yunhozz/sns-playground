import { API_URL } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";

export const deleteTodo = async (id: string): Promise<ITodo> => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "delete"
    });

    if (!response.ok) {
        throw new Error("Delete Todo Failed");
    }

    return await response.json();
};