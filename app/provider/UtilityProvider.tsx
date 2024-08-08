"use client";
import Navbar from "@/components/Navbar/Navbar";
import SideBar from "@/components/Sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Nofitication from "@/components/Utility/Notification";
import { AnimatePresence } from "framer-motion";
import Comfirmation from "@/components/Utility/Comfirmation";

interface UtilityContextType {
	isOpenSidebar: boolean;
	isOpenNotificate: boolean;
	message: string;
	errorMessage: string;

	toggleSidebar: () => void;
	setError: (message: string) => void;
	setSuccess: (message: string) => void;
	onSetConfirmation: (confirm: ComfirmationType) => void;
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

const NotificateDuration = 2000;

export default function UtilityProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
	const [message, setMessage] = useState<string>();
	const [errorMessage, setErrorMessage] = useState<string>();
	const [isOpenNotificate, setIsOpenNotificate] = useState<boolean>(false);
	const [isOpenError, setIsOpenError] = useState<boolean>(false);
	const [confirmation, setConfirmation] = useState<ComfirmationType | null>(
		null
	);

	useEffect(() => {
		if (isOpenNotificate) {
			setTimeout(() => {
				setIsOpenNotificate(false);
			}, NotificateDuration);
		}
	}, [isOpenNotificate]);

	useEffect(() => {
		if (isOpenError) {
			setTimeout(() => {
				setIsOpenError(false);
			}, NotificateDuration);
		}
	}, [isOpenError]);

	const toggleSidebar = () => {
		setIsOpenSidebar((prev) => !prev);
	};

	const setError = (message: string) => {
		setErrorMessage(message);
		setIsOpenError(true);
	};

	const setSuccess = (message: string) => {
		setMessage(message);
		setIsOpenNotificate(true);
	};

	const onSetConfirmation = (confirm: ComfirmationType) => {
		setConfirmation(confirm);
	};

	const closeConfirmation = () => {
		setConfirmation(null);
	};

	const onCloseMessage = () => {
		setIsOpenNotificate(false);
	};

	const onCloseError = () => {
		setIsOpenError(false);
	};

	return (
		<UtilityContext.Provider
			value={{
				isOpenSidebar,
				isOpenNotificate,
				message,
				errorMessage,

				toggleSidebar,
				setError,
				setSuccess,
				onSetConfirmation,
			}}>
			<SideBar />
			<Navbar />

			<AnimatePresence mode="wait">
				{isOpenNotificate && (
					<Nofitication
						type="success"
						message={message}
						onClose={onCloseMessage}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{isOpenError && (
					<Nofitication
						type="error"
						message={errorMessage}
						onClose={onCloseError}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{confirmation && (
					<Comfirmation
						func={confirmation.onConfirm}
						onClose={closeConfirmation}
						message={confirmation.message}
						type={confirmation.type}
					/>
				)}
			</AnimatePresence>

			{children}
		</UtilityContext.Provider>
	);
}
