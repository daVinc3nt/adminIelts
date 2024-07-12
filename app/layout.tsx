"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import SideBar from "@/components/Sidebar/Sidebar";
import Provider from "./Provider";
import { Roboto } from "next/font/google";

import "./globals.css";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

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
			<body className="flex flex-col w-full h-screen overflow-x-hidden overflow-y-scroll">
				<Provider>
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
						className="flex flex-col no-scrollbar hide-scrollbar min-h-screen pt-16 duration-200 bg-gray-50 dark:bg-black-night">
						{children}
					</div>
				</Provider>
			</body>
		</html>
	);
}
