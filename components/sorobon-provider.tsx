"use client";

// THIS FILE IS DEPRECATED - Use solana-provider.tsx instead
// Keeping this file to avoid breaking existing imports, but it's now just a placeholder

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const SorobanProvider = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  );
}

export default SorobanProvider;