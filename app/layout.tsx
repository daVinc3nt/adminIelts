"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import SideBar from "@/components/Sidebar/Sidebar";
import ThemeProvider from "./provider/ThemeProvider";
import { Roboto } from "next/font/google";

import "./globals.css";

const roboto = Roboto({
	weight: ['100','400', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
  })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

	return (
		<html
			lang="en"
			className={roboto.className}
			suppressHydrationWarning={true}>
			<body className="flex flex-col w-full min-h-screen overflow-x-hidden overflow-y-scroll">
				<ThemeProvider>
					<SideBar
						isOpenSidebar={isOpenSidebar}
						setIsOpenSidebar={setIsOpenSidebar}
					/>
					<Navbar
						isOpenSidebar={isOpenSidebar}
						setIsOpenSidebar={setIsOpenSidebar}
					/>
					<div
						style={{
							paddingLeft: isOpenSidebar ? "240px" : "0px",
						}}
						className="flex flex-col min-h-screen pt-16 duration-200 bg-gray-50 dark:bg-black-night">
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
