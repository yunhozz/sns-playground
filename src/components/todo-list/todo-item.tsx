import { Button } from "@/components/ui/button.tsx";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation.ts";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation.ts";
import type { ITodo } from "@/types.ts";
import { Link } from "react-router";

export default ({ id, content, isDone }: ITodo) => {
    const { mutate: updateTodo } = useUpdateTodoMutation();
    const { mutate: deleteTodo, isPending: isDeleteTodoPending } = useDeleteTodoMutation();
    // const deleteTodo = useDeleteTodo();

    const onClickCheckBox = () => {
        updateTodo({
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
                <input type={"checkbox"}
                       checked={isDone}
                       onChange={onClickCheckBox}
                       disabled={isDeleteTodoPending}/>
                <Link to={`/todolist/${id}`}>{content}</Link>
            </div>
            <Button onClick={onClickDeleteButton}
                    variant={"destructive"}
                    disabled={isDeleteTodoPending}>삭제
            </Button>
        </div>
    );
}