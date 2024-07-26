"use client";
import { FaTag } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useTagManagement } from "../provider/TagManagementProvide";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useRef } from "react";
import { Tag } from "@/app/interface/tag";

export default function TagList() {
	const { tagList, searchValue, fetchType } = useTagManagement();

	return (
		<div className="flex w-full p-4 duration-200 bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[500px] dark:bg-pot-black">
			<div className="flex flex-row flex-wrap w-full gap-4 h-fit">
				{tagList.map((tag, index) => {
					if (
						searchValue &&
						searchValue != "" &&
						!tag.value.includes(searchValue.toUpperCase())
					)
						return null;

					if (
						fetchType &&
						fetchType != "" &&
						tag.splitType != fetchType
					)
						return null;

					return (
						<div
							key={index + tag.id}
							className="flex items-center justify-between gap-2 px-3 py-2 text-xs text-black bg-gray-100 rounded-md cursor-default w-fit h-fit dark:bg-gray-22 group dark:text-gray-200">
							<FaTag className="size-3" />
							<span className="font-bold">{tag.value}</span>
							<OptionButton tag={tag} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

interface OptionButtonProps {
	tag: Tag;
}

function OptionButton({ tag }: OptionButtonProps) {
	const { onSelectTag, deleteTag } = useTagManagement();

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

	return (
		<details
			tabIndex={-1}
			ref={inforRef}
			className="relative z-20 h-full duration-200 cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="p-1 duration-200 opacity-0 cursor-pointer text-pot-black dark:text-gray-200 group-hover:opacity-100">
					<BsThreeDots className="size-4" />
				</div>
			</summary>
			<div className="absolute top-0 flex flex-col w-32 gap-1 p-2 bg-white rounded-md shadow-lg h-fit dark:bg-gray-22 left-7">
				<div
					onClick={() => {
						onSelectTag(tag);
						inforRef.current.open = false;
					}}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span>Update</span>
					<FiEdit className="size-4" />
				</div>
				<div
					onClick={() => {
						deleteTag(tag.id);
						inforRef.current.open = false;
					}}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-red-500">Delete</span>
					<FaRegTrashCan className="text-red-500 size-4" />
				</div>
			</div>
		</details>
	);
}
