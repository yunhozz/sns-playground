import { updateTodo } from "@/api/update-todo.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTodo,
        // 낙관적 업데이트
        onMutate: async (updatedTodo) => {
            // 해당 key에 대해 캐시 조회 요청을 모두 취소시킴
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.todo.list
            });

            // 요청 실패를 방지하기 위해 이전 캐시 데이터를 불러옴
            const prevTodos = queryClient.getQueryData<ITodo[]>(QUERY_KEYS.todo.list);

            queryClient.setQueryData<ITodo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
                if (!prevTodos) {
                    return [];
                }
                return prevTodos.map(todo => todo.id === updatedTodo.id
                    ? { ...todo, ...updatedTodo }
                    : todo
                );
            });

            return { prevTodos };
        },
        // 업데이트 에러 발생 시 처리
        onError: (error, variables, onMutateResult) => {
            if (onMutateResult && onMutateResult.prevTodos) {
                queryClient.setQueryData<ITodo[]>(QUERY_KEYS.todo.list, onMutateResult.prevTodos);
            }
        },
        // 데이터 무결성 검증
        onSettled: () => {
            // 해당 key에 대해서 캐시 무효화 -> stale 상태로 변경 -> refetching 대상
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.todo.list
            });
        }
    });
};