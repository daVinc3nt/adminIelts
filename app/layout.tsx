"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar/Navbar";
import SideBar from "@/components/Top&SideBar/SideBar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggleCollapseMobile, setToggleCollapseMobile] = useState(false);
  const handleSidebarToggleMobile = () => {
    setToggleCollapseMobile(!toggleCollapseMobile);
  };
  return (
    <html lang="en">
      <body className="flex overflow-hidden">
          <SideBar toggleCollapseMobile={toggleCollapseMobile} />
          <main className="h-screen flex flex-1">
            {children}
          </main>
      </body>
    </html >
  );
}
