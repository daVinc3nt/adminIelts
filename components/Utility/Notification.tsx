"use client";
import { Alert, createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
	MdOutlineReportGmailerrorred,
	MdOutlineWarningAmber,
} from "react-icons/md";

interface NotificationProps {
	message: string;
	type: "success" | "error" | "warning" | "info";
	onClose: () => void;
}

export default function Notification({
	type,
	message,
	onClose,
}: NotificationProps) {
	const { theme } = useTheme();
	const [isDark, setIsDark] = useState<boolean>(false);

	useEffect(() => {
		setIsDark(theme === "dark");
	}, [theme]);

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
		},
	});

	const lightTheme = createTheme({});

	const icon = useMemo(() => {
		switch (type) {
			case "success":
				return <IoMdCheckmarkCircleOutline fontSize="inherit" />;
			case "error":
				return <MdOutlineReportGmailerrorred fontSize="inherit" />;
			case "warning":
				return <MdOutlineWarningAmber fontSize="inherit" />;
			case "info":
				return <IoMdCheckmarkCircleOutline fontSize="inherit" />;
			default:
				return null;
		}
	}, [type]);

	return (
		<div className="h-full min-w-80 max-w-176">
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<Alert icon={icon} severity={type} onClose={onClose}>
					{message}
				</Alert>
			</ThemeProvider>
		</div>
	);
}
