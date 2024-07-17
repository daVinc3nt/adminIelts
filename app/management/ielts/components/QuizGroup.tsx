import { FillingGroup, MultipleChoiceGroup } from "@/app/interface/quiz";
import { useQuizData } from "../provider/QuizDataProvider";
import { QuizType } from "@/app/interface/interfaces";
import React, { Fragment } from "react";
import FillingQuizGroup from "./FillingQuizGroup";
import MultipleChoiceQuizGroup from "./MultipleChoiceQuizGroup";

interface QuizGroupProps {
	quizIndex: number;
}

export default function QuizGroup({ quizIndex }: QuizGroupProps) {
	const { quizList, setQuizList } = useQuizData();

	const addFillingGroup = () => {
		const newGroup: FillingGroup = {
			type: QuizType.FILLING,
			question: "",
			startFrom: 0,
			quizzes: [],
			quizId: quizList[quizIndex].id,
		};
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups.push(newGroup);
		setQuizList(newQuizList);
	};

	const addMultipleChoiceGroup = () => {
		const newGroup: MultipleChoiceGroup = {
			type: QuizType.MULTIPLE_CHOICE,
			question: "",
			startFrom: 0,
			quizzes: [],
			quizId: quizList[quizIndex].id,
		};
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups.push(newGroup);
		setQuizList(newQuizList);
	};

	return (
		<div className="flex flex-col items-center w-1/2 gap-8 h-fit">
			{quizList[quizIndex].groups.map((group, index) => {
				return (
					<Fragment key={index}>
						<Group
							type={group.type}
							quizIndex={quizIndex}
							quizGroupIndex={index}
						/>
						<hr className="w-11/12 border border-gray-200 dark:border-gray-600" />
					</Fragment>
				);
			})}

			<div className="flex flex-row w-full gap-2">
				<button
					onClick={() => addFillingGroup()}
					className="p-1 text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 w-fit h-fit">
					Add Filling Group
				</button>
				<button
					onClick={() => addMultipleChoiceGroup()}
					className="p-1 text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 w-fit h-fit">
					Add Multiple Choice Group
				</button>
			</div>
		</div>
	);
}

interface GroupInterface {
	type: QuizType;
	quizIndex: number;
	quizGroupIndex: number;
}

function Group({ type, quizIndex, quizGroupIndex }: GroupInterface) {
	switch (type) {
		case QuizType.FILLING:
			return (
				<FillingQuizGroup
					quizGroupIndex={quizGroupIndex}
					quizIndex={quizIndex}
				/>
			);
		case QuizType.MULTIPLE_CHOICE:
			return (
				<MultipleChoiceQuizGroup
					quizGroupIndex={quizGroupIndex}
					quizIndex={quizIndex}
				/>
			);
		default:
			return null;
	}
}
