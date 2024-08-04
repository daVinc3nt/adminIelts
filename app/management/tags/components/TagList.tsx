"use client";
import { FaTag } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useTagManagement } from "../provider/TagManagementProvide";
import { BsThreeDots } from "react-icons/bs";
import { Tag } from "@/app/interface/tag/tag";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { on } from "events";
import { useUtility } from "@/app/provider/UtilityProvider";

export default function TagList() {
	const { tagList, searchValue, fetchType, currentSkill } =
		useTagManagement();

	return (
		<div className="flex w-full p-4  bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[500px] dark:bg-pot-black">
			<div className="flex flex-row flex-wrap w-full gap-4 h-fit">
				{tagList.map((tag, index) => {
					if (
						searchValue &&
						searchValue != "" &&
						!tag.value
							.toUpperCase()
							.includes(searchValue.toUpperCase())
					)
						return null;

					if (
						fetchType &&
						fetchType != "" &&
						new Boolean(tag.forQuiz).toString() != fetchType
					)
						return null;

					if (currentSkill != "" && tag.skill != currentSkill) {
						return null;
					}

					return (
						<div
							key={index + tag.id}
							className="flex items-center justify-between gap-3 px-3 py-2 text-black bg-gray-100 rounded-md cursor-default w-fit h-fit dark:bg-gray-22 group dark:text-gray-200">
							<FaTag className="size-5" />
							<div className="flex flex-col">
								<span className="font-bold text-xs">
									{tag.value}
								</span>
								<div className="flex flex-row gap-1 items-center justify-start">
									<span className="text-xs">{tag.skill}</span>
									<span className="text-xs">-</span>
									<span className="text-xs">
										{tag.forQuiz ? "Quiz tag" : "Group tag"}
									</span>
								</div>
							</div>
							<OptionButton tag={tag} tagIndex={index} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

interface OptionButtonProps {
	tag: Tag;
	tagIndex: number;
}

function OptionButton({ tag, tagIndex }: OptionButtonProps) {
	const { onSetConfirmation } = useUtility();

	const {
		onSelectTag,
		deleteTag,
		onChangeTagIndex,
		onChangeIsOpenUpdateTag,
	} = useTagManagement();

	const inforRef = useClickOutsideDetails();

	const onSelect = () => {
		onChangeTagIndex(tagIndex);
		onSelectTag(tag);
		onChangeIsOpenUpdateTag(true);
		inforRef.current.open = false;
	};

	const onDeleteTag = () => {
		const del = () => {
			deleteTag(tag.id);
			inforRef.current.open = false;
		};

		onSetConfirmation(
			`Do you want to delete "${tag.value}" tag?`,
			del,
			"delete"
		);
	};

	return (
		<details
			tabIndex={-1}
			ref={inforRef}
			className="relative z-20 h-full  cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="p-1  opacity-0 cursor-pointer text-pot-black dark:text-gray-200 group-hover:opacity-100">
					<BsThreeDots className="size-4" />
				</div>
			</summary>
			<div className="absolute -top-2 flex flex-col w-32 gap-1 p-2 bg-white rounded-md shadow-lg h-fit dark:bg-gray-22 left-7">
				<div
					onClick={() => onSelect()}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						Update
					</span>
					<FiEdit className="size-4" />
				</div>
				<div
					onClick={() => onDeleteTag()}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-red-500 text-xs">Delete</span>
					<FaRegTrashCan className="text-red-500 size-4" />
				</div>
			</div>
		</details>
	);
}
