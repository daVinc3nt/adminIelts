"use client";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { useWritingManagement } from "../provider/WritingManagementProvider";

export default function WritingList() {
	return (
		<div className="flex flex-col items-center w-full p-4 pt-2  bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[438px] dark:bg-pot-black">
			<div className="flex flex-row items-center w-full gap-2 py-2 font-medium text-gray-400 h-fit">
				<div className="w-[3%]"></div>
				<div className="w-[22%]">Username</div>
				<div className="w-[35%]">Writing answer id</div>
				<div className="w-[10%] text-center">Scored</div>
				<div className="w-[10%] text-center">Date created</div>
				<div className="w-[10%] text-center">Last update</div>
				<div className="w-[5%]"></div>
			</div>
			<hr className="w-full my-1 border border-gray-200 dark:border-gray-400" />
			<List />
		</div>
	);
}

function List() {
	const { writingList } = useWritingManagement();

	if (!writingList) return null;

	return (
		<>
			<div className="flex flex-col items-center w-full h-fit">
				{writingList.map((writingAnswer) => {
					return (
						<div
							key={writingAnswer.id}
							className="flex flex-row items-center w-full gap-2 py-2 text-sm text-gray-600  bg-white rounded-md cursor-default dark:text-gray-200 h-fit dark:bg-pot-black dark:hover:bg-black-night group hover:shadow-md hover:z-10">
							<div className="w-[3%]"></div>
							<div className="w-[22%] flex flex-col">
								<span className="text-base font-semibold">
									{writingAnswer.account.lastName +
										" " +
										writingAnswer.account.firstName}
								</span>
								<span className="text-zinc-400 dark:text-gray-400">
									@{writingAnswer.account.username}
								</span>
							</div>
							<div className="w-[35%] font-bold">
								{writingAnswer.id}
							</div>
							<div className="w-[10%] flex items-center justify-center">
								<FiXCircle className="size-4 text-red-500 text-center" />
							</div>
							<div className="w-[10%] text-center font-semibold">
								{new Date(
									writingAnswer.createdAt
								).toLocaleDateString()}
							</div>
							<div className="w-[10%] text-center font-semibold">
								{new Date(
									writingAnswer.updatedAt
								).toLocaleDateString()}
							</div>
							<div className="w-[5%]">
								<OptionButton id={writingAnswer.id} />
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

interface OptionButtonProps {
	id: string;
}

function OptionButton({ id }: OptionButtonProps) {
	const inforRef = useClickOutsideDetails();

	return (
		<details
			ref={inforRef}
			className="relative z-20 h-full  cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="p-1  opacity-0 cursor-pointer text-pot-black dark:text-gray-200 group-hover:opacity-100">
					<BsThreeDotsVertical className="size-5" />
				</div>
			</summary>
			<div className="absolute top-0 flex flex-col gap-1 p-2 bg-white rounded-md shadow-lg w-[130px] h-fit dark:bg-gray-22 left-8">
				<Link
					href={`/management/ielts/writing/${id}`}
					target="_blank"
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						Detail
					</span>
					<IoMdInformationCircleOutline className="size-[18px]" />
				</Link>
				<div className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-red-500">Delete</span>
					<FaRegTrashCan className="text-red-500 size-4" />
				</div>
			</div>
		</details>
	);
}
