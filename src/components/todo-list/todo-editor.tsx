import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useCreateTodo } from "@/store/todos.ts";
import { useState } from "react";

export default () => {
    const createTodo = useCreateTodo();
    const [content, setContent] = useState("");

    const onClickAddButton = () => {
        if (content.trim() === "") return;
        createTodo(content);
        setContent("");
    };

    return (
        <div className={"flex gap-2"}>
            <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder={"새로운 할 일을 입력하세요 ..."}/>
            <Button onClick={onClickAddButton}>추가</Button>
        </div>
    );
}