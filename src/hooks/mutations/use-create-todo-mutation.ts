import { createTodo } from "@/api/create-todo.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,
        onSuccess: (newTodo) => {
            // refetching 없이 createTodo의 결과(newTodo)를 그대로 받아와서 새로운 데이터로 반환
            queryClient.setQueryData<ITodo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
                if (!prevTodos) {
                    return [newTodo];
                }
                return [...prevTodos, newTodo];
            });
        },
        onError: (error) => {
            window.alert(error.message);
        }
    });
};