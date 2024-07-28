import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { useRecord } from "../../fulltest/provider/RecordProvider";
import { Skill } from "@/app/lib/interfaces";

export default function RecordQuizList() {
	const {
		record,
		currentQuizIndex,
		currentSkill,
		onChangeCurrentQuizIndex,
		onChangeSkill,
	} = useRecord();

	if (!record) {
		return null;
	}

	const Tabref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(Tabref);

	return (
		<div
			className="flex flex-row w-full h-40 gap-2 -mb-32 overflow-x-scroll overflow-y-visible cursor-pointer scrollbar-hide"
			{...events}
			ref={Tabref}>
			{record.reading.map((_, index) => {
				return (
					<div
						onClick={() => {
							onChangeCurrentQuizIndex(index);
							onChangeSkill(Skill.READING);
						}}
						key={index}
						className={`relative flex flex-row items-center justify-center whitespace-nowrap w-fit h-fit px-1 py-1 text-center rounded-md cursor-pointer duration-200 ${currentQuizIndex == index && currentSkill == Skill.READING ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
						Reading Part {index + 1}
					</div>
				);
			})}
			{record.listening.map((_, index) => {
				return (
					<div
						onClick={() => {
							onChangeCurrentQuizIndex(index);
							onChangeSkill(Skill.LISTENING);
						}}
						key={index}
						className={`relative flex flex-row items-center justify-center whitespace-nowrap w-fit h-fit px-1 py-1 text-center rounded-md cursor-pointer duration-200 ${currentQuizIndex == index && currentSkill == Skill.LISTENING ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
						Listening Part {index + 1}
					</div>
				);
			})}
		</div>
	);
}
