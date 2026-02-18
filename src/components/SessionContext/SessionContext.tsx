"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function SessionContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Navbar />
      <div className="container min-h-screen">
        <Toaster />
        {children}
      </div>
      <Footer />
    </SessionProvider>
  );
}
