import type { ITodo } from "@/types.ts";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand/react";

const initialState: { todos: ITodo[] } = {
    todos: []
};

const useTodosState = create(
    immer(
        combine(initialState, (setState) => ({
            actions: {
                createTodo: (content: string) => {
                    setState(state => {
                        state.todos.push({
                            id: new Date().getTime().toString(),
                            content,
                            isDone: false
                        });
                    });
                },
                deleteTodo: (targetId: string) => {
                    setState(state => {
                        state.todos = state.todos.filter(todo => todo.id !== targetId);
                    });
                }
            }
        }))
    )
);

export const useTodos = () => {
    return useTodosState(store => store.todos);
};

export const useCreateTodo = () => {
    return useTodosState(store => store.actions.createTodo);
};

export const useDeleteTodo = () => {
    return useTodosState(store => store.actions.deleteTodo);
};