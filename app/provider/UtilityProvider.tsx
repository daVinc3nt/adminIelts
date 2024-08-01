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
	onSetConfirmation: (
		message: string,
		onConfirm: () => void,
		type: "delete" | "update" | "create" | "confirm"
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

	const onSetConfirmation = (
		message: string,
		onConfirm: () => void,
		type: "delete" | "update" | "create" | "confirm"
	) => {
		setConfirmation({ message, onConfirm, type });
	};

	const closeConfirmation = () => {
		setConfirmation(null);
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

			<AnimatePresence>
				{isOpenNotificate && <Nofitication type="success" />}
			</AnimatePresence>
			<AnimatePresence>
				{isOpenError && <Nofitication type="error" />}
			</AnimatePresence>
			<AnimatePresence>
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
