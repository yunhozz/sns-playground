import { createTodo } from "@/api/create-todo.ts";
import { useMutation } from "@tanstack/react-query";

export const useCreateTodoMutation = () => useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
        window.location.reload();
    },
    onError: (err) => {
        window.alert(err.message);
    }
});