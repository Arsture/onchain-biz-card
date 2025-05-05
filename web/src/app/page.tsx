"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">On-chain Biz Card</h1>
      <ConnectButton />
    </main>
  );
}