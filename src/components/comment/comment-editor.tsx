import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

export default () => {
    return (
        <div className={"flex flex-col gap-2"}>
            <Textarea/>
            <div className={"flex justify-end"}>
                <Button>작성</Button>
            </div>
        </div>
    );
}