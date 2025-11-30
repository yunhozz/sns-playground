import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useRequestPasswordResetEmail } from "@/hooks/mutations/use-request-password-reset-email.ts";
import { generateErrorMessage } from "@/lib/error.ts";
import { useState } from "react";
import { toast } from "sonner";

export default () => {
    const [email, setEmail] = useState("");

    const {
        mutate: requestPasswordResetEmail,
        isPending: isRequestPasswordResetEmailPending
    } = useRequestPasswordResetEmail({
        onSuccess: () => {
            toast.info("인증 메일이 잘 발송되었습니다.", {
                position: "top-center"
            });
            setEmail("");
        },
        onError: (error) => {
            const message = generateErrorMessage(error);
            toast.error(message, {
                position: "top-center"
            });
            setEmail("");
        }
    });

    const onClickSendEmailButton = () => {
        if (email.trim() === "") return;
        requestPasswordResetEmail(email);
    };

    return (
        <div className={"flex flex-col gap-8"}>
            <div className={"flex flex-col gap-1"}>
                <div className={"text-xl font-bold"}>비밀번호를 잊으셨나요?</div>
                <div className={"text-muted-foreground"}>이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.</div>
            </div>
            <Input className={"py-6"}
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   disabled={isRequestPasswordResetEmailPending}
                   placeholder={"example@abc.com"}/>
            <Button className={"w-full"} onClick={onClickSendEmailButton} disabled={isRequestPasswordResetEmailPending}>
                인증 메일 요청하기
            </Button>
        </div>
    );
}