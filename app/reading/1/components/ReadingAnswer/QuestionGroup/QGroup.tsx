"use client";

import { Dispatch, SetStateAction } from "react";
import {
	Multiple_Choice_Question,
	QuestionType,
	QuestionGroup,
	True_False_Question,
	Fill_Question,
} from "../../ReadingInterface";
import FQuestion from "./FQuestion";
import MCQuestion from "./MCQuestion";
import TFQuestion from "./TFQuestion";

interface Props {
	questionGroup: QuestionGroup;
	answer: string[];
	setAnswer: Dispatch<SetStateAction<string[]>>;
	open: boolean[];
	setOpen: Dispatch<SetStateAction<boolean[]>>;
}

export default function QGroup({
	questionGroup,
	answer,
	setAnswer,
	open,
	setOpen,
}: Props) {
	return (
		<div className="w-full h-fit flex flex-col gap-4">
			<div className="text-xl font-bold">
				{`Question ${questionGroup.startQuestion} - ${questionGroup.endQuestion}`}
			</div>
			<div
				className="text-base w-full"
				dangerouslySetInnerHTML={{ __html: questionGroup.description }}
			/>
			<div
				className="text-base w-full whitespace-pre-wrap leading-6"
				dangerouslySetInnerHTML={{ __html: questionGroup.paragraph }}
			/>
			{questionGroup.questionList.map((question) => {
				switch (question.questionType) {
					case QuestionType.True_Fasle:
						return (
							<TFQuestion
								key={question.questionNumber}
								question={question as True_False_Question}
								answer={answer}
								setAnswer={setAnswer}
								open={open}
								setOpen={setOpen}
							/>
						);
					case QuestionType.Multiple_Choice:
						return (
							<MCQuestion
								key={question.questionNumber}
								question={question as Multiple_Choice_Question}
								answer={answer}
								setAnswer={setAnswer}
								open={open}
								setOpen={setOpen}
							/>
						);
					case QuestionType.Fill:
						return (
							<FQuestion
								key={question.questionNumber}
								question={question as Fill_Question}
								answer={answer}
								setAnswer={setAnswer}
							/>
						);
					case QuestionType.Match_Heading:
				}

				return null;
			})}
		</div>
	);
}
