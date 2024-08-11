"use client";
import { FaPlus } from "react-icons/fa";
import { useTagManagement } from "../provider/TagManagementProvide";

export default function AddTagButton() {
	const { onChangeIsOpenAddTag } = useTagManagement();

	return (
		<div
			onClick={() => onChangeIsOpenAddTag(true)}
			className="w-fit px-3 py-[6px] bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200 rounded-md font-bold flex flex-row gap-2 items-center justify-center cursor-pointer">
			Add new tag
			<FaPlus className="size-4" />
		</div>
	);
}
