import * as React from "react";
import { Navbar } from "@/presentation/components/shared/Navbar";
import { Footer } from "@/presentation/components/shared/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
