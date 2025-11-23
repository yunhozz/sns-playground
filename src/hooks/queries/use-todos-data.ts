import { fetchTodos } from "@/api/fetch-todos.ts";
import { useQuery } from "@tanstack/react-query";

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

export const useTodosData = () => useQuery({
    queryFn: fetchTodos,
    queryKey: ["todos"]
});