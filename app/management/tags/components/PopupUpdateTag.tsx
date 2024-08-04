"use client";
import { FormEvent } from "react";
import { FaXmark } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { motion } from "framer-motion";
import { useTagManagement } from "../provider/TagManagementProvide";
import { Tag } from "@/app/interface/tag/tag";
import { Skill } from "@/app/lib/interfaces";

export default function PopupUpdateTag() {
	const {
		currentTag,
		onSelectTag,
		updateTag,
		tagIndex,
		tagList,
		onChangeIsOpenUpdateTag,
	} = useTagManagement();

	const onChangeTagValue = (value: string) => {
		onSelectTag({ ...currentTag, value });
	};

	const close = () => {
		onChangeIsOpenUpdateTag(false);
	};

	const update = (e: FormEvent) => {
		e.preventDefault();

		// UpdateTag doesn't allow update forQuiz without changing the tag name
		let newTag: Tag = {
			id: currentTag.id,
			value: currentTag.value,
			forQuiz: currentTag.forQuiz,
			skill: currentTag.skill,
		};

		if (
			tagList[tagIndex].forQuiz != currentTag.forQuiz &&
			tagList[tagIndex].value == currentTag.value
		) {
			newTag.value = newTag.value + " ";
			updateTag(newTag, true).then((success) => {
				if (success) {
					newTag.value = currentTag.value;
					updateTag(newTag).then((success) => {
						if (success) close();
					});
				}
			});
		} else {
			updateTag(newTag).then((success) => {
				if (success) close();
			});
		}
	};

	return (
		<div
			id="popUpUpdateTag"
			className="fixed z-30 flex justify-center w-full h-full pt-40 bg-black bg-opacity-10 dark:bg-opacity-30">
			<motion.form
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 30,
					stiffness: 500,
				}}
				onSubmit={update}
				className="flex flex-col gap-2 overflow-hidden bg-white rounded-md w-112 dark:bg-pot-black h-fit">
				<div className="flex flex-row items-center justify-between w-full px-4 py-2 h-fit bg-foreground-blue dark:bg-foreground-red">
					<h1 className="text-3xl font-bold text-white dark:text-gray-200">
						Update tag
					</h1>

					<FaXmark
						onClick={() => close()}
						className="text-white size-8 dark:text-gray-200"
					/>
				</div>

				<div className="flex flex-row flex-wrap w-full gap-2 p-4">
					<span className="text-lg text-gray-400 min-w-fit">
						Tag name:{" "}
					</span>
					<input
						value={currentTag.value}
						onChange={(e) => onChangeTagValue(e.target.value)}
						type="text"
						required
						autoComplete="off"
						placeholder="Enter tag name"
						className="flex-1 px-2 py-1 bg-gray-100 rounded-md dark:bg-gray-22 focus:outline-none focus:ring-0 "></input>
				</div>

				{/* <div className="flex flex-row flex-wrap w-full gap-2 p-4">
					<span className="text-lg text-gray-400 min-w-fit">
						Tag type:{" "}
					</span>
					<select
						value={
							currentTag.forQuiz
								? "Tag for Quiz"
								: "Tag for Group"
						}
						onChange={(e) =>
							onSelectTag({
								...currentTag,
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
						value={
							currentTag.skill ? currentTag.skill : Skill.READING
						}
						onChange={(e) =>
							onSelectTag({
								...currentTag,
								skill: e.target.value as Skill,
							})
						}
						required
						className="flex-1 px-2 py-1 bg-gray-100 border-0 rounded-md dark:bg-gray-22">
						<option value={Skill.READING}>Reading</option>
						<option value={Skill.LISTENING}>Listening</option>
						<option value={Skill.WRITING}>Writing</option>
						<option value={Skill.SPEAKING}>Speaking</option>
					</select>
				</div> */}

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
						Update
					</button>
				</div>
			</motion.form>
		</div>
	);
}
