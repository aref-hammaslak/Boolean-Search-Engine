import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider  client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
      <div className={'w-'}></div>
    </QueryClientProvider>
  </StrictMode>
);
