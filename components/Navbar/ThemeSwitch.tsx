"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiLight, CiDark } from "react-icons/ci";

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState<boolean>(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted)
		return (
			<button className="p-1 rounded-full cursor-pointer stroke-[0.5] hover:bg-background-gray text-pot-black dark:text-gray-200 dark:hover:bg-zinc-700">
				<CiDark strokeWidth="0.75" size={30} />
			</button>
		);

	if (resolvedTheme === "dark") {
		return (
			<button
				onClick={() => setTheme("light")}
				className="p-1 rounded-full cursor-pointer stroke-[0.5] hover:bg-background-gray text-pot-black dark:text-gray-200 dark:hover:bg-zinc-700">
				<CiLight strokeWidth="0.75" size={30} />
			</button>
		);
	}

	if (resolvedTheme === "light") {
		return (
			<button
				onClick={() => setTheme("dark")}
				className="p-1 rounded-full cursor-pointer stroke-[0.5] hover:bg-background-gray text-pot-black dark:text-gray-200 dark:hover:bg-zinc-700">
				<CiDark strokeWidth="0.75" size={30} />
			</button>
		);
	}
}
