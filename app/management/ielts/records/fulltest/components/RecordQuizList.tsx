"use client";
import { useRecord } from "../../fulltest/provider/RecordProvider";
import { Skill } from "@/app/lib/interfaces";
import { useHorizontallScroll } from "@/hooks/useHorizontalScroll";

export default function RecordQuizList() {
	const {
		record,
		currentQuizIndex,
		currentSkill,
		onChangeCurrentQuizIndex,
		onChangeSkill,
	} = useRecord();

	const Tabref = useHorizontallScroll();

	if (!record) {
		return null;
	}

	return (
		<div
			className="flex flex-row w-full h-10 gap-2 overflow-x-scroll overflow-y-visible cursor-pointer scrollbar-hide mt-8"
			ref={Tabref}>
			{record.reading.map((quiz, index) => {
				return (
					<div
						onClick={() => {
							onChangeCurrentQuizIndex(index);
							onChangeSkill(Skill.READING);
						}}
						key={quiz.id + index}
						className={`relative flex flex-row items-center justify-center whitespace-nowrap w-fit h-fit px-3 py-1 text-center rounded-md cursor-pointer  ${currentQuizIndex == index && currentSkill == Skill.READING ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
						Reading Part {index + 1}
					</div>
				);
			})}
			{record.listening.map((quiz, index) => {
				return (
					<div
						onClick={() => {
							onChangeCurrentQuizIndex(index);
							onChangeSkill(Skill.LISTENING);
						}}
						key={quiz.id + index}
						className={`relative flex flex-row items-center justify-center whitespace-nowrap w-fit h-fit px-3 py-1 text-center rounded-md cursor-pointer  ${currentQuizIndex == index && currentSkill == Skill.LISTENING ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
						Listening Part {index + 1}
					</div>
				);
			})}
		</div>
	);
}
