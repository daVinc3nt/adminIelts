import { BsPlus } from "react-icons/bs";
import { useQuizData } from "../contexts/QuizProvider";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function QuizTab() {
	const Tabref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(Tabref);

	const QuizsContext = useQuizData();

	const quizs = QuizsContext.quizs;
	const setQuizs = QuizsContext.setQuizs;

	const currentQuiz = QuizsContext.currentQuiz;
	const setCurrentQuiz = QuizsContext.setCurrentQuiz;

	const setLoading = QuizsContext.setIsLoading;

	const addQuiz = () => {
		setLoading(true);
		const newQuiz = { content: "", filling: [], multipleChoice: [] };
		setQuizs((prevQuizs) => {
			const updatedQuizs = [...prevQuizs, newQuiz];

			return updatedQuizs;
		});
		//wait 0.05 sec before scroll
		setCurrentQuiz(quizs.length);
		setTimeout(() => {
			Tabref.current.scrollLeft = Tabref.current.scrollWidth;
			setLoading(false);
		}, 50);
	};

	return (
		<div className="flex flex-row w-full gap-2 pt-2">
			<button
				title="Add Passage"
				className="flex items-center justify-center rounded-full bg-foreground-red size-8"
				onClick={() => addQuiz()}>
				<BsPlus size={35} color="white" strokeWidth={0.5} />
			</button>
			<div
				className="h-10 overflow-x-scroll w-fit whitespace-nowrap scrollbar-hide"
				{...events}
				ref={Tabref}>
				{quizs.map((_, index) => {
					return (
						<div
							key={index}
							style={{
								backgroundColor:
									currentQuiz == index ? "#CB0000" : "white",
								color: currentQuiz == index ? "white" : "black",
							}}
							className="inline-block w-20 h-8 p-1 mr-2 text-center rounded-md shadow-md cursor-pointer"
							onClick={() => setCurrentQuiz(index)}>
							Quiz {index + 1}
						</div>
					);
				})}
			</div>
		</div>
	);
}
