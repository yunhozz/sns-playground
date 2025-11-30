import { useSession } from "@/store/session.ts";
import { Navigate, Outlet } from "react-router";

export default () => {
    const session = useSession();

    if (session) {
        return <Navigate to={"/"} replace={true}/>;
    }

    return <Outlet/>;
}