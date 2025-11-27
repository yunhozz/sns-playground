import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useSignUp } from "@/hooks/mutations/use-sign-up.ts";
import { useState } from "react";
import { Link } from "react-router";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: signUp } = useSignUp();

    const onClickSignUpButton = () => {
        if (email.trim() === "" || password.trim() === "") return;
        signUp({ email, password });
    };

    return (
        <div className={"flex flex-col gap-8"}>
            <div className={"text-xl font-bold"}>회원가입</div>
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
                <Button className={"w-full"} onClick={onClickSignUpButton}>회원가입</Button>
            </div>
            <div>
                <Link to={"/sign-in"} className={"text-muted-foreground hover:underline"}>이미 계정이 있다면? 로그인</Link>
            </div>
        </div>
    );
}