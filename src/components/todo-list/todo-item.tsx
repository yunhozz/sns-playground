import { Button } from "@/components/ui/button.tsx";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation.ts";
import { useDeleteTodo } from "@/store/todos.ts";
import type { ITodo } from "@/types.ts";
import { Link } from "react-router";

export default ({ id, content, isDone }: ITodo) => {
    const { mutate } = useUpdateTodoMutation();
    const deleteTodo = useDeleteTodo();

    const onClickCheckBox = () => {
        mutate({
            id,
            isDone: !isDone
        });
    };

    const onClickDeleteButton = () => {
        deleteTodo(id);
    };

    return (
        <div className={"flex items-center justify-between border p-2"}>
            <div className={"flex gap-5"}>
                <input type={"checkbox"} checked={isDone} onClick={onClickCheckBox}/>
                <Link to={`/todolist/${id}`}>{content}</Link>
            </div>
            <Button onClick={onClickDeleteButton} variant={"destructive"}>삭제</Button>
        </div>
    );
}