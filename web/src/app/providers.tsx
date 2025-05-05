"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { http, WagmiProvider } from "wagmi";
import { polygon, polygonAmoy } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider, } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";

/* ---------- wagmi 설정 ---------- */
const wagmiConfig = getDefaultConfig({
  appName: "On-chain Biz Card",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // 임시 문자열도 OK
  chains: [polygonAmoy, polygon],
  transports: {
    [polygon.id]: http("https://polygon-rpc.com"),
    [polygonAmoy.id]: http("https://rpc-amoy.polygon.technology"),
  },
});

/* ---------- react-query 인스턴스 ---------- */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
