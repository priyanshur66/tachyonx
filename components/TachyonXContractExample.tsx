"use client";

import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

// Contract ID from Solana program
const TACHYONX_PROGRAM_ID = "3XysZ1dJMVpertGD8EWnkqj2q5pJEUDcqKAQkwx1i7nB";

// Type for SME details
interface SMEDetails {
  name: string;
  reg_num: string;
  jurisdiction: string;
  address: string;
  website: string;
}

const TachyonXContractExample = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // For creating a proposal
  const [anchorAddress, setAnchorAddress] = useState("");
  const [smeDetails, setSmeDetails] = useState<SMEDetails>({
    name: "SME Example Ltd.",
    reg_num: "REG-987",
    jurisdiction: "Exampleland",
    address: "456 Oak Ave",
    website: "http://sme.example",
  });
  const [researchUrl, setResearchUrl] = useState("http://papers.co/research123");
  const [initialInvestReq, setInitialInvestReq] = useState(10000000000);
  const [initialLotPrice, setInitialLotPrice] = useState(50000000);
  const [totalLots, setTotalLots] = useState(200);
  
  // Example function to interact with a Solana program
  const handleTransaction = async () => {
    if (!publicKey) {
      setError("Wallet not connected");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // This is a mock transaction - in a real application, you would
      // use the proper Solana program instructions
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(TACHYONX_PROGRAM_ID),
          lamports: 100000, // 0.0001 SOL
        })
      );
      
      const signature = await sendTransaction(transaction, connection);
      
      setResult({
        signature,
        message: "Transaction sent successfully!",
      });
    } catch (e) {
      console.error("Error:", e);
      setError(`Transaction failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>TachyonX Contract Example</CardTitle>
        <CardDescription>
          Interact with the TachyonX program on Solana
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">
            Connect your wallet to interact with the TachyonX program
          </p>
          
          <WalletMultiButton className="max-w-xs" />
          
          {publicKey && (
            <div className="mt-4">
              <Button 
                onClick={handleTransaction} 
                disabled={loading}
              >
                {loading ? "Processing..." : "Send Test Transaction"}
              </Button>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-2 bg-red-50 text-red-800 rounded border border-red-200">
              {error}
            </div>
          )}
          
          {result && (
            <div className="mt-4 p-2 bg-green-50 text-green-800 rounded border border-green-200">
              <p>Success: {result.message}</p>
              <p className="text-xs break-all mt-1">
                Signature: {result.signature}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TachyonXContractExample;
