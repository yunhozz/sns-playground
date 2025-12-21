import logo from "@/assets/logo.png";
import ProfileButton from "@/components/layout/header/profile-button.tsx";
import ThemeButton from "@/components/layout/header/theme-button.tsx";
import { Link, Outlet } from "react-router";

export default () => {
    return (
        <div className={"min-h-[100vh] flex flex-col"}>
            <header className={"h-15 border-b"}>
                <div className={"flex justify-between h-full max-w-175 w-full m-auto px-4"}>
                    <Link to={"/"} className={"flex items-center gap-2"}>
                        <img className={"h-5"}
                             src={logo}
                             alt={"InstaByte의 로고, 메세지 말풍선을 형상화한 모양이다."}/>
                        <div className={"font-bold"}>InstaByte</div>
                    </Link>
                    <div className={"flex items-center gap-5"}>
                        <ThemeButton/>
                        <ProfileButton/>
                    </div>
                </div>
            </header>
            <main className={"flex-1 max-w-175 w-full m-auto px-4 py-6 border-x"}>
                <Outlet/>
            </main>
            <footer className={"border-t py-10 text-muted-foreground text-center"}>
                @yunhozz
            </footer>
        </div>
    );
}