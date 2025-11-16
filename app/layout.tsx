import React from "react";
import type { PageMetadata } from "@ademattos/bunbox";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./index.css";

export const metadata: PageMetadata = {
  title: "Anthony DeMattos",
  description:
    "CTO based in DC currently leading Syyclops, building the future of smart buildings.",
  favicon: "icon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
