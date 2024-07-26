"use client";
import { FormEvent, useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { motion } from "framer-motion";
import { useTagManagement } from "../provider/TagManagementProvide";
import { SplitType } from "@/app/lib/interfaces";
import { Tag } from "@/app/interface/tag";

export default function PopupUpdateTag() {
	const { currentTag, onSelectTag, updateTag } = useTagManagement();
	if (!currentTag) return null;

	const close = () => {
		onSelectTag(null);
	};

	const update = (e: FormEvent) => {
		e.preventDefault();
		const newTag: Tag = {
			id: currentTag.id,
			value: currentTag.value,
			splitType: currentTag.splitType,
		};
		updateTag(newTag).then((success) => {
			if (success) close();
		});
	};

	return (
		<div
			id="popUpUpdateTag"
			className="fixed z-30 flex justify-center w-full h-full pt-40 bg-black bg-opacity-10 dark:bg-opacity-30">
			<motion.form
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.2, type: "tween" }}
				onSubmit={update}
				className="flex flex-col gap-2 overflow-hidden bg-white rounded-md w-96 dark:bg-pot-black h-fit">
				<div className="flex flex-row items-center justify-between w-full p-2 h-fit bg-foreground-blue dark:bg-foreground-red">
					<h1 className="text-2xl font-bold text-white dark:text-gray-200">
						Update tag
					</h1>

					<FaXmark
						onClick={() => close()}
						className="text-white size-6 dark:text-gray-200"
					/>
				</div>

				<div className="flex flex-row flex-wrap w-full gap-2 p-2">
					<span className="text-lg text-gray-400 min-w-fit">
						Tag name:{" "}
					</span>
					<input
						value={currentTag.value}
						onChange={(e) =>
							onSelectTag({
								...currentTag,
								value: e.target.value,
							})
						}
						type="text"
						required
						autoComplete="off"
						placeholder="Enter tag name"
						className="flex-1 px-2 py-1 bg-gray-100 rounded-md focus:outline-none focus:ring-0 "></input>
				</div>

				<div className="flex flex-row flex-wrap w-full gap-2 p-2">
					<span className="text-lg text-gray-400 min-w-fit">
						Tag type:{" "}
					</span>
					<select
						value={currentTag.splitType}
						onChange={(e) =>
							onSelectTag({
								...currentTag,
								splitType: e.target.value as SplitType,
							})
						}
						required
						className="flex-1 px-2 py-1 bg-gray-100 border-0 rounded-md">
						<option value={SplitType.QUIZ_LEVEL}>Quiz tag</option>
						<option value={SplitType.GROUP_LEVEL}>Group tag</option>
					</select>
				</div>

				<div className="flex flex-row items-center justify-between w-full p-2 pt-4">
					<button
						type="button"
						className="flex flex-row items-center justify-between gap-1 px-2 py-1 font-bold text-black rounded-md w-fit h-fit bg-mecury-gray dark:bg-gray-22 dark:text-gray-200">
						Cancel
						<FcCancel className="size-4" />
					</button>
					<button
						type="submit"
						className="flex flex-row items-center justify-between gap-1 px-2 py-1 font-bold text-white rounded-md w-fit h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
						Update
					</button>
				</div>
			</motion.form>
		</div>
	);
}
