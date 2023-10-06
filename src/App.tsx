import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import MainPage from "./pages/main";

function App() {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-w-screen min-h-screen">
                <MainPage />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
