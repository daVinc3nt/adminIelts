"use client";
import { useTestManagement } from "../provider/TestManagementProvider";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { Test } from "@/app/interface/test/test";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { useUtility } from "@/app/provider/UtilityProvider";
import { Fragment } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { IoMdRefresh } from "react-icons/io";
import { useAuth } from "@/app/provider/AuthProvider";
import {
	getRoleFromRoleInfor,
	getTestPrivilege,
} from "@/app/interface/privilegeconfig/privilegeconfig";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { Skill } from "@/app/lib/interfaces";

export default function TestList() {
	const { refresh } = useTestManagement();

	return (
		<div className="flex flex-col items-center w-full px-4 py-2  bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[430px] dark:bg-pot-black">
			<div className="flex flex-row items-center w-full gap-2 py-2 font-medium text-gray-400 h-fit">
				<div className="w-[1%]"></div>
				<div className="w-[20%]">Name</div>
				<div className="w-[40%]">ID</div>
				<div className="w-[8%] text-center">Published</div>
				<div className="w-[13%] text-center">Created at</div>
				<div className="w-[13%] text-center">Updated at</div>
				<div className="w-[5%]">
					<IoMdRefresh
						onClick={() => refresh()}
						className="rounded-md size-6 hover:bg-gray-100 dark:hover:bg-gray-22"
					/>
				</div>
			</div>
			<hr className="w-full my-1 border border-gray-200 dark:border-gray-400" />
			<FullTestList />
		</div>
	);
}

function FullTestList() {
	const { testList, isLoading } = useTestManagement();

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center flex-1">
				<LoadingSpinner size={2} />
			</div>
		);
	}

	if (!testList) return null;

	return (
		<Fragment>
			{testList.map((test, index) => {
				return (
					<div
						key={test.id + index}
						className="flex flex-row items-center w-full gap-2 py-2 text-sm text-gray-600 bg-white rounded-md cursor-default dark:text-gray-200 h-fit dark:bg-pot-black dark:hover:bg-black-night group hover:shadow-md hover:z-10">
						<div className="w-[1%]"></div>
						<div className="w-[20%]">
							<span className="text-base font-semibold">
								{test.name}
							</span>
						</div>
						<div className="w-[40%]">
							<span className="text-sm font-semibold">
								{test.id}
							</span>
						</div>
						<div className="w-[8%] flex items-center justify-center">
							{test.hasPublished ? (
								<FaRegCheckCircle className="text-green-500 size-5" />
							) : (
								<FiXCircle className="text-red-500 size-5" />
							)}
						</div>
						<div className="w-[13%] flex flex-col items-center">
							<span className="text-base font-semibold">
								{new Date(test.createdAt).toLocaleDateString()}
							</span>
							<span className="text-xs">
								{
									new Date(test.createdAt)
										.toTimeString()
										.split(" ")[0]
								}
							</span>
						</div>
						<div className="w-[13%] flex flex-col items-center">
							<span className="text-base font-semibold">
								{new Date(test.updatedAt).toLocaleDateString()}
							</span>
							<span className="text-xs ">
								{
									new Date(test.updatedAt)
										.toTimeString()
										.split(" ")[0]
								}
							</span>
						</div>
						<div className="w-[5%]">
							<OptionButton id={test.id} test={test} />
						</div>
					</div>
				);
			})}
		</Fragment>
	);
}

interface OptionButtonProps {
	id: string;
	test: Test;
}

function OptionButton({ id, test }: OptionButtonProps) {
	const { userInformation, privilage } = useAuth();
	const { onSetConfirmation } = useUtility();
	const { deleteTest } = useTestManagement();
	const inforRef = useClickOutsideDetails();

	const onDelete = () => {
		const del = () => {
			deleteTest(id);
		};
		onSetConfirmation({
			message: `Do you want to delete "${test.name}" test?`,
			onConfirm: del,
			type: "delete",
		});
	};

	const userRoles = getRoleFromRoleInfor(userInformation.roles);
	const isAdmin = getTestPrivilege(userRoles, "create", privilage);

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
				<Link
					href={`/management/ielts/fulltest/${id}`}
					target="_blank"
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						Edit test
					</span>
					<FiEdit className="text-black size-4 dark:text-gray-200" />
				</Link>

				<Link
					href={`/management/ielts/records/${id}`}
					target="_blank"
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						View record
					</span>
					<MdHistory
						stroke="1px"
						className="text-black size-5 dark:text-gray-200"
					/>
				</Link>

				{isAdmin && (
					<div
						onClick={() => onDelete()}
						className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
						<span className="text-xs text-red-500">Delete</span>
						<FaRegTrashCan className="text-red-500 size-4" />
					</div>
				)}
			</div>
		</details>
	);
}
