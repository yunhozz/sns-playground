import TodoEditor from "@/components/todo-list/todo-editor.tsx";
import TodoItem from "@/components/todo-list/todo-item.tsx";
import { useTodos } from "@/store/todos.ts";

export default () => {
    const todos = useTodos();

    return (
        <div className={"p-5 flex flex-col gap-5"}>
            <h1 className={"text-2xl font-bold"}>TodoList</h1>
            <TodoEditor/>
            {
                todos.map(todo => <TodoItem key={todo.id} {...todo}/>)
            }
        </div>
    );
}