import { Button } from "@/components/ui/button.tsx";
import { useDeleteTodo } from "@/store/todos.ts";
import type { ITodo } from "@/types.ts";
import { Link } from "react-router";

export default ({ id, content }: ITodo) => {
    const deleteTodo = useDeleteTodo();

    const onClickDeleteButton = () => {
        deleteTodo(id);
    };

    return (
        <div className={"flex items-center justify-between border p-2"}>
            <Link to={`/todolist/${id}`}>{content}</Link>
            <Button onClick={onClickDeleteButton} variant={"destructive"}>삭제</Button>
        </div>
    );
}