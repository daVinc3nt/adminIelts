import ThemeProvider from "./provider/ThemeProvider";
import { Roboto } from "next/font/google";

import "./globals.css";
import AuthProvider from "./provider/AuthProvider";
import { Metadata } from "next";
import UtilityProvider from "./provider/UtilityProvider";
import Layout from "./test/sublayout";

export const metadata: Metadata = {
	title: "Engonow",
	description: "Create by Alpha Solution",
};
const roboto = Roboto({
	weight: ["300", "400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
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
			<body className="flex flex-col w-full min-h-screen overflow-x-hidden overflow-y-scroll bg-gray-100 dark:bg-black-night">
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
