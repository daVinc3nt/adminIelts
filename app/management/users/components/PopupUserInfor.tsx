"use client";
import { FaXmark, FaPhone } from "react-icons/fa6";
import { useUserManagement } from "../provider/UserManagementProvider";
import { CiMail } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { roleLabel } from "@/app/interface/user";

export default function PopupUserInfor() {
	const { currentUser, onChangeIsOpenUserInfor, onChangeCurrentUser } =
		useUserManagement();

	return (
		<motion.div
			initial={{ opacity: 0, y: -100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.1,
				type: "spring",
				damping: 30,
				stiffness: 500,
			}}
			className="fixed z-30 flex justify-center w-full h-full bg-black bg-opacity-20 dark:bg-opacity-40">
			<div className="flex flex-col pb-4 mt-16 overflow-hidden bg-white shadow-md rounded-xl w-144 h-fit dark:bg-pot-black dark:border-gray-22">
				<div className="flex flex-row items-center justify-between w-full px-4 py-3 cursor-default h-fit bg-foreground-blue dark:bg-foreground-red">
					<span className="text-2xl font-bold text-white dark:text-gray-200">
						User Information
					</span>
					<FaXmark
						onClick={() => onChangeIsOpenUserInfor(false)}
						className="text-white cursor-pointer stroke-1 dark:text-gray-200 size-7"
					/>
				</div>

				<div className="flex flex-row w-full gap-8 p-8 pb-4 h-fit">
					<div className="bg-gray-100 rounded-full size-32"></div>
					<div className="flex-1">
						<div className="flex flex-col gap-2">
							<div className="w-full h-fit">
								<span className="text-3xl font-extrabold">
									{currentUser.lastName +
										" " +
										currentUser.firstName}
								</span>
							</div>
							<div className="flex flex-row items-center w-full gap-2 h-fit text-zinc-400">
								<MdAlternateEmail className="size-5" />
								<span className="text-base">
									{currentUser.username}
								</span>
							</div>
							<div className="flex flex-row items-center w-full gap-2 h-fit text-zinc-400">
								<CiMail className="stroke-1 size-5" />
								<span className="text-base">
									{currentUser.email}
								</span>
							</div>
							<div className="flex flex-row items-center w-full gap-2 pl-1 h-fit text-zinc-400">
								<FaPhone className="stroke-1 size-4" />
								<span className="text-base">
									{currentUser.phoneNumber
										? currentUser.phoneNumber
										: "N/A"}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full gap-4 px-16 py-4 h-fit">
					<div className="flex flex-row w-full gap-4">
						<span className="w-1/4 text-base text-zinc-400">
							Date of Birth:
						</span>
						<span className="w-3/4 text-base text-pot-black dark:text-gray-200">
							{currentUser.dateOfBirth
								? new Date(
										currentUser.dateOfBirth
									).toLocaleDateString()
								: "N/A"}
						</span>
					</div>
					<div className="flex flex-row w-full gap-4">
						<span className="w-1/4 text-base text-zinc-400">
							Role:
						</span>
						<div className="flex flex-wrap w-3/4 gap-2 h-fit">
							{currentUser.roles.map((role, index) => (
								<span
									key={index}
									className="px-2 py-1 text-xs text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
									{
										roleLabel.find(
											(label) => label.value === role.role
										)?.label
									}
								</span>
							))}
						</div>
					</div>
					<div className="flex flex-row w-full gap-4">
						<span className="w-1/4 text-base text-zinc-400">
							Date Created:
						</span>
						<span className="w-3/4 text-base text-pot-black dark:text-gray-200">
							{new Date(
								currentUser.createdAt
							).toLocaleDateString()}
						</span>
					</div>
					<div className="flex flex-row w-full gap-4">
						<span className="w-1/4 text-base text-zinc-400">
							Latest Update:
						</span>
						<span className="w-3/4 text-base text-pot-black dark:text-gray-200">
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
