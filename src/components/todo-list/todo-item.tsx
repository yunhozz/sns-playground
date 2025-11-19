import { Button } from "@/components/ui/button.tsx";
import { useDeleteTodo } from "@/store/todos.ts";
import type { ITodo } from "@/types.ts";

export default ({ id, content }: ITodo) => {
    const deleteTodo = useDeleteTodo();

    const onClickDeleteButton = () => {
        deleteTodo(id);
    };

    return (
        <div className={"flex items-center justify-between border p-2"}>
            {content}
            <Button onClick={onClickDeleteButton} variant={"destructive"}>삭제</Button>
        </div>
    );
}