import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { ClientInit } from "@/components/ClientInit";
import { Toaster } from "@/components/ui/toaster";
import SolanaProvider from "@/components/solana-provider";

export const metadata: Metadata = {
  title: "TachyonX Interface",
  description: "Interface for the TachyonX platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col bg-background text-foreground" /* Add any body specific classes here */
        )}
      >
        <SolanaProvider>
          <ClientInit />
          <Header />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
          <Toaster />
        </SolanaProvider>
      </body>
    </html>
  );
}
