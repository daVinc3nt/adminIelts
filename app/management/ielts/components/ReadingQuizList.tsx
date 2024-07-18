import { BsPlus } from "react-icons/bs";
import { useQuizData } from "../provider/QuizDataProvider";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Quiz } from "@/app/interface/quiz";
import { Category, Skill } from "@/app/interface/interfaces";

interface QuizListProps {}

export default function ReadingQuizList({}: QuizListProps) {
	const Tabref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(Tabref);

	const { quizList, setQuizList, currentQuizIndex, setCurrentQuizIndex } =
		useQuizData();

	const addReadingQuiz = () => {
		const newReadingQuiz: Quiz = {
			content: "",
			category: Category.IELTS,
			tag: "",
			skill: Skill.READING,
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
				onClick={() => addReadingQuiz()}>
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
							Reading Part {index + 1}
						</div>
					);
				})}
			</div>
		</div>
	);
}
