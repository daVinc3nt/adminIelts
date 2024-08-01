import { motion } from "framer-motion";

interface ComfirmationProps {
	message: string;
	type: "delete" | "update" | "create" | "confirm";
	func: () => void;
	onClose: () => void;
}

export default function Comfirmation({
	message,
	type,
	func,
	onClose,
}: ComfirmationProps) {
	const handleConfirm = (e: any) => {
		e.stopPropagation();
		if (func) {
			func();
		}
		onClose();
	};

	const handleClose = (e: any) => {
		e.stopPropagation();
		onClose();
	};

	return (
		<div
			onClick={() => {
				onClose();
			}}
			className="fixed z-[2000] flex justify-center w-full h-full bg-black bg-opacity-20 dark:bg-opacity-40 items-center">
			<motion.dialog
				open
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 30,
					stiffness: 500,
				}}
				className="min-w-112 max-w-160 min-h-40 h-fit bg-white dark:bg-gray-22 rounded-md flex flex-col p-4 justify-between shadow-lg">
				<div className="flex flex-col gap-4">
					<span className="text-2xl font-bold">
						{type === "delete" && "Delete"}
						{type === "update" && "Update"}
						{type === "create" && "Create"}
						{type === "confirm" && "Confirmation"}
					</span>
					<div className="flex flex-col gap-0">
						<span className="text-lg whitespace-pre-wrap font-medium">
							{message}
						</span>
						<span className="text-base text-red-400 dark:text-red-600">
							You can't undo this operation
						</span>
					</div>
				</div>
				<div className="w-full h-fit flex flex-row justify-end gap-2 pt-4 text-foreground-blue dark:text-gray-200">
					<button
						onClick={handleClose}
						className="hover:bg-blue-50 rounded-md px-2 py-1 dark:hover:bg-red-100 dark:hover:bg-opacity-20">
						CANCEL
					</button>
					<button
						onClick={handleConfirm}
						className="hover:bg-blue-50 rounded-md px-2 py-1 dark:hover:bg-red-100 dark:hover:bg-opacity-20">
						{type == "confirm" && <span>CONFIRM</span>}
						{type == "delete" && <span>DELETE</span>}
						{type == "update" && <span>UPDATE</span>}
						{type == "create" && <span>CREATE</span>}
					</button>
				</div>
			</motion.dialog>
		</div>
	);
}
