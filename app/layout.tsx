"use client";
import { Inter } from "next/font/google";
import "./globals.css";
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
			<body className="flex h-screen overflow-x-hidden min-w-screen">
				<SideBar toggleCollapseMobile={toggleCollapseMobile} />
				<main className="flex">{children}</main>
			</body>
		</html>
	);
}

