"use client";
import {
	createTheme,
	Pagination,
	PaletteOptions,
	ThemeProvider,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

export default function UserList() {
	const { theme } = useTheme();
	const [muiTheme, setMuiTheme] = useState<string>("");

	useEffect(() => {
		if (theme == "dark") {
			setMuiTheme("dark");
		} else {
			setMuiTheme("light");
		}
	}, [theme]);

	const darkTheme: PaletteOptions = {
		mode: "dark",
		background: {
			paper: "#121212",
		},
		text: {
			primary: "#9ca3af",
		},
	};

	const lightTheme: PaletteOptions = {
		mode: "light",
		background: {
			paper: "#121212",
		},
	};

	const newTheme = useMemo(
		() =>
			createTheme({
				palette: muiTheme == "dark" ? darkTheme : lightTheme,
			}),
		[muiTheme]
	);

	return (
		<>
			<div className="flex flex-col items-center w-full px-4 py-2 duration-200 bg-white border rounded-md shadow-sm dark:border-pot-black min-h-112 h-fit dark:bg-pot-black">
				<div className="flex flex-row items-center w-full gap-2 py-2 text-gray-400 h-fit">
					<div className="flex items-center justify-start w-[5%]">
						<div className="border-2 rounded-md border-foreground-blue dark:border-foreground-red size-5"></div>
					</div>
					<div className="w-[5%]">
						<FaCircleUser className="size-6" />
					</div>
					<div className="w-[25%]">Full name</div>
					<div className="w-[20%]">Username</div>
					<div className="w-[20%]">Email</div>
					<div className="w-[20%]">Role</div>
					<div className="w-[5%]"></div>
				</div>
				<hr className="w-full border border-gray-200 dark:border-gray-400" />
			</div>
			<div className="flex items-center justify-center w-full pt-4 h-fit">
				<ThemeProvider theme={newTheme}>
					<Pagination count={10} variant="outlined" shape="rounded" />
				</ThemeProvider>
			</div>
		</>
	);
}
