"use client";
import { useEffect, useState } from "react";
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
import { TagOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { FaTag } from "react-icons/fa";

export default function PopupCreatePractice() {
	const { sid } = useAuth();

	const {
		onChangeIsOpenCreateQuizPractice,
		currentPractice,
		test,
		createPratice,
		practiceType,
		tagList,
	} = useTest();

	const [currentTest, setCurrentTest] = useState<Test>({
		name: "New Practice",
		reading: [],
		listening: [],
		writing: [],
		speaking: [],
	});

	const [selectedTag, setSelectedTag] = useState<Tag[]>([]);

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
			files: [],
			data: createPracticeFromTest,
		};
		createPratice(createFullPracticeFromTest);
	};

	const onChangeName = (e: any) => {
		setCurrentTest({ ...currentTest, name: e.target.value });
	};

	const tagRef = useClickOutsideDetails();

	return (
		<div className="fixed flex-1 z-[5000] flex justify-center w-full h-full bg-black bg-opacity-20 dark:bg-opacity-40">
			<motion.div
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 30,
					stiffness: 500,
				}}
				className="flex flex-col items-center w-8/12 gap-2 mt-8 overflow-hidden bg-gray-100 shadow-md rounded-xl h-4/5 dark:bg-black-night dark:border-gray-22">
				<div className="flex flex-row items-center justify-between w-full p-4 h-fit bg-foreground-blue dark:bg-foreground-red">
					<span className="text-3xl font-bold text-white dark:text-gray-200">
						Create new practice
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
						className="w-10/12 px-4 py-1 text-2xl duration-200 bg-white rounded-md outline-none h-fit dark:bg-pot-black ring-0"
						placeholder="Enter your test name"
					/>
					<div className="flex flex-row flex-wrap w-10/12 gap-2 h-fit">
						<details ref={tagRef} className="relative">
							<summary className="list-none">
								<div className="px-4 py-1 ml-auto text-white rounded-md cursor-pointer bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
									Add tag
								</div>
							</summary>
							<div className="top-12 -left-10 absolute w-[900px] h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-row flex-wrap gap-4 p-4">
								{tagList.map((tag, index) => {
									if (practiceType == "group" && tag.forQuiz)
										return null;
									if (practiceType == "quiz" && !tag.forQuiz)
										return null;
									if (
										selectedTag.find(
											(t) => t.value == tag.value
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
											className="flex items-center justify-between gap-3 px-3 py-2 text-black bg-gray-100 rounded-md cursor-default w-fit h-fit dark:bg-pot-black group dark:text-gray-200">
											<FaTag className="size-4" />
											<div className="flex flex-col">
												<span className="text-xs font-bold">
													{tag.value}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						</details>
						{selectedTag.map((tag, index) => {
							return (
								<div
									key={index + tag.id}
									className="flex items-center justify-between gap-3 px-3 py-2 text-black bg-white rounded-md cursor-default w-fit h-fit dark:bg-gray-22 group dark:text-gray-200">
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
					<QuizPreview />
				</div>
				<div className="flex flex-row items-center justify-between w-full p-2 pb-3 h-fit">
					<button
						onClick={() => create()}
						className="px-4 py-1 ml-auto text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
						Create practice
					</button>
				</div>
			</motion.div>
		</div>
	);
}
