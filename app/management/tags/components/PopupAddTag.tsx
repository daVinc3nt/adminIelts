"use client";
import { FormEvent, Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { motion } from "framer-motion";
import { SplitType } from "@/app/lib/interfaces";
import { Tag } from "@/app/interface/tag/tag";
import { useTagManagement } from "../provider/TagManagementProvide";

export default function PopupAddTag() {
	const { addTag, isOpenAddTag, onChangeIsOpenAddTag } = useTagManagement();
	const [tag, setTag] = useState<Tag>({
		value: "",
		splitType: SplitType.QUIZ_LEVEL,
	});

	if (!isOpenAddTag) return <Fragment />;

	const close = () => {
		setTag({
			value: "",
			splitType: SplitType.QUIZ_LEVEL,
		});
		onChangeIsOpenAddTag(false);
	};

	const addNewTag = (e: FormEvent) => {
		e.preventDefault();
		addTag(tag).then((success) => {
			if (success) close();
		});
	};

	return (
		<div className="fixed z-30 flex justify-center w-full h-full pt-40 bg-black bg-opacity-10 dark:bg-opacity-30">
			<motion.form
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 30,
					stiffness: 500,
				}}
				onSubmit={addNewTag}
				className="flex flex-col gap-2 overflow-hidden bg-white rounded-md w-96 dark:bg-pot-black h-fit">
				<div className="flex flex-row items-center justify-between w-full p-2 h-fit bg-foreground-blue dark:bg-foreground-red">
					<h1 className="text-2xl font-bold text-white dark:text-gray-200">
						Add new tag
					</h1>

					<FaXmark
						onClick={() => close()}
						className="text-white size-6 dark:text-gray-200"
					/>
				</div>

				<div className="flex flex-row flex-wrap w-full gap-2 px-4 py-2">
					<span className="text-lg text-gray-400 min-w-fit">
						Tag name:{" "}
					</span>
					<input
						value={tag.value}
						onChange={(e) =>
							setTag({ ...tag, value: e.target.value })
						}
						type="text"
						required
						autoComplete="off"
						placeholder="Enter tag name"
						className="flex-1 px-2 py-1 bg-gray-100 rounded-md dark:bg-gray-22 focus:outline-none focus:ring-0 "></input>
				</div>

				<div className="flex flex-row flex-wrap w-full gap-2 px-4 py-2">
					<span className="text-lg text-gray-400 min-w-fit">
						Tag type:{" "}
					</span>
					<select
						value={tag.splitType}
						onChange={(e) =>
							setTag({
								...tag,
								splitType: e.target.value as SplitType,
							})
						}
						required
						className="flex-1 px-2 py-1 bg-gray-100 border-0 rounded-md dark:bg-gray-22">
						<option value={SplitType.QUIZ_LEVEL}>Quiz tag</option>
						<option value={SplitType.GROUP_LEVEL}>Group tag</option>
					</select>
				</div>

				<div className="flex flex-row items-center justify-between w-full p-4">
					<button
						onClick={() => close()}
						type="button"
						className="flex flex-row items-center justify-between gap-1 px-2 py-1 font-bold text-black rounded-md w-fit h-fit bg-mecury-gray dark:bg-gray-22 dark:text-gray-200">
						Cancel
						<FcCancel className="size-4" />
					</button>
					<button
						type="submit"
						className="flex flex-row items-center justify-between gap-1 px-2 py-1 font-bold text-white rounded-md w-fit h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
						Add tag
						<FaPlus className="size-4" />
					</button>
				</div>
			</motion.form>
		</div>
	);
}
