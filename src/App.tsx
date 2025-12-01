import "./App.css";
import ModalProvider from "@/provider/modal-provider.tsx";
import SessionProvider from "@/provider/session-provider.tsx";
import RootRoute from "@/root-route.tsx";

export default function App() {
    return (
        <SessionProvider>
            <ModalProvider>
                <RootRoute/>
            </ModalProvider>
        </SessionProvider>
    );
}