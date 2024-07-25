"use client";
import { FaXmark } from "react-icons/fa6";
import { useUserManagement } from "../provider/UserManagementProvider";
import { CiMail } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { testToken, UserRole } from "@/app/interface/user";
import { Fragment, useState } from "react";
import { UpdateAccountPayload } from "@/app/lib/interfaces";
import { AccountOperation } from "@/app/lib/main";

export default function UserInfor() {
	const { currentUser, setCurrentUser } = useUserManagement();
	if (currentUser == null) {
		return null;
	}

	const [isEdit, setIsEdit] = useState<boolean>(false);

	const [updateUser, setUpdateUser] = useState<UpdateAccountPayload>({
		username: currentUser.username,
		firstName: currentUser.firstName,
		lastName: currentUser.lastName,
	});

	const updateAccount = () => {
		const newAccountOperation = new AccountOperation();
		newAccountOperation
			.update(currentUser.id as any, updateUser, testToken)
			.then((res) => {
				console.log(res);
				if (res.success) {
					alert("Update account successfully");
					setCurrentUser({
						...currentUser,
						lastName: updateUser.lastName,
						firstName: updateUser.firstName,
						username: updateUser.username,
					});
				} else {
					alert("Update account failed");
					setUpdateUser({
						lastName: currentUser.lastName,
						firstName: currentUser.firstName,
						username: currentUser.username,
					});
				}
			});

		setIsEdit(false);
	};

	return (
		<motion.div
			transition={{ duration: 0.2 }}
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			className="fixed z-30 flex justify-center w-full h-full bg-black bg-opacity-20 dark:bg-opacity-40">
			<div className="mt-16 bg-white rounded-xl shadow-md w-144 h-fit dark:bg-gray-22 dark:border-gray-22 flex flex-col overflow-hidden">
				<div className="w-full h-fit px-4 py-3 bg-foreground-blue dark:bg-foreground-red flex flex-row justify-between items-center cursor-default">
					<span className="text-2xl font-bold text-white dark:text-gray-200">
						User Information
					</span>
					<FaXmark
						onClick={() => setCurrentUser(null)}
						className="text-white dark:text-gray-200 size-7 stroke-1 cursor-pointer"
					/>
				</div>

				{!isEdit ? (
					<Fragment>
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
								<div className="h-fit flex flex-wrap gap-2 w-3/4">
									{currentUser.roles.map((role, index) => (
										<span
											key={index}
											className="bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200 px-2 py-1 rounded-md text-xs">
											{
												roleLabel.find(
													(label) =>
														label.value ===
														role.role
												)?.label
											}
										</span>
									))}
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
						<div
							onClick={() => setIsEdit(true)}
							className="w-full h-fit flex flex-row items-center justify-end p-4">
							<button className="bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200 px-4 py-1 rounded-md">
								Edit
							</button>
						</div>
					</Fragment>
				) : (
					<Fragment>
						<div className="w-full h-fit flex flex-row p-8 pb-4 gap-8">
							<div className="size-32 bg-gray-100 rounded-full"></div>
							<div className="flex-1">
								<div className="flex flex-col gap-2">
									<div className="w-full h-fit flex flex-row gap-2 text-xl items-center">
										<label
											className="text-gray-400 whitespace-nowrap"
											htmlFor="lastname">
											Last Name:
										</label>
										<input
											id="lastname"
											value={updateUser.lastName}
											onChange={(e) => {
												setUpdateUser({
													...updateUser,
													lastName: e.target.value,
												});
											}}
											className="h-8 px-2 border border-gray-200 rounded-md"
										/>
									</div>
									<div className="w-full h-fit flex flex-row gap-2 text-xl items-center">
										<label
											className="text-gray-400 whitespace-nowrap"
											htmlFor="lastname">
											First Name:
										</label>
										<input
											id="lastname"
											value={updateUser.firstName}
											onChange={(e) => {
												setUpdateUser({
													...updateUser,
													firstName: e.target.value,
												});
											}}
											className="h-8 px-2 border border-gray-200 rounded-md"
										/>
									</div>
									<div className="w-full h-fit flex flex-row gap-2 text-xl items-center">
										<label
											className="text-gray-400 whitespace-nowrap"
											htmlFor="lastname">
											User Name:
										</label>
										<input
											id="lastname"
											value={updateUser.username}
											onChange={(e) => {
												setUpdateUser({
													...updateUser,
													username: e.target.value,
												});
											}}
											className="h-8 px-2 border border-gray-200 rounded-md"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full h-fit flex flex-row items-center justify-between p-4">
							<button
								onClick={() => {
									setUpdateUser({
										lastName: currentUser.lastName,
										firstName: currentUser.firstName,
										username: currentUser.username,
									});
									setIsEdit(false);
								}}
								className="bg-mecury-gray dark:bg-pot-black text-black dark:text-gray-200 px-4 py-1 rounded-md">
								Cancel
							</button>
							<button
								onClick={() => updateAccount()}
								className="bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200 px-4 py-1 rounded-md">
								Save
							</button>
						</div>
					</Fragment>
				)}
			</div>
		</motion.div>
	);
}

const roleLabel = [
	{ value: UserRole.NONPAID_USER, label: "Non-paid user" },
	{ value: UserRole.PAID_USER, label: "Paid user" },
	{ value: UserRole.STUDENT, label: "Student" },
	{ value: UserRole.ADMIN, label: "Admin" },
	{ value: UserRole.EXAM_ADMIN, label: "Exam admin" },
	{ value: UserRole.SYS_ADMIN, label: "System admin" },
];
