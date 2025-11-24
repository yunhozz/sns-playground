import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id.ts";
import { useParams } from "react-router";

export default () => {
    const params = useParams();
    const { data: todo, isLoading, error } = useTodoDataById(String(params.id), "DETAIL");

    if (isLoading) return <div>로딩 중 입니다...</div>;
    if (error || !todo) return <div>오류가 발생했습니다.</div>;

    return (
        <div>{todo.content}</div>
    );
}