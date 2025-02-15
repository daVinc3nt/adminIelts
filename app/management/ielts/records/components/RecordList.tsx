"use client";
import { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRecordManagement } from "../provider/RecordManagementProvider";
import { IoMdInformationCircleOutline, IoMdRefresh } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useUtility } from "@/app/provider/UtilityProvider";

export default function RecordList() {
	const { refresh } = useRecordManagement();
	return (
		<div className="flex flex-col items-center w-full p-4 pt-2  bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[438px] dark:bg-pot-black">
			<div className="flex flex-row items-center w-full gap-2 py-2 font-medium text-gray-400 h-fit">
				<div className="w-[3%]"></div>
				<div className="w-[22%]">Username</div>
				<div className="w-[30%]">Record id</div>
				<div className="w-[10%] text-center">Score</div>
				<div className="w-[15%] text-center">Created at</div>
				<div className="w-[15%] text-center">Updated at</div>
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
	const { recordList, isLoading } = useRecordManagement();

	if (isLoading)
		return (
			<div className="flex items-center justify-center flex-1">
				<LoadingSpinner size={2} />
			</div>
		);

	if (!recordList) return null;

	return (
		<Fragment>
			<div className="flex flex-col items-center w-full h-fit">
				{recordList.map((record) => {
					return (
						<div
							key={record.id}
							className="flex flex-row items-center w-full gap-2 py-2 text-sm text-gray-600 bg-white rounded-md cursor-default dark:text-gray-200 h-fit dark:bg-pot-black dark:hover:bg-black-night group hover:shadow-md hover:z-10">
							<div className="w-[3%]"></div>
							<div className="w-[22%] flex flex-col">
								<span className="text-base font-semibold">
									{record.account.lastName +
										" " +
										record.account.firstName}
								</span>
								<span className="text-zinc-400 dark:text-gray-400">
									@{record.account.username}
								</span>
							</div>
							<div className="w-[30%] font-bold text-sm">
								{record.id}
							</div>
							<div className="w-[10%] text-center font-semibold">
								{record.score}
							</div>
							<div className="w-[15%] flex flex-col items-center">
								<span className="text-base font-semibold">
									{new Date(
										record.createdAt
									).toLocaleDateString()}
								</span>
								<span className="text-xs">
									{
										new Date(record.createdAt)
											.toTimeString()
											.split(" ")[0]
									}
								</span>
							</div>
							<div className="w-[15%] flex flex-col items-center">
								<span className="text-base font-semibold">
									{new Date(
										record.updatedAt
									).toLocaleDateString()}
								</span>
								<span className="text-xs ">
									{
										new Date(record.updatedAt)
											.toTimeString()
											.split(" ")[0]
									}
								</span>
							</div>
							<div className="w-[5%]">
								<OptionButton id={record.id} />
							</div>
						</div>
					);
				})}
			</div>
		</Fragment>
	);
}

interface OptionButtonProps {
	id: string;
}

function OptionButton({ id }: OptionButtonProps) {
	const { onSetConfirmation } = useUtility();
	const { deleteRecord, hasPrivilege } = useRecordManagement();

	const inforRef = useClickOutsideDetails();

	const del = () => {
		onSetConfirmation({
			message: "Do you want to delete this record?",
			onConfirm: () => deleteRecord(id),
			type: "delete",
		});
	};

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
					href={`/management/ielts/records/fulltest/${id}`}
					target="_blank"
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						Detail
					</span>
					<IoMdInformationCircleOutline className="size-[18px]" />
				</Link>
				{hasPrivilege && (
					<div
						onClick={() => del()}
						className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
						<span className="text-xs text-red-500">Delete</span>
						<FaRegTrashCan className="text-red-500 size-4" />
					</div>
				)}
			</div>
		</details>
	);
}
