"use client";
import { SignMessage } from "@/components/SignMessage";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";


export default function Home() {
  const endpoint = "https://api.devnet.solana.com";

  return (
  <div>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <SignMessage/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </div>
  );
}
