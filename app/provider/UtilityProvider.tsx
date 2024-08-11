"use client";
import Navbar from "@/components/Navbar/Navbar";
import SideBar from "@/components/Sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Nofitication from "@/components/Utility/Notification";
import { AnimatePresence } from "framer-motion";
import Comfirmation from "@/components/Utility/Comfirmation";
import { Toaster, toast } from "sonner";
import { useTheme } from "next-themes";

interface UtilityContextType {
	isOpenSidebar: boolean;

	toggleSidebar: () => void;
	setError: (message: string) => void;
	setSuccess: (message: string) => void;
	onSetConfirmation: (confirm: ComfirmationType) => void;
	onSetPromise: (
		promise: Promise<any>,
		loadingMessage: string,
		message: string
	) => void;
}

const UtilityContext = createContext<UtilityContextType | null>(null);

export const useUtility = () => {
	const context = useContext(UtilityContext);
	if (!context) {
		throw new Error("useUtility must be used within a UtilityProvider");
	}
	return context;
};

interface ComfirmationType {
	message: string;
	subMessage?: string;
	onConfirm: () => void;
	type: "delete" | "update" | "create" | "confirm";
}

const NotificateDuration = 3000;

export default function UtilityProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
	const [confirmation, setConfirmation] = useState<ComfirmationType | null>(
		null
	);
	const [isDark, setIsDark] = useState<boolean>(false);
	const { theme } = useTheme();
	useEffect(() => {
		setIsDark(theme === "dark");
	}, [theme]);

	const toggleSidebar = () => {
		setIsOpenSidebar((prev) => !prev);
	};

	const setError = (message: string) => {
		toast.error(message, {
			duration: NotificateDuration,
		});
	};

	const setSuccess = (message: string) => {
		toast.success(message, {
			duration: NotificateDuration,
		});
	};

	const onSetPromise = (
		promise: Promise<any>,
		loadingMessage: string,
		message: string
	) => {
		toast.promise(promise, {
			loading: loadingMessage,
			success: () => {
				return message;
			},
			error: (error) => {
				return error.message;
			},
		});
	};

	const onSetConfirmation = (confirm: ComfirmationType) => {
		setConfirmation(confirm);
	};

	const closeConfirmation = () => {
		setConfirmation(null);
	};

	return (
		<UtilityContext.Provider
			value={{
				isOpenSidebar,

				toggleSidebar,
				setError,
				setSuccess,
				onSetConfirmation,
				onSetPromise,
			}}>
			<SideBar />
			<Navbar />
			<Toaster
				richColors
				position="top-center"
				offset={8}
				visibleToasts={3}
				theme={isDark ? "dark" : "light"}
				closeButton
			/>
			<AnimatePresence mode="wait">
				{confirmation && (
					<Comfirmation
						func={confirmation.onConfirm}
						onClose={closeConfirmation}
						message={confirmation.message}
						subMessage={confirmation.subMessage}
						type={confirmation.type}
					/>
				)}
			</AnimatePresence>

			{children}
		</UtilityContext.Provider>
	);
}
