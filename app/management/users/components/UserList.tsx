"use client";
import { useUserManagement } from "../provider/UserManagementProvider";
import { roleLabel, UserInformation } from "@/app/interface/user/user";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiEdit, FiXCircle } from "react-icons/fi";
import { IoMdInformationCircleOutline, IoMdRefresh } from "react-icons/io";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function UserList() {
	const { refresh } = useUserManagement();

	return (
		<div className="flex flex-col items-center w-full px-4 py-2  bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[434px] dark:bg-pot-black">
			<div className="flex flex-row items-center w-full gap-2 py-2 font-medium text-gray-400 h-fit">
				<div className="w-[7%] flex justify-center items-center"></div>
				<div className="w-[23%]">Name</div>
				<div className="w-[30%]">Role</div>
				<div className="w-[25%]">Email</div>
				<div className="w-[5%] text-center">Active</div>
				<div className="w-[5%]">
					<IoMdRefresh
						onClick={() => refresh()}
						className="rounded-md size-6 hover:bg-gray-100 dark:hover:bg-gray-22"
					/>
				</div>
			</div>
			<hr className="w-full my-1 border border-gray-200 dark:border-gray-400" />
			<List />
		</div>
	);
}

function List() {
	const { userInforList, isLoading, avartarFilePaths } = useUserManagement();

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center flex-1">
				<LoadingSpinner size={2} />
			</div>
		);
	}

	if (!userInforList) return null;

	return (
		<>
			<div className="flex flex-col items-center w-full h-fit">
				{userInforList.map((user, index) => (
					<div
						key={user.id}
						className="flex flex-row items-center w-full gap-2 py-2 text-sm text-gray-600 bg-white rounded-md cursor-default dark:text-gray-200 h-fit dark:bg-pot-black dark:hover:bg-black-night group hover:shadow-md hover:z-10">
						<div className="w-[7%] flex justify-center items-center">
							<img
								src={avartarFilePaths[index]}
								className="size-10 rounded-full"
								alt="user-avatar"
							/>
						</div>
						<div className="w-[23%] flex flex-col">
							<span className="text-base font-semibold">
								{user.lastName + " " + user.firstName}
							</span>
							<span className="text-zinc-400 dark:text-gray-400">
								@{user.username}
							</span>
						</div>
						<div className="w-[30%] flex flex-row gap-2">
							{user.roles.map((role, index) => (
								<div
									key={index}
									className="p-1 text-xs text-white rounded-md bg-foreground-blue dark:bg-foreground-red">
									{
										roleLabel.find(
											(label) => label.value === role.role
										)?.label
									}
								</div>
							))}
						</div>
						<div className="w-[25%] font-semibold">
							{user.email}
						</div>
						<div className="w-[5%] flex items-center justify-center">
							{user.active ? (
								<FaRegCheckCircle className="text-green-500 size-5" />
							) : (
								<FiXCircle className="text-red-500 size-5" />
							)}
						</div>
						<div className="w-[5%]">
							<OptionButton user={user} />
						</div>
					</div>
				))}
			</div>
		</>
	);
}

interface OptionButtonProps {
	user: UserInformation;
}

function OptionButton({ user }: OptionButtonProps) {
	const {
		onChangeCurrentUser,
		onChangeIsOpenUpdateInfor,
		onChangeIsOpenUserInfor,
	} = useUserManagement();

	const inforRef = useClickOutsideDetails();

	return (
		<details
			ref={inforRef}
			className="relative z-20 h-full cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="p-1 opacity-0 cursor-pointer text-pot-black dark:text-gray-200 group-hover:opacity-100">
					<BsThreeDotsVertical className="size-5" />
				</div>
			</summary>
			<div className="absolute top-0 flex flex-col gap-1 p-2 bg-white rounded-md shadow-lg w-[130px] h-fit dark:bg-gray-22 left-8">
				<div
					onClick={() => {
						onChangeIsOpenUserInfor(true);
						onChangeCurrentUser(user);
					}}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						Detail
					</span>
					<IoMdInformationCircleOutline className="size-[18px]" />
				</div>
				<div
					onClick={() => {
						onChangeCurrentUser(user);
						onChangeIsOpenUpdateInfor(true);
					}}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						Update
					</span>
					<FiEdit className="size-4" />
				</div>
			</div>
		</details>
	);
}
