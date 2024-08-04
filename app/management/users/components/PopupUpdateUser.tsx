"use client";
import { FaRegTrashCan, FaXmark } from "react-icons/fa6";
import { useUserManagement } from "../provider/UserManagementProvider";
import { motion } from "framer-motion";
import { UpdateAccountPayload, UserRole } from "@/app/lib/interfaces";
import { FormEvent, useEffect, useRef, useState } from "react";
import { roleLabel } from "@/app/interface/user/user";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";

export default function PopupUpdateUser() {
	const {
		currentUser,
		onChangeIsOpenUpdateInfor,
		onChangeCurrentUser,
		updateUserInformation,
	} = useUserManagement();

	const [password, setPassword] = useState<string>("");

	const addRoleRef = useClickOutsideDetails();

	const onSelectRole = (role: string) => {
		const newRole = {
			role: role,
		};
		onChangeCurrentUser({
			...currentUser,
			roles: [...currentUser.roles, newRole as any],
		});

		if (addRoleRef.current) {
			addRoleRef.current.open = false;
		}
	};

	const onDeleteRole = (role: string) => {
		const newRoles = currentUser.roles.filter((r) => r.role !== role);
		onChangeCurrentUser({
			...currentUser,
			roles: newRoles,
		});
	};

	const updateAccount = (e: FormEvent) => {
		e.preventDefault();

		console.log(currentUser.id);

		const newUpdateAccountPayload: UpdateAccountPayload = {
			username: currentUser.username,
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			roles: currentUser.roles.map((role) => {
				switch (role.role) {
					case UserRole.ADMIN:
						return "ADMIN";
					case UserRole.SYS_ADMIN:
						return "SYS_ADMIN";
					case UserRole.EXAM_ADMIN:
						return "EXAM_ADMIN";
					case UserRole.STUDENT:
						return "STUDENT";
					case UserRole.PAID_USER:
						return "PAID_USER";
					default:
						return "NONPAID_USER";
				}
			}) as any,
		};

		if (password && password != "") {
			newUpdateAccountPayload.password = password;
		}

		if (currentUser.phoneNumber && currentUser.phoneNumber != "") {
			newUpdateAccountPayload.phoneNumber = currentUser.phoneNumber;
		}

		if (currentUser.dateOfBirth && currentUser.dateOfBirth != "") {
			newUpdateAccountPayload.dateOfBirth = new Date(
				currentUser.dateOfBirth
			);
		}
		updateUserInformation(newUpdateAccountPayload);
	};

	return (
		<div className="fixed z-30 flex justify-center w-full h-full bg-black bg-opacity-20 dark:bg-opacity-40">
			<motion.form
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 30,
					stiffness: 500,
				}}
				onSubmit={(e) => {
					updateAccount(e);
				}}
				className="flex flex-col pb-4 mt-8 overflow-hidden bg-white shadow-md rounded-xl w-144 h-fit dark:bg-pot-black dark:border-gray-22">
				<div className="flex flex-row items-center justify-between w-full px-4 py-3 cursor-default h-fit bg-foreground-blue dark:bg-foreground-red">
					<span className="text-2xl font-bold text-white dark:text-gray-200">
						Update Information
					</span>
					<FaXmark
						onClick={() => onChangeIsOpenUpdateInfor(false)}
						className="text-white cursor-pointer stroke-1 dark:text-gray-200 size-7"
					/>
				</div>

				<div className="flex flex-col items-center justify-center w-full gap-4 px-4 pt-6 h-fit">
					<div className="w-full h-fit">
						<span className="text-2xl font-bold dark:text-gray-400">
							Basic Information
						</span>
					</div>
					<div className="flex flex-row items-center justify-center w-full gap-2 h-fit">
						<span className="w-1/4 text-lg text-gray-400">
							Last name:
						</span>
						<input
							value={currentUser.lastName}
							onChange={(e) =>
								onChangeCurrentUser({
									...currentUser,
									lastName: e.target.value,
								})
							}
							required
							className="flex-1 px-2 py-1 text-base bg-gray-100 rounded-md focus:outline-none focus:ring-0 dark:bg-gray-22"
						/>
					</div>
					<div className="flex flex-row items-center justify-center w-full gap-2 h-fit">
						<span className="w-1/4 text-lg text-gray-400">
							First name:
						</span>
						<input
							value={currentUser.firstName}
							onChange={(e) =>
								onChangeCurrentUser({
									...currentUser,
									firstName: e.target.value,
								})
							}
							required
							className="flex-1 px-2 py-1 text-base bg-gray-100 rounded-md focus:outline-none focus:ring-0 dark:bg-gray-22"
						/>
					</div>
					<div className="flex flex-row items-center justify-center w-full gap-2 h-fit">
						<span className="w-1/4 text-lg text-gray-400">
							User name:
						</span>
						<input
							value={currentUser.username}
							onChange={(e) =>
								onChangeCurrentUser({
									...currentUser,
									username: e.target.value,
								})
							}
							required
							className="flex-1 px-2 py-1 text-base bg-gray-100 rounded-md focus:outline-none focus:ring-0 dark:bg-gray-22"
						/>
					</div>
					<div className="flex flex-row items-center justify-center w-full gap-2 h-fit">
						<span className="w-1/4 text-lg text-gray-400">
							Phone number:
						</span>
						<input
							value={
								currentUser.phoneNumber
									? currentUser.phoneNumber
									: ""
							}
							onChange={(e) =>
								onChangeCurrentUser({
									...currentUser,
									phoneNumber: e.target.value,
								})
							}
							type="number"
							className="flex-1 px-2 py-1 text-base bg-gray-100 rounded-md focus:outline-none focus:ring-0 dark:bg-gray-22"
						/>
					</div>
					<div className="flex flex-row items-center justify-center w-full gap-2 h-fit">
						<span className="w-1/4 text-lg text-gray-400">
							Date of birth:
						</span>
						<input
							value={
								currentUser.dateOfBirth
									? currentUser.dateOfBirth
									: ""
							}
							onChange={(e) =>
								onChangeCurrentUser({
									...currentUser,
									dateOfBirth: e.target.value,
								})
							}
							type="date"
							className="flex-1 px-2 py-1 text-base bg-gray-100 rounded-md focus:outline-none focus:ring-0 dark:bg-gray-22"
						/>
					</div>
				</div>

				<div className="flex flex-row w-full gap-4 px-4 pt-6 h-fit">
					<div className="flex flex-col w-1/4 gap-2 h-fit">
						<span className="text-2xl font-bold dark:text-gray-400">
							User role
						</span>
						<details ref={addRoleRef} className="relative">
							<summary className="list-none">
								<div className="px-4 py-1 text-black bg-gray-100 rounded-md cursor-pointer w-fit h-fit dark:bg-gray-22 dark:text-gray-200">
									Add role
								</div>
							</summary>
							<div className="absolute top-0 flex flex-wrap gap-2 p-2 bg-white border rounded-md shadow-md w-60 left-24 h-fit dark:bg-pot-black dark:shadow-black-night dark:border-black-night">
								{roleLabel.map((role, index) => {
									if (
										currentUser.roles.find(
											(r) => r.role === role.value
										)
									) {
										return null;
									}
									return (
										<div
											key={index}
											onClick={() =>
												onSelectRole(role.value)
											}
											className="flex flex-row items-center justify-center p-1 font-bold text-black  border-2 rounded-md cursor-pointer h-fit w-fit hover:text-white dark:text-gray-200 borde-0 whitespace-nowrap hover:bg-foreground-blue dark:hover:bg-foreground-red border-foreground-blue dark:border-foreground-red">
											{role.label}
										</div>
									);
								})}
							</div>
						</details>
					</div>
					<div className="flex flex-row flex-wrap flex-1 gap-2 pt-2 h-fit">
						{currentUser.roles.map((role, index) => (
							<div
								key={index}
								className="flex flex-row items-center justify-between gap-1 p-1 text-sm text-white rounded-md cursor-default bg-foreground-blue dark:bg-foreground-red">
								<span>
									{
										roleLabel.find(
											(label) => label.value === role.role
										)?.label
									}
								</span>
								{role.role != UserRole.NONPAID_USER && (
									<FaRegTrashCan
										onClick={() => onDeleteRole(role.role)}
										className="text-white cursor-pointer size-4"
									/>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-col items-center justify-center w-full gap-4 px-4 pt-6 h-fit">
					<div className="w-full h-fit">
						<span className="text-2xl font-bold dark:text-gray-400">
							User Password
						</span>
					</div>
					<div className="flex flex-row items-center justify-center w-full gap-2 h-fit">
						<span className="w-1/4 text-lg text-gray-400">
							New password:
						</span>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="text"
							placeholder="Leave blank if not change"
							className="flex-1 px-2 py-1 text-base bg-gray-100 rounded-md focus:outline-none focus:ring-0 dark:bg-gray-22"
						/>
					</div>
				</div>

				<div className="flex flex-row items-center justify-between w-full gap-4 px-4 pt-8 h-fit">
					<button
						type="button"
						onClick={() => onChangeIsOpenUpdateInfor(false)}
						className="px-4 py-1 text-black bg-gray-100 rounded-md w-fit h-fit dark:bg-gray-22 dark:text-gray-200">
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-1 text-white rounded-md w-fit h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
						Update
					</button>
				</div>
			</motion.form>
		</div>
	);
}
