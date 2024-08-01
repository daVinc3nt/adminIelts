"use client";
import ThemeProvider from "./provider/ThemeProvider";
import { Roboto } from "next/font/google";

import "./globals.css";
import AuthProvider from "./provider/AuthProvider";
import UtilityProvider, { useUtility } from "./provider/UtilityProvider";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html
			lang="en"
			className={roboto.className}
			suppressHydrationWarning={true}>
			<body className="flex flex-col w-full min-h-screen overflow-x-hidden overflow-y-scroll">
				<AuthProvider>
					<ThemeProvider>
						<UtilityProvider>
							<Layout>{children}</Layout>
						</UtilityProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { isOpenSidebar } = useUtility();

	return (
		<div
			style={{
				paddingLeft: isOpenSidebar ? "240px" : "0px",
			}}
			className="flex flex-col min-h-screen pt-16 duration-200 bg-gray-50 dark:bg-black-night">
			{children}
		</div>
	);
}
