import "./App.css";
import IndexPage from "@/pages/index-page.tsx";
import TodoDetailPage from "@/pages/todo-detail-page.tsx";
import TodoListPage from "@/pages/todo-list-page.tsx";
import { Route, Routes } from "react-router";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<IndexPage/>}/>
            <Route path={"/todolist"} element={<TodoListPage/>}/>
            <Route path={"/todolist/:id"} element={<TodoDetailPage/>}/>
        </Routes>
    );
}

export default App;