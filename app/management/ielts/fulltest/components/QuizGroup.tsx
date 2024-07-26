import { FillingGroup, MultipleChoiceGroup } from "@/app/interface/quiz";
import { useTestData } from "../../provider/TestDataProvider";
import { QuizType } from "@/app/lib/interfaces";
import React, { Fragment } from "react";
import FillingQuizGroup from "./FillingQuizGroup";
import MultipleChoiceQuizGroup from "./MultipleChoiceQuizGroup";

interface QuizGroupProps {
	quizIndex: number;
	isPreview?: boolean;
}

export default function QuizGroup({ quizIndex, isPreview }: QuizGroupProps) {
	const { quizList, setQuizList } = useTestData();

	const addFillingGroup = () => {
		const newGroup: FillingGroup = {
			type: QuizType.FILLING,
			question: "",
			startFrom: 0,
			quizzes: [],
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
		};
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups.push(newGroup);
		setQuizList(newQuizList);
	};

	return (
		<div className="flex flex-col items-center w-full gap-8 h-fit">
			{quizList[quizIndex].groups.map((group, index) => {
				return (
					<Fragment key={index}>
						<Group
							type={group.type}
							quizIndex={quizIndex}
							quizGroupIndex={index}
							isPreview={isPreview}
						/>
						<hr className="w-11/12 border border-gray-200 dark:border-gray-600" />
					</Fragment>
				);
			})}

			{!isPreview && (
				<div className="flex flex-row w-full gap-2 items-center justify-center">
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
			)}
		</div>
	);
}

interface GroupInterface {
	type: QuizType;
	quizIndex: number;
	quizGroupIndex: number;
	isPreview?: boolean;
}

function Group({ type, quizIndex, quizGroupIndex, isPreview }: GroupInterface) {
	switch (type) {
		case QuizType.FILLING:
			return (
				<FillingQuizGroup
					quizGroupIndex={quizGroupIndex}
					quizIndex={quizIndex}
					isPreview={isPreview}
				/>
			);
		case QuizType.MULTIPLE_CHOICE:
			return (
				<MultipleChoiceQuizGroup
					quizGroupIndex={quizGroupIndex}
					quizIndex={quizIndex}
					isPreview={isPreview}
				/>
			);
		default:
			return null;
	}
}
