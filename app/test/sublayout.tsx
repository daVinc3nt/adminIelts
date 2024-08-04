"use client";
import { useUtility } from "../provider/UtilityProvider";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { isOpenSidebar } = useUtility();

	return (
		<div
			style={{
				paddingLeft: isOpenSidebar ? "240px" : "0px",
			}}
			className="flex flex-col min-h-screen pt-16  bg-gray-50 dark:bg-black-night">
			{children}
		</div>
	);
}
