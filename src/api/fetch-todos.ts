import { API_URL } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";

export async function fetchTodos() {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
        throw new Error("Fetch Failed");
    }

    const todos: ITodo[] = await response.json();

    return todos;
}