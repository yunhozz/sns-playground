import { fetchTodos } from "@/api/fetch-todos.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { ITodo } from "@/types.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// export const useTodosData = () => {
//     const [todos, setTodos] = useState([] as ITodo[]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState();
//
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             try {
//                 const todos = await fetchTodos();
//                 setTodos(todos);
//             } catch (err) {
//                 setError(err as any);
//             }
//         };
//         fetchData();
//     }, []);
//
//     return { todos, isLoading, error };
// };

export const useTodosData = () => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: QUERY_KEYS.todo.list,
        queryFn: async () => {
            const todos = await fetchTodos();
            todos.forEach(todo => {
                queryClient.setQueryData<ITodo>(QUERY_KEYS.todo.detail(todo.id), todo);
            });

            return todos.map(todo => todo.id);
        }
    });
};