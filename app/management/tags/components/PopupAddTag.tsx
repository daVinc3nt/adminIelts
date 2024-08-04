"use client";
import { FormEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { motion } from "framer-motion";
import { Tag } from "@/app/interface/tag/tag";
import { useTagManagement } from "../provider/TagManagementProvide";
import { Skill } from "@/app/lib/interfaces";
import { useUtility } from "@/app/provider/UtilityProvider";

export default function PopupAddTag() {
	const { onSetConfirmation } = useUtility();
	const { addTag, onChangeIsOpenAddTag } = useTagManagement();
	const [tag, setTag] = useState<Tag>({
		value: "",
		forQuiz: true,
		skill: "" as any,
	});

	const close = () => {
		setTag({
			value: "",
			forQuiz: true,
			skill: "" as any,
		});
		onChangeIsOpenAddTag(false);
	};

	const addNewTag = (e: FormEvent) => {
		e.preventDefault();
		const add = () => {
			addTag(tag).then((success) => {
				if (success) close();
			});
		};
		onSetConfirmation(
			"After create, you can't change the tag type and skill type. Are you sure you want to create this tag?",
			add,
			"create"
		);
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
				className="flex flex-col gap-2 overflow-hidden bg-white rounded-md w-112 dark:bg-pot-black h-fit">
				<div className="flex flex-row items-center justify-between w-full py-2 px-4 h-fit bg-foreground-blue dark:bg-foreground-red">
					<h1 className="text-3xl font-bold text-white dark:text-gray-200">
						Add new tag
					</h1>

					<FaXmark
						onClick={() => close()}
						className="text-white size-8 dark:text-gray-200"
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
						value={tag.forQuiz ? "Tag for Quiz" : "Tag for Group"}
						onChange={(e) =>
							setTag({
								...tag,
								forQuiz: e.target.value === "Tag for Quiz",
							})
						}
						required
						className="flex-1 px-2 py-1 bg-gray-100 border-0 rounded-md dark:bg-gray-22">
						<option value={"Tag for Quiz"}>Quiz tag</option>
						<option value={"Tag for Group"}>Group tag</option>
					</select>
				</div>
				<div className="flex flex-row flex-wrap w-full gap-2 px-4 py-2">
					<span className="text-lg text-gray-400 min-w-fit">
						Skill:{" "}
					</span>
					<select
						value={tag.skill}
						onChange={(e) =>
							setTag({
								...tag,
								skill: e.target.value as Skill,
							})
						}
						required
						className="flex-1 px-2 py-1 bg-gray-100 border-0 rounded-md dark:bg-gray-22">
						<option value="">Select skill</option>
						<option value={Skill.READING}>Reading</option>
						<option value={Skill.LISTENING}>Listening</option>
						<option value={Skill.WRITING}>Writing</option>
						<option value={Skill.SPEAKING}>Speaking</option>
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
