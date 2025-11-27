import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password.ts";
import { useState } from "react";
import { Link } from "react-router";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: signInWithPassword } = useSignInWithPassword();

    const onClickSignInButton = () => {
        if (email.trim() === "" || password.trim() === "") return;
        signInWithPassword({ email, password });
    };

    return (
        <div className={"flex flex-col gap-8"}>
            <div className={"text-xl font-bold"}>로그인</div>
            <div className={"flex flex-col gap-2"}>
                <Input className={"py-6"}
                       type={"email"}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder={"example@abc.com"}/>
                <Input className={"py-6"}
                       type={"password"}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder={"password"}/>
            </div>
            <div>
                <Button className={"w-full"} onClick={onClickSignInButton}>로그인</Button>
            </div>
            <div>
                <Link to={"/sign-up"} className={"text-muted-foreground hover:underline"}>계정이 없으시다면? 회원가입</Link>
            </div>
        </div>
    );
}