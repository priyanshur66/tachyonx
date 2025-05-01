"use client";

import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

export default function Home() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const handleSendPayment = async (destination: string, amount: string) => {
    if (!publicKey) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const destinationPubkey = new PublicKey(destination);
      const lamports = parseFloat(amount) * 1000000000; // Convert SOL to lamports

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: destinationPubkey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      console.log("Transaction successful:", signature);
      alert("Payment sent successfully!");
    } catch (error) {
      console.error("Error sending payment:", error);
      alert("Error sending payment. Please check the console for details.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Send Payment</h2>
      <div className="mb-4">
        <WalletMultiButton />
      </div>
      
      {publicKey && (
        <div className="mt-4">
          <p className="mb-4">Connected: {publicKey.toString()}</p>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium">Destination</label>
              <input 
                type="text" 
                id="destination" 
                className="mt-1 w-full p-2 border rounded" 
                placeholder="Recipient's Solana address" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Amount (SOL)</label>
              <input 
                type="text" 
                id="amount" 
                className="mt-1 w-full p-2 border rounded" 
                placeholder="0.01" 
              />
            </div>
            <button 
              onClick={() => {
                const destination = (document.getElementById('destination') as HTMLInputElement).value;
                const amount = (document.getElementById('amount') as HTMLInputElement).value;
                handleSendPayment(destination, amount);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
  );
}