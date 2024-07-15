import { BsPlus } from "react-icons/bs";
import { useQuizData } from "../contexts/QuizDataProvider";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function QuizTab() {
	const Tabref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(Tabref);

	const addQuiz = () => {};

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
				{[].map((_, index) => {
					return (
						<div
							key={index}
							className="inline-block w-20 h-8 p-1 mr-2 text-center rounded-md shadow-md cursor-pointer">
							Quiz {index + 1}
						</div>
					);
				})}
			</div>
		</div>
	);
}
