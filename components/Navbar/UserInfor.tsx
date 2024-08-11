"use client";
import { getSid } from "@/app/interface/cookies/cookies";
import { roleLabel } from "@/app/interface/user/user";
import { AccountOperation, UploadOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { useEffect, useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export default function UserInfor() {
	const { userInformation, logOut } = useAuth();
	const { onSetConfirmation, setError, setSuccess } = useUtility();

	const [avatarPath, setAvatarPath] = useState<string>("/images/user.png");
	const [avatarFile, setAvatarFile] = useState<File>(null);

	useEffect(() => {
		const getObjectUrl = () => {
			if (avatarFile) {
				const url = URL.createObjectURL(avatarFile);
				setAvatarPath(url);
			} else if (userInformation.avatar) {
				const newUploadOperation = new UploadOperation();
				newUploadOperation
					.search(userInformation.avatar, getSid())
					.then((res) => {
						if (res.success) {
							setAvatarPath(res.data);
						} else {
							setAvatarPath("/images/user.png");
						}
					});
			} else {
				setAvatarPath("/images/user.png");
			}
		};
		getObjectUrl();
	}, [avatarFile, userInformation]);

	const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];
		if (file) {
			const newAccountOperation = new AccountOperation();
			newAccountOperation
				.updateAvatar(
					userInformation.id as any,
					{
						avatar: file,
					},
					getSid()
				)
				.then((res) => {
					if (res.success) {
						setSuccess("Avatar updated successfully");
						setAvatarFile(file);
					} else {
						formRef.current.reset();
						setError(res.message);
						console.error(res.message);
					}
				});
		}
	};

	const Ref = useClickOutsideDetails();
	const avatarRef = useClickOutsideDetails();
	const formRef = useRef<HTMLFormElement>();

	const onLogOut = () => {
		onSetConfirmation({
			message: "Are you sure you want to logout?",
			subMessage: "You will be redirected to the login page",
			type: "confirm",
			onConfirm: logOut,
		});
	};

	return (
		<details className="relative" ref={Ref}>
			<summary className="list-none">
				<img
					src={avatarPath}
					className="size-8 rounded-full"
					alt="user-avatar"
				/>
			</summary>
			{userInformation.id != "" ? (
				<div className="absolute w-64 h-60 bg-gray-50 dark:bg-gray-22 shadow-md right-0 top-10 rounded-md flex flex-col overflow-hidden gap-4 p-2">
					<div className="w-full h-fit flex flex-row gap-2 px-2 items-center">
						<details ref={avatarRef} className="relative">
							<summary className="list-none">
								<img
									src={avatarPath}
									className="size-10 rounded-full"
									alt="user-avatar"
								/>
							</summary>
							<form
								ref={formRef}
								className="absolute w-fit h-fit bg-gray-50 dark:bg-gray-22 shadow-md left-0 top-12 rounded-md flex flex-col overflow-hidden p-2">
								<h1 className="font-bold">Change avartar</h1>
								<input
									type="file"
									accept="image/png, image/jpg, image/jpeg"
									onChange={onChangeAvatar}
									className="w-48 px-2 py-1 text-black bg-gray-100 rounded-md dark:bg-black-night focus:outline-none focus:ring-0 dark:text-gray-200 file:border-0 file:bg-gray-100 dark:file:bg-black-night file:focus:outline-none file:focus:ring-0 file:text-black dark:file:text-gray-200"
								/>
							</form>
						</details>
						<div className="w-fit h-fit flex flex-col">
							<span className="text-base font-semibold text-black dark:text-gray-200">
								{userInformation.lastName +
									" " +
									userInformation.firstName}
							</span>
							<span className="text-xs text-black dark:text-gray-200 ">
								@{userInformation.username}
							</span>
							<div className="w-full h-fit flex flex-row flex-wrap gap-2 pt-2">
								{userInformation.roles.map((role, index) => (
									<div
										key={index}
										className="p-1 text-xs text-white rounded-md bg-foreground-blue dark:bg-foreground-red">
										{
											roleLabel.find(
												(label) =>
													label.value === role.role
											)?.label
										}
									</div>
								))}
							</div>
						</div>
					</div>
					<hr className="border-t w-full border-gray-400" />
					<div className="flex flex-row items-center w-full gap-2 h-fit px-2">
						<CiMail className="stroke-1 size-4" />
						<span className="text-xs text-black dark:text-gray-200">
							{userInformation.email}
						</span>
					</div>
					<div className="flex flex-row items-center w-full gap-2 h-fit px-2">
						<FaPhone className="stroke-1 size-3" />
						<span className="text-xs pl-1 text-black dark:text-gray-200">
							{userInformation.phoneNumber
								? userInformation.phoneNumber
								: "N/A"}
						</span>
					</div>
					<div className="w-full flex flex-col mt-auto gap-2">
						<hr className="border-t w-full border-gray-400" />
						<div
							onClick={onLogOut}
							className="flex flex-row items-center justify-between w-full gap-2 h-fit text-black hover:bg-gray-100 p-2 rounded-md dark:hover:bg-pot-black dark:text-gray-200 cursor-pointer">
							<span className="text-sm">Logout</span>
							<IoLogOutOutline className="size-6" />
						</div>
					</div>
				</div>
			) : null}
		</details>
	);
}
