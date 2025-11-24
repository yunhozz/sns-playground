import { deleteTodo } from "@/api/delete-todo.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: (deletedTodo) => {
            const deletedTodoId = deletedTodo.id;

            queryClient.removeQueries({
                queryKey: QUERY_KEYS.todo.detail(deletedTodoId)
            });

            queryClient.setQueryData<string[]>(QUERY_KEYS.todo.list, (prevTodoIds) => {
                if (!prevTodoIds) {
                    return [];
                }
                return prevTodoIds.filter(id => id !== deletedTodoId);
            });
        }
    });
};