"use client";
import { use, useEffect, useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useUserData } from "../provider/UserDataProvider";
import { UserInformation } from "@/app/interface/user";
import { BsThreeDotsVertical } from "react-icons/bs";
import { on } from "events";

export default function UserList() {
	const { loadMore, userInforList } = useUserData();

	return (
		<div className="flex flex-col items-center w-full px-4 py-2 duration-200 bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-112 h-fit dark:bg-pot-black">
			<div className="flex flex-row items-center w-full gap-2 py-2 font-medium text-gray-400 h-fit">
				<div className="flex items-center justify-center w-[3%]">
					<div className="border-2 rounded-md border-foreground-blue dark:border-foreground-red size-5"></div>
				</div>
				<div className="w-[7%] flex justify-center items-center"></div>
				<div className="w-[25%]">Name</div>
				<div className="w-[20%]">Role</div>
				<div className="w-[25%]">Email</div>
				<div className="w-[10%] text-center">Active</div>
				<div className="w-[5%]"></div>
			</div>
			<hr className="w-full my-1 border border-gray-200 dark:border-gray-400" />
			<List />
			<div className="flex items-center justify-center w-full">
				{userInforList == null ||
					(userInforList.length != 0 && (
						<button
							onClick={() => loadMore()}
							className="p-2 mt-4 duration-200 bg-white rounded-md shadow-md dark:bg-zinc-800 text-pot-black dark:text-gray-200">
							Load more
						</button>
					))}
			</div>
		</div>
	);
}

function List() {
	const { userInforList, setCurrentUser } = useUserData();

	if (!userInforList) return null;

	return (
		<>
			<div className="flex flex-col items-center w-full h-fit">
				{userInforList.map((user) => (
					<div
						key={user.id}
						className="flex flex-row items-center w-full gap-2 py-2 text-sm text-gray-600 duration-200 bg-white rounded-md cursor-default dark:text-gray-200 h-fit dark:bg-pot-black dark:hover:bg-black-night group hover:shadow-md hover:z-10">
						<div className="flex items-center justify-center w-[3%]">
							<div className="border-2 rounded-md border-foreground-blue dark:border-foreground-red size-5"></div>
						</div>
						<div className="w-[7%] flex justify-center items-center">
							<FaCircleUser className="size-10" />
						</div>
						<div className="w-[25%] flex flex-col">
							<span className="text-base font-semibold">
								{user.lastName + " " + user.firstName}
							</span>
							<span className="text-zinc-400 dark:text-gray-400">
								@{user.username}
							</span>
						</div>
						<div className="w-[20%] flex flex-row gap-2">
							{user.roles.map((role, index) => (
								<div
									key={index}
									className="p-1 text-xs text-white bg-foreground-blue dark:bg-foreground-red rounded-md">
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
						<div
							className={`w-[10%] text-center font-semibold ${user.active ? "text-green-400" : "text-red-400"}`}>
							{user.active ? "Active" : "Not Active"}
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

const roleLabel = [
	{ label: "Admin", value: "Quản trị viên" },
	{ label: "Non-paid user", value: "Người dùng không trả phí" },
	{ label: "Premium user", value: "Người dùng trả phí" },
];

interface OptionButtonProps {
	user: UserInformation;
}

function OptionButton({ user }: OptionButtonProps) {
	const { setCurrentUser } = useUserData();

	const inforRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inforRef.current &&
				!inforRef.current.contains(event.target as Node)
			) {
				inforRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const onSelectUser = () => {
		setCurrentUser(user);
		if (inforRef.current) {
			inforRef.current.open = false;
		}
	};

	return (
		<details
			ref={inforRef}
			className="relative z-20 h-full duration-200 cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="p-1 duration-200 opacity-0 cursor-pointer text-pot-black dark:text-gray-200 group-hover:opacity-100">
					<BsThreeDotsVertical className="size-5" />
				</div>
			</summary>
			<div className="absolute top-0 flex flex-col w-24 gap-1 p-2 bg-white rounded-md shadow-lg h-fit dark:bg-gray-22 left-9">
				<div
					onClick={() => onSelectUser()}
					className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					Edit
				</div>
				<div className="p-2 text-red-500 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					Delete
				</div>
			</div>
		</details>
	);
}

