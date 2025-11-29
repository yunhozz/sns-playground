import "./App.css";
import SessionProvider from "@/provider/session-provider.tsx";
import RootRoute from "@/root-route.tsx";

export default function App() {
    return (
        <SessionProvider>
            <RootRoute/>
        </SessionProvider>
    );
}