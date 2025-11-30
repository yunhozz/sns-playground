import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useUpdatePassword } from "@/hooks/mutations/use-update-password.ts";
import { generateErrorMessage } from "@/lib/error.ts";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default () => {
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const { mutate: updatePassword, isPending: isUpdatePasswordPending } = useUpdatePassword({
        onSuccess: () => {
            toast.info("비밀번호가 성공적으로 변경되었습니다.", {
                position: "top-center"
            });
            nav("/");
        },
        onError: (error) => {
            const message = generateErrorMessage(error);
            toast.error(message, {
                position: "top-center"
            });
            setPassword("");
        }
    });

    const onClickUpdatePasswordButton = () => {
        if (password.trim() === "") return;
        updatePassword(password);
    };

    return (
        <div className={"flex flex-col gap-8"}>
            <div className={"flex flex-col gap-1"}>
                <div className={"text-xl font-bold"}>비밀번호 재설정하기</div>
                <div className={"text-muted-foreground"}>새로운 비밀번호를 입력하세요</div>
            </div>
            <Input className={"py-6"}
                   type={"password"}
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   disabled={isUpdatePasswordPending}
                   placeholder={"password"}/>
            <Button className={"w-full"} onClick={onClickUpdatePasswordButton} disabled={isUpdatePasswordPending}>
                비밀번호 변경하기
            </Button>
        </div>
    );
}