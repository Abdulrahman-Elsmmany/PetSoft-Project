import Logo from "@/components/logo";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-5">
      <Logo />
      {children}
    </div>
  );
}
