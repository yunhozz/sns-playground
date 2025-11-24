import TodoEditor from "@/components/todo-list/todo-editor.tsx";
import TodoItem from "@/components/todo-list/todo-item.tsx";
import { useTodosData } from "@/hooks/queries/use-todos-data.ts";

export default () => {
    // const todos = useTodos();
    const { data: todoIds, isLoading, error } = useTodosData();

    if (isLoading) return <div>로딩 중 입니다...</div>;
    if (error) return <div>오류가 발생했습니다.</div>;

    return (
        <div className={"p-5 flex flex-col gap-5"}>
            <h1 className={"text-2xl font-bold"}>TodoList</h1>
            <TodoEditor/>
            {
                todoIds?.map(todoId => <TodoItem key={todoId} id={todoId}/>)
            }
        </div>
    );
}