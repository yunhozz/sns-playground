import logo from "@/assets/logo.png";

export default () => {
    return (
        <div className={"h-[100vh] w-[100vw] bg-muted flex flex-col items-center justify-center"}>
            <div className={"flex items-center gap-4 mb-15 animate-bounce"}>
                <img src={logo} className={"w-10"} alt={"InstaByte 서비스의 로고"}/>
                <div className={"text-2xl font-bold"}>InstaByte</div>
            </div>
        </div>
    );
}