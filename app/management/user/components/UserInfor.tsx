"use client";
import { FaXmark } from "react-icons/fa6";
import { useUserData } from "../context/UserDataProvider";
import { CiMail } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import { motion } from "framer-motion";

export default function UserInfor() {
	const { currentUser, setCurrentUser } = useUserData();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	if (currentUser == null) {
		return null;
	}

	return (
		<motion.div
			transition={{ duration: 0.2 }}
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			className="fixed z-30 flex justify-center w-full h-full">
			<div className="mt-16 bg-white border rounded-xl shadow-md w-144 h-fit dark:bg-gray-22 dark:border-gray-22 flex flex-col overflow-hidden pb-8">
				<div className="w-full h-fit px-4 py-3 bg-foreground-blue dark:bg-foreground-red flex flex-row justify-between items-center cursor-default">
					<span className="text-2xl font-bold text-white dark:text-gray-200">
						User Information
					</span>
					<FaXmark
						onClick={() => setCurrentUser(null)}
						className="text-white dark:text-gray-200 size-7 stroke-1 cursor-pointer"
					/>
				</div>

				<div className="w-full h-fit flex flex-row p-8 pb-4 gap-8">
					<div className="size-32 bg-gray-100 rounded-full"></div>
					<div className="flex-1">
						<div className="flex flex-col gap-2">
							<div className="w-full h-fit">
								<span className="font-extrabold text-3xl">
									{currentUser.lastName +
										" " +
										currentUser.firstName}
								</span>
							</div>
							<div className="w-full h-fit flex flex-row gap-2 items-center text-zinc-400">
								<MdAlternateEmail className="size-5" />
								<span className="text-base">
									{currentUser.username}
								</span>
							</div>
							<div className="w-full h-fit flex flex-row gap-2 items-center text-zinc-400">
								<CiMail className="size-5 stroke-1" />
								<span className="text-base">
									{currentUser.email}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-fit flex flex-col py-4 px-16 gap-4">
					<div className="w-full flex flex-row gap-4">
						<span className="text-base text-zinc-400 w-1/4">
							Role:
						</span>
						<span className="text-base text-pot-black w-3/4 dark:text-gray-200">
							Not yet
						</span>
					</div>
					<div className="w-full flex flex-row gap-4">
						<span className="text-base text-zinc-400 w-3/12">
							Password:
						</span>
						<span className="text-base text-pot-black w-8/12 break-all dark:text-gray-200">
							{showPassword
								? currentUser.password
								: "**************"}
						</span>
						<div className="w-1/12">
							{!showPassword ? (
								<LuEye
									onClick={() => setShowPassword(true)}
									className="size-5 cursor-pointer text-black dark:text-gray-200"
								/>
							) : (
								<LuEyeOff
									onClick={() => setShowPassword(false)}
									className="size-5 cursor-pointer text-black dark:text-gray-200"
								/>
							)}
						</div>
					</div>
					<div className="w-full flex flex-row gap-4">
						<span className="text-base text-zinc-400 w-1/4">
							Date Created:
						</span>
						<span className="text-base text-pot-black w-3/4 dark:text-gray-200">
							{new Date(
								currentUser.createdAt
							).toLocaleDateString()}
						</span>
					</div>
					<div className="w-full flex flex-row gap-4">
						<span className="text-base text-zinc-400 w-1/4">
							Latest Update:
						</span>
						<span className="text-base text-pot-black w-3/4 dark:text-gray-200">
							{new Date(
								currentUser.updatedAt
							).toLocaleDateString()}
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
