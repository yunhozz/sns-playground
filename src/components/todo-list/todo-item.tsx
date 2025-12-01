import { Button } from "@/components/ui/button.tsx";
import { useDeleteTodoMutation } from "@/hooks/mutations/todo/use-delete-todo-mutation.ts";
import { useUpdateTodoMutation } from "@/hooks/mutations/todo/use-update-todo-mutation.ts";
import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id.ts";
import { Link } from "react-router";

export default ({ id }: { id: string }) => {
    const { data: todo } = useTodoDataById(id, "LIST");
    const { mutate: updateTodo } = useUpdateTodoMutation();
    const { mutate: deleteTodo, isPending: isDeleteTodoPending } = useDeleteTodoMutation();
    // const deleteTodo = useDeleteTodo();

    if (!todo) {
        throw new Error("Todo Data Undefined");
    }

    const { content, isDone } = todo;

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