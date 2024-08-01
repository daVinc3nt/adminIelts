"use client";
import { Skill } from "@/app/lib/interfaces";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTestManagement } from "../../provider/TestManagementProvider";
import QuizPreview from "./QuizPreview";
import { FaXmark } from "react-icons/fa6";
import { useHorizontallScroll } from "@/hooks/useHorizontalScroll";

export default function PopupTestPreview() {
	const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
	const [currentSkill, setCurrentSkill] = useState<Skill>(Skill.READING);

	const { currentTest, onSelectTest } = useTestManagement();

	useEffect(() => {
		if (currentTest) {
			setCurrentQuizIndex(0);
			if (currentTest.reading.length > 0) {
				setCurrentSkill(Skill.READING);
			} else if (currentTest.listening.length > 0) {
				setCurrentSkill(Skill.LISTENING);
			} else if (currentTest.writing.length > 0) {
				setCurrentSkill(Skill.WRITING);
			} else if (currentTest.speaking.length > 0) {
				setCurrentSkill(Skill.SPEAKING);
			}
		}
	}, [currentTest]);

	const TabRef = useHorizontallScroll();

	if (!currentTest) return null;

	return (
		<div className="fixed z-30 flex justify-center w-full h-full bg-black bg-opacity-20 dark:bg-opacity-40">
			<motion.div
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 30,
					stiffness: 500,
				}}
				className="flex flex-col mt-8 overflow-hidden bg-gray-100 shadow-md rounded-xl w-8/12 h-4/5 dark:bg-black-night dark:border-gray-22 items-center gap-2">
				<div className="w-full h-fit flex flex-row bg-foreground-blue dark:bg-foreground-red p-4 items-center justify-between">
					<span className="text-3xl text-white dark:text-gray-200 font-bold">
						{currentTest.name} Preview
					</span>
					<span>
						<FaXmark
							onClick={() => onSelectTest(null)}
							className="size-8 text-white dark:text-gray-200"
						/>
					</span>
				</div>
				<div
					ref={TabRef}
					className="flex flex-row w-10/12 min-h-10 gap-2 overflow-x-scroll cursor-pointer scrollbar-hide">
					{currentTest.reading.map((_, index) => {
						return (
							<span
								onClick={() => {
									setCurrentQuizIndex(index);
									setCurrentSkill(Skill.READING);
								}}
								key={index}
								className={`block whitespace-nowrap w-fit h-fit px-3 py-1 text-center rounded-md cursor-pointer duration-200 ${currentQuizIndex == index && currentSkill == Skill.READING ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
								Reading Part {index + 1}
							</span>
						);
					})}
					{currentTest.listening.map((_, index) => {
						return (
							<span
								onClick={() => {
									setCurrentQuizIndex(index);
									setCurrentSkill(Skill.LISTENING);
								}}
								key={index}
								className={`block whitespace-nowrap w-fit h-fit px-3 py-1 text-center rounded-md cursor-pointer duration-200 ${currentQuizIndex == index && currentSkill == Skill.LISTENING ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
								Listening Part {index + 1}
							</span>
						);
					})}
					{currentTest.writing.map((_, index) => {
						return (
							<span
								onClick={() => {
									setCurrentQuizIndex(index);
									setCurrentSkill(Skill.WRITING);
								}}
								key={index}
								className={`block whitespace-nowrap w-fit h-fit px-3 py-1 text-center rounded-md cursor-pointer duration-200 ${currentQuizIndex == index && currentSkill == Skill.LISTENING ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
								Listening Part {index + 1}
							</span>
						);
					})}
					{currentTest.speaking.map((_, index) => {
						return (
							<span
								onClick={() => {
									setCurrentQuizIndex(index);
									setCurrentSkill(Skill.SPEAKING);
								}}
								key={index}
								className={`block whitespace-nowrap w-fit h-fit px-3 py-1 text-center rounded-md cursor-pointer duration-200 ${currentQuizIndex == index && currentSkill == Skill.LISTENING ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
								Listening Part {index + 1}
							</span>
						);
					})}
				</div>
				<div className="w-full flex flex-col overflow-y-scroll scrollbar-hide items-center">
					{currentTest.reading.map((_, index) => {
						if (
							currentQuizIndex !== index ||
							currentSkill != Skill.READING
						)
							return null;
						return (
							<QuizPreview
								key={index}
								quizIndex={index}
								quizskill={Skill.READING}
							/>
						);
					})}
					{currentTest.listening.map((_, index) => {
						if (
							currentQuizIndex !== index ||
							currentSkill != Skill.LISTENING
						)
							return null;
						return (
							<QuizPreview
								key={index}
								quizIndex={index}
								quizskill={Skill.LISTENING}
							/>
						);
					})}
				</div>
			</motion.div>
		</div>
	);
}
