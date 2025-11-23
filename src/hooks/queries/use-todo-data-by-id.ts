import { fetchTodoById } from "@/api/fetch-todo-by-id.ts";
import { useQuery } from "@tanstack/react-query";

export const useTodoDataById = (id: string) => useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ["todos", id]
});