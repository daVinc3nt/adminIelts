"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MCSectionInterface } from "../../ReadingTestInterface";
import CheckBox from "./CheckBox";

interface MCSectionProps {
	section: MCSectionInterface;
	answer: string[];
	setAnswer: Dispatch<SetStateAction<string[]>>;
}

export default function MCSection({
	section,
	answer,
	setAnswer,
}: MCSectionProps) {
	const [openIndex, setOpenIndex] = useState<number>(-1);

	const openQuestion = (index: number) => {
		if (openIndex == index) {
			setOpenIndex(-1);
		} else {
			setOpenIndex(index);
		}
	};

	const chooseAnswer = (index: number, newAnswer: string) => {
		let newAns = [...answer];
		if (newAns[index - 1] == newAnswer) {
			newAns[index - 1] = "";
		} else {
			newAns[index - 1] = newAnswer;
		}
		setAnswer(newAns);
	};

	return (
		<div className="w-full h-fit flex flex-col gap-2">
			<div className="text-xl font-bold">{`Question ${section.startQuestion} - ${section.endQuestion}`}</div>
			<div
				className="text-base w-full"
				dangerouslySetInnerHTML={{ __html: section.decription }}></div>

			{section.questionList.map((question, index) => {
				const questionIndex = question.questionNumber;
				const currentAnswer = answer[questionIndex - 1];

				return (
					<div
						key={question.question + index}
						className={`w-full ${openIndex == index ? "h-[310px]" : "h-[58px]"} duration-300 bg-primary border overflow-hidden flex flex-col gap-2 p-2 rounded-2xl`}>
						<div
							className="flex flex-row gap-2 items-start text-sm min-h-10 h-[58px] cursor-pointer"
							onClick={() => openQuestion(index)}>
							<div className="h-full flex items-center">
								<div className="min-w-8 min-h-8 flex justify-center items-center rounded-full bg-red-400 text-white font-bold">
									{questionIndex}
								</div>
							</div>
							<div className="max-lg:text-xs">
								{question.question}
							</div>
						</div>

						<div
							className={`w-full h-full flex flex-col items-start text-sm`}>
							<div
								className="w-full h-[61px] flex flex-row items-center gap-2 border border-transparent rounded-2xl hover:bg-white hover:border-gray-200 cursor-pointer p-1"
								onClick={() =>
									chooseAnswer(questionIndex, "A")
								}>
								<CheckBox checked={currentAnswer == "A"} />
								<div>{question.choiceA}</div>
							</div>
							<div
								onClick={() => chooseAnswer(questionIndex, "B")}
								className="w-full h-[61px] flex flex-row items-center gap-2 border border-transparent rounded-2xl hover:bg-white hover:border-gray-200 cursor-pointer p-1">
								<CheckBox checked={currentAnswer == "B"} />

								<div>{question.choiceB}</div>
							</div>
							<div
								onClick={() => chooseAnswer(questionIndex, "C")}
								className="w-full h-[61px] flex flex-row items-center gap-2 border border-transparent rounded-2xl	 hover:bg-white hover:border-gray-200 cursor-pointer p-1">
								<CheckBox checked={currentAnswer == "C"} />
								<div>{question.choiceC}</div>
							</div>
							<div
								onClick={() => chooseAnswer(questionIndex, "D")}
								className="w-full h-[61px] flex flex-row items-center gap-2 border border-transparent rounded-2xl	 hover:bg-white hover:border-gray-200 cursor-pointer p-1">
								<CheckBox checked={currentAnswer == "D"} />
								<div>{question.choiceD}</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
