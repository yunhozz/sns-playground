import "./App.css";
import IndexPage from "@/pages/index-page.tsx";
import TodoListPage from "@/pages/todo-list-page.tsx";
import { Route, Routes } from "react-router";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<IndexPage/>}/>
            <Route path={"/todolist"} element={<TodoListPage/>}/>
        </Routes>
    );
}

export default App;