import "./index.css";
import { Toaster } from "@/components/ui/sonner.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            gcTime: 5 * 60 * 1000, // 5 min
            refetchOnMount: true,
            refetchInterval: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        }
    }
});

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools/>
            <Toaster/>
            <App/>
        </QueryClientProvider>
    </BrowserRouter>
);

/*
[Tanstack Query 캐시의 5가지 상태]

1. fetching: 요청한 데이터가 현재 로드 중이거나, 백그라운드에서 refresh되고 있는 상태
2. fresh: 데이터가 최신 상태로 간주되어 컴포넌트가 다시 마운트되어도 재요청을 하지 않는 상태
3. stale: 데이터가 오래된 것으로 간주되어(staleTime 만료) 컴포넌트 마운트, 윈도우 포커스 시 재요청 대상이 되는 상태
4. inactive: 현재 해당 쿼리를 사용하는 컴포넌트가 하나도 없어 비활성화된 상태
5. deleted: inactive 상태가 지속되어 설정된 시간(gcTime)이 지나, GC에 의해 메모리에서 완전히 제거된 상태
 */