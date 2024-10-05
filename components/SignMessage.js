"use client";
import { ed25519 } from '@noble/curves/ed25519';
import { useState } from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import '@solana/wallet-adapter-react-ui/styles.css';
import dynamic from "next/dynamic";
const WalletMultiButtonDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);
const WalletDisconnectButtonDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
    { ssr: false }
);

export const SignMessage = () => {
    const { publicKey, signMessage } = useWallet();
    const { connection } = useConnection();
    const [msg, setMsg] = useState("");

    const signMsg = async () => {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        try{
            const message = msg;
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);

            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error("Invalid");
            alert("Success!");

        } catch(err) {
            alert("Error");
        }
    }

    return (
        <div>
            <WalletMultiButtonDynamic/>
            <WalletDisconnectButtonDynamic/>
            <input onChange={(e)=>{setMsg(e.target.value)}} type="text" placeholder="Message"/>
            <button onClick={signMsg}>Sign Message</button>
        </div>
    )
}