"use client";

import { Fill_Question } from "../../ReadingInterface";

interface Props {
	question: Fill_Question;
}

export default function FQuestion({ question }: Props) {
	const handleChangeInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		e.preventDefault();
		// Handle input change
	};

	return (
		<div className="w-full h-fit grid grid-cols-12 gap-2">
			<div className="font-bold flex justify-center items-center max-md:col-span-2">
				<div className="min-w-8 min-h-8 bg-red-400 rounded-full flex justify-center items-center text-white hover:cursor-pointer">
					{question.questionNumber}
				</div>
			</div>
			{question.question && (
				<div
					className="w-full col-span-11 flex justify-start items-center"
					dangerouslySetInnerHTML={{ __html: question.question }}
				/>
			)}
			<div
				className={`w-full ${question.question ? "col-span-12" : "col-span-11"}`}>
				<input
					type="text"
					onChange={(e) =>
						handleChangeInput(e, question.questionNumber)
					}
					className="w-full h-8 border-2 border-red-200 p-2 rounded-lg outline-none focus:border-transparent focus:outline focus:ring focus:ring-red-400 bg-primary focus:bg-white"
				/>
			</div>
		</div>
	);
}
