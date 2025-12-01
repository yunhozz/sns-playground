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

export const updateTodo = async (todo: Partial<ITodo> & { id: string }): Promise<ITodo> => {
    const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "patch",
        body: JSON.stringify(todo)
    });

    if (!response.ok) {
        throw new Error("Update Todo Failed");
    }

    return await response.json();
};

export const deleteTodo = async (id: string): Promise<ITodo> => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "delete"
    });

    if (!response.ok) {
        throw new Error("Delete Todo Failed");
    }

    return await response.json();
};

export const fetchTodos = async (): Promise<ITodo[]> => {
    const response = await fetch(`${API_URL}/todos`);

    if (!response.ok) {
        throw new Error("Fetch Failed");
    }

    return await response.json();
};

export const fetchTodoById = async (id: string): Promise<ITodo> => {
    const response = await fetch(`${API_URL}/todos/${id}`);

    if (!response.ok) {
        throw new Error("Fetch Failed");
    }

    return await response.json();
};