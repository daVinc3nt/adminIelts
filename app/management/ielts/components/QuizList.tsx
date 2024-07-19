import { BsPlus } from "react-icons/bs";
import { useQuizData } from "../provider/QuizDataProvider";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Quiz } from "@/app/interface/quiz";
import { Category, Skill } from "@/app/interface/interfaces";

interface QuizListProps {
	category: Category;
	skill: Skill;
}

export default function QuizList({ category, skill }: QuizListProps) {
	const Tabref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(Tabref);

	const { quizList, setQuizList, currentQuizIndex, setCurrentQuizIndex } =
		useQuizData();

	const addQuiz = () => {
		const newReadingQuiz: Quiz = {
			content: "",
			category: category,
			tag: "",
			skill: skill,
			groups: [],
		};
		setQuizList([...quizList, newReadingQuiz]);
	};

	const onSelectQuiz = (index: number) => {
		setCurrentQuizIndex(index);
	};

	return (
		<div className="flex flex-row w-full gap-2 pt-2">
			<button
				title="Add Part"
				className="flex items-center justify-center duration-200 rounded-full dark:bg-foreground-red size-8 bg-foreground-blue"
				onClick={() => addQuiz()}>
				<BsPlus size={35} color="white" strokeWidth={0.5} />
			</button>

			<div
				className="h-10 overflow-x-scroll w-fit whitespace-nowrap scrollbar-hide"
				{...events}
				ref={Tabref}>
				{quizList.map((_, index) => {
					return (
						<div
							onClick={() => onSelectQuiz(index)}
							key={index}
							className={`inline-block w-fit h-8 px-2 py-1 mr-2 text-center rounded-md shadow-md cursor-pointer duration-200 ${currentQuizIndex == index ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
							{partLabel(skill, index)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

const partLabel = (skill: Skill, index: number) => {
	switch (skill) {
		case Skill.READING:
			return `Reading Part ${index + 1}`;
		case Skill.LISTENING:
			return `Listening Part ${index + 1}`;
		case Skill.WRITING:
			return `Writing Part ${index + 1}`;
		case Skill.SPEAKING:
			return `Speaking Part ${index + 1}`;
	}
};
