"use client";
import { useUtility } from "@/app/provider/UtilityProvider";
import { Alert, createTheme, ThemeProvider } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
	MdOutlineReportGmailerrorred,
	MdOutlineWarningAmber,
} from "react-icons/md";

interface NotificationProps {
	message: string;
	onClose: () => void;
	type: "success" | "error" | "warning" | "info";
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
		<div className="fixed flex items-center justify-center w-fit h-16 z-[1200] top-0 left-1/2 -translate-x-1/2 p-2">
			<motion.div
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -100 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 30,
					stiffness: 500,
				}}
				className="h-full min-w-80 max-w-176">
				<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
					<Alert
						icon={icon}
						severity={type}
						onClose={() => onClose()}>
						{message}
					</Alert>
				</ThemeProvider>
			</motion.div>
		</div>
	);
}
