"use client";

import { getShortAddress } from "@/lib/utils";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ConnectWallet() {
  const { publicKey, disconnect, connected } = useWallet();
  const activeAccount = publicKey?.toString();
  const shortAddress = activeAccount ? getShortAddress(activeAccount) : '';

  const handleDisconnect = async () => {
    console.log("Disconnecting");
    await disconnect();
  }

  if (connected && activeAccount) {
    return (
      <div className="flex items-center">
        <button
          className="px-4 py-2 bg-white text-primary rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-all font-medium"
          onClick={handleDisconnect}
        >
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>{shortAddress}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <WalletMultiButton className="px-4 py-2 bg-white text-primary rounded-md hover:bg-opacity-90 transition-all flex items-center gap-2 font-medium" />
    </div>
  );
}