import { API_URL } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";

export async function updateTodo(todo: Partial<ITodo> & { id: string }): Promise<ITodo> {
    const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "patch",
        body: JSON.stringify(todo)
    });

    if (!response.ok) {
        throw new Error("Update Todo Failed");
    }

    return await response.json();
}