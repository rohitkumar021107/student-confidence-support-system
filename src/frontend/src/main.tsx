import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      gcTime: 10 * 60 * 1000,
    },
  },
});

const rootEl = document.getElementById("root")!;
rootEl.style.opacity = "0";
rootEl.style.transition = "opacity 0.3s ease";

ReactDOM.createRoot(rootEl).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <App />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);

// Fade in after React renders to prevent blank white flash
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    rootEl.style.opacity = "1";
  });
});
