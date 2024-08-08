"use client";
import { use, useEffect, useState } from "react";
import { useTest } from "../../provider/TestProvider";
import { motion } from "framer-motion";
import { Test, TestToCreateTest } from "@/app/interface/test/test";
import { FaXmark } from "react-icons/fa6";
import {
	CreateFullPracticeFromTest,
	CreatePracticeFromTest,
	Skill,
} from "@/app/lib/interfaces";
import QuizPreview from "./QuizPreview";
import { Tag } from "@/app/interface/tag/tag";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { FaTag } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

export default function PopupCreatePractice() {
	const {
		onChangeIsOpenCreateQuizPractice,
		currentPractice,
		test,
		createPratice,
		practiceType,
		tagList,
		currentSkill,
		fetchTagList,
	} = useTest();

	const [currentTest, setCurrentTest] = useState<Test>({
		name: "",
		reading: [],
		listening: [],
		writing: [],
		speaking: [],
	});

	const [selectedTag, setSelectedTag] = useState<Tag[]>([]);

	const [currentFile, setCurrentFile] = useState<File | null>(null);
	const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);
	const [searchValue, setSearchValue] = useState<string>("");

	useEffect(() => {
		if (currentFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setCurrentFileUrl(reader.result as string);
			};
			reader.readAsDataURL(currentFile);
		} else {
			setCurrentFileUrl(null);
		}
	}, [currentFile]);

	const create = () => {
		const newQuiz = { ...currentPractice };
		newQuiz.tags = selectedTag;

		const newTest = { ...currentTest };

		switch (currentPractice.skill) {
			case Skill.LISTENING:
				newTest.listening[0] = newQuiz;
				break;
			case Skill.WRITING:
				newTest.writing[0] = newQuiz;
				break;
			case Skill.SPEAKING:
				newTest.speaking[0] = newQuiz;
				break;
			default:
				newTest.reading[0] = newQuiz;
		}

		const createTest = TestToCreateTest(newTest);

		const createPracticeFromTest: CreatePracticeFromTest = {
			testId: test.id as any,
			test: createTest,
		} as any;

		if (practiceType == "quiz") {
			createPracticeFromTest.quizId = currentPractice.id as any;
		} else {
			const groupId = currentPractice.groups[0].id;
			createPracticeFromTest.groupId = groupId as any;
		}

		const createFullPracticeFromTest: CreateFullPracticeFromTest = {
			files: [currentFile],
			data: createPracticeFromTest,
		};
		console.log(createFullPracticeFromTest);
		createPratice(createFullPracticeFromTest);
	};

	const onChangeName = (e: any) => {
		setCurrentTest({ ...currentTest, name: e.target.value });
	};

	const onSelectFile = (event: any) => {
		if (event.target.files[0]) {
			const file = event.target.files[0];
			setCurrentFile(file);
		}
	};

	const tagRef = useClickOutsideDetails();

	return (
		<div className="fixed flex-1 z-[1100] flex justify-center w-full h-full bg-black bg-opacity-20 dark:bg-opacity-40">
			<motion.form
				onSubmit={(e) => {
					e.preventDefault();
					create();
				}}
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 30,
					stiffness: 500,
				}}
				className="flex flex-col items-center w-8/12 gap-2 mt-8 overflow-hidden bg-gray-50 shadow-md rounded-xl h-4/5 dark:bg-black-night dark:border-gray-22">
				<div className="flex flex-row items-center justify-between w-full p-4 h-fit bg-foreground-blue dark:bg-foreground-red">
					<span className="text-3xl font-bold text-white dark:text-gray-200">
						{currentSkill == Skill.SPEAKING &&
							"Create new speking practice"}
						{currentSkill == Skill.LISTENING &&
							"Create new listening practice"}
						{currentSkill == Skill.WRITING &&
							"Create new writing practice"}
						{currentSkill == Skill.READING &&
							"Create new reading practice"}
					</span>
					<span>
						<FaXmark
							onClick={() =>
								onChangeIsOpenCreateQuizPractice(false)
							}
							className="text-white size-8 dark:text-gray-200"
						/>
					</span>
				</div>
				<div className="flex flex-col items-center w-full gap-4 pt-4 pb-8 overflow-y-scroll scrollbar-hide">
					<input
						value={currentTest ? currentTest.name : ""}
						onChange={onChangeName}
						required
						className="w-10/12 px-4 py-1 text-2xl bg-white rounded-md outline-none h-fit dark:bg-pot-black ring-0 shadow-md"
						placeholder="Enter your practice name"
					/>
					<div className="flex flex-row flex-wrap w-10/12 gap-2 h-fit mb-8">
						<details ref={tagRef} className="relative">
							<summary className="list-none">
								<div className="px-4 py-1 ml-auto text-black hover:bg-blue-50 rounded-md cursor-pointer bg-white dark:bg-gray-22 dark:hover:bg-red-100 dark:hover:bg-opacity-20  dark:text-gray-200 shadow-md">
									Add tag
								</div>
							</summary>
							<div className="absolute w-176 flex flex-col top-10 bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] p-2 min-h-40 gap-4">
								<div className="w-full flex flex-row gap-2 items-center">
									<input
										type="text"
										autoComplete="off"
										value={searchValue}
										onChange={(e) =>
											setSearchValue(e.target.value)
										}
										placeholder="Search tag"
										className="w-1/2 px-2 py-1 bg-gray-100 rounded-md dark:bg-pot-black focus:outline-none focus:ring-0 text-black dark:text-gray-200 text-sm"
									/>
									<IoMdRefresh
										onClick={() => fetchTagList()}
										className="size-7 hover:bg-gray-100 rounded-md dark:hover:bg-pot-black p-1"
									/>
								</div>
								<div className="w-full h-fit flex flex-row flex-wrap gap-2">
									{tagList.map((tag, index) => {
										const sameSkill =
											tag.skill == currentSkill;
										const tagType = tag.forQuiz
											? "quiz"
											: "group";
										const alreadySelected =
											selectedTag.find(
												(t) => t.value == tag.value
											);
										if (!sameSkill) return null;
										if (tagType != practiceType)
											return null;
										if (alreadySelected) return null;
										if (
											searchValue &&
											searchValue.trim() !== "" &&
											!tag.value
												.toLowerCase()
												.includes(
													searchValue.toLowerCase()
												)
										)
											return null;

										return (
											<div
												onClick={() =>
													setSelectedTag([
														...selectedTag,
														tag,
													])
												}
												key={index + tag.id}
												className="flex items-center justify-between gap-2 px-2 py-1 text-black bg-gray-100 rounded-md cursor-default w-fit h-fit dark:bg-pot-black group dark:text-gray-200 shadow-sm hover:bg-blue-50 dark:hover:bg-red-100 dark:hover:bg-opacity-20">
												<FaTag className="size-3" />
												<div className="flex flex-col">
													<span className="text-xs font-bold">
														{tag.value}
													</span>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</details>
						{selectedTag.map((tag, index) => {
							return (
								<div
									key={index + tag.id}
									className="flex items-center justify-between gap-3 px-3 py-2 text-black bg-white rounded-md cursor-default w-fit h-fit dark:bg-gray-22 group dark:text-gray-200 shadow-md hover:bg-blue-50 dark:hover:bg-red-100 dark:hover:bg-opacity-20">
									<FaTag className="size-4" />
									<div className="flex flex-col">
										<span className="text-xs font-bold">
											{tag.value}
										</span>
									</div>
									<FaXmark
										onClick={() =>
											setSelectedTag(
												selectedTag.filter(
													(t) => t.value != tag.value
												)
											)
										}
										className="cursor-pointer size-4"
									/>
								</div>
							);
						})}
					</div>
					<div className="w-10/12 flex items-center justify-start">
						{currentSkill == Skill.LISTENING && (
							<div className="w-1/2 h-fit flex flex-col gap-1 bg-gray-100 dark:bg-[#3b3b3b] rounded-lg shadow-md">
								<audio
									src={currentFileUrl}
									controls
									className="1 outline-none w-full">
									Your browser does not support the audio
									element.
								</audio>
								<hr className="w-full border border-gray-200 dark:border-gray-400" />
								<input
									type="file"
									id="audio"
									accept="audio/*"
									onChange={onSelectFile}
									className="file:border-none file:bg-gray-100 dark:file:bg-[#3b3b3b] file:p-1 file:px-4 rounded-md "
									hidden
								/>
								<label
									htmlFor="audio"
									className="block text-sm mr-4 py-1 px-4 rounded-md border-0 font-semibold bg-gray-100 dark:bg-[#3b3b3b] cursor-pointer">
									Choose audio file
								</label>
								<label className="text-sm text-slate-500"></label>
							</div>
						)}
					</div>

					<QuizPreview />
				</div>
				<div className="flex flex-row items-center justify-between w-full p-2 pb-3 h-fit mt-auto">
					<button className="px-4 py-1 ml-auto text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
						Create practice
					</button>
				</div>
			</motion.form>
		</div>
	);
}
