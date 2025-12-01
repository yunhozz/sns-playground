import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useCreateTodoMutation } from "@/hooks/mutations/todo/use-create-todo-mutation.ts";
import { useState } from "react";

export default () => {
    const [content, setContent] = useState("");
    // const createTodo = useCreateTodo();
    const { mutate, isPending } = useCreateTodoMutation();

    const onClickAddButton = () => {
        if (content.trim() === "") return;
        // createTodo(content);
        mutate(content);
        setContent("");
    };

    return (
        <div className={"flex gap-2"}>
            <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder={"새로운 할 일을 입력하세요 ..."}/>
            <Button onClick={onClickAddButton} disabled={isPending}>추가</Button>
        </div>
    );
}