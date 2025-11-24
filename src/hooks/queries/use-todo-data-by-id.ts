import { fetchTodoById } from "@/api/fetch-todo-by-id.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useQuery } from "@tanstack/react-query";

export const useTodoDataById = (id: string, type: "LIST" | "DETAIL") => useQuery({
    queryKey: QUERY_KEYS.todo.detail(id),
    queryFn: () => fetchTodoById(id),
    enabled: type === "DETAIL"
});