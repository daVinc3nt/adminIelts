import { BsPlus } from "react-icons/bs";
import { useQuizData } from "../../provider/QuizDataProvider";
import { useEffect, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { FillingGroup, Quiz, quizDataRecieve2Quiz } from "@/app/interface/quiz";
import { Category, QuizType, Skill } from "@/app/interface/interfaces";
import { QuizOperation } from "@/app/interface/main";

interface QuizListProps {
	oneQuiz?: boolean;
}

export default function QuizList({ oneQuiz }: QuizListProps) {
	const Tabref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(Tabref);

	const addQuizButtonRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				addQuizButtonRef.current &&
				!addQuizButtonRef.current.contains(event.target as Node)
			) {
				addQuizButtonRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const { quizList, setQuizList, currentQuizIndex, setCurrentQuizIndex } =
		useQuizData();

	const addQuiz = (category: Category, skill: Skill) => {
		const newQuiz: Quiz = {
			content: "",
			category: category,
			tag: "",
			skill: skill,
			groups: [],
		};

		if (skill == Skill.WRITING) {
			const newGroup: FillingGroup = {
				type: QuizType.FILLING,
				question: "",
				startFrom: 0,
				quizzes: [
					{
						description: "",
						answer: "",
						explaination: "",
					},
				],
			};
			newQuiz.groups.push(newGroup);
		}
		if (skill == Skill.SPEAKING) {
			const newGroup: FillingGroup = {
				type: QuizType.FILLING,
				question: "",
				startFrom: 0,
				quizzes: [],
			};
			newQuiz.groups.push(newGroup);
		}

		const quizOperation = new QuizOperation();

		quizOperation.create(newQuiz as any, testToken).then((response) => {
			console.log(response);
			let newQuizList = [
				...quizList,
				quizDataRecieve2Quiz(response.data),
			];
			setQuizList(newQuizList);
		});
	};

	const onSelectQuiz = (index: number) => {
		setCurrentQuizIndex(index);
	};
	return (
		<div className="flex flex-row w-full gap-2 pt-2">
			{!oneQuiz && (
				<details ref={addQuizButtonRef} className="relative">
					<summary className="list-none">
						<div
							title="Add Part"
							className="flex items-center justify-center duration-200 rounded-full dark:bg-foreground-red size-8 bg-foreground-blue">
							<BsPlus size={35} color="white" strokeWidth={0.5} />
						</div>
					</summary>
					<div className="top-8 -left-10 absolute w-44 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
						<button
							onClick={() =>
								addQuiz(Category.IELTS, Skill.READING)
							}
							className="flex items-start justify-start w-full p-2 text-sm text-black dark:text-gray-200 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
							Add Reading Part
						</button>
						<button
							onClick={() =>
								addQuiz(Category.IELTS, Skill.LISTENING)
							}
							className="flex items-start justify-start w-full p-2 text-sm text-black dark:text-gray-200 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
							Add Listening Part
						</button>
						<button
							onClick={() =>
								addQuiz(Category.IELTS, Skill.WRITING)
							}
							className="flex items-start justify-start w-full p-2 text-sm text-black dark:text-gray-200 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
							Add Writing Part
						</button>
						<button
							onClick={() =>
								addQuiz(Category.IELTS, Skill.SPEAKING)
							}
							className="flex items-start justify-start w-full p-2 text-sm text-black dark:text-gray-200 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
							Add Speaking Part
						</button>
					</div>
				</details>
			)}

			<div
				className="h-10 overflow-x-scroll w-fit whitespace-nowrap scrollbar-hide"
				{...events}
				ref={Tabref}>
				{quizList.map((quiz, index) => {
					return (
						<div
							onClick={() => onSelectQuiz(index)}
							key={index}
							className={`inline-block w-fit h-8 px-2 py-1 mr-2 text-center rounded-md shadow-md cursor-pointer duration-200 ${currentQuizIndex == index ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
							{partLabel(quiz.skill, index)}
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

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
