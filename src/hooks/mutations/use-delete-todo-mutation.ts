import { deleteTodo } from "@/api/delete-todo.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: (deletedTodo) => {
            queryClient.setQueryData<ITodo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
                if (!prevTodos) {
                    return [];
                }
                return prevTodos.filter(prevTodo => prevTodo.id !== deletedTodo.id);
            });
        },
        onSettled: () => {}
    });
};