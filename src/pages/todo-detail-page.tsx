import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id.ts";
import { useParams } from "react-router";

export default () => {
    const params = useParams();
    const { data, isLoading, error } = useTodoDataById(String(params.id));

    if (isLoading) return <div>로딩 중 입니다...</div>;
    if (error || !data) return <div>오류가 발생했습니다.</div>;

    return (
        <div>{data.content}</div>
    );
}