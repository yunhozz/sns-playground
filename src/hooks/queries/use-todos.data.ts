import { fetchTodos } from "@/api/fetch-todos.ts";
import type { ITodo } from "@/types.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useTodosDataV1 = () => {
    const [todos, setTodos] = useState([] as ITodo[]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const todos = await fetchTodos();
                setTodos(todos);
            } catch (err) {
                setError(err as any);
            }
        };
        fetchData();
    }, []);

    return { todos, isLoading, error };
};

export const useTodosDataV2 = () => useQuery({
    queryFn: fetchTodos,
    queryKey: ["todos"]
});