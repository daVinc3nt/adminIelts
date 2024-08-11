"use client";
import { QuizType, Skill } from "@/app/lib/interfaces";
import React, { Fragment } from "react";
import FillingQuizGroup from "./FillingQuizGroup/FillingQuizGroup";
import MultipleChoiceQuizGroup from "./MultipleChoiceQuizGroup/MultipleChoiceQuizGroup";
import { useTest } from "../provider/TestProvider";
import { FGroup, MCGroup, Quiz } from "@/app/interface/test/test";

interface QuizGroupProps {
	quizIndex: number;
	skill: Skill;
}

export default function QuizGroup({ quizIndex, skill }: QuizGroupProps) {
	const { test, onChangeQuiz, hasPrivilege } = useTest();

	let currentQuiz: Quiz;
	switch (skill) {
		case Skill.LISTENING:
			currentQuiz = test.listening[quizIndex];
			break;
		case Skill.WRITING:
			currentQuiz = test.writing[quizIndex];
			break;
		case Skill.SPEAKING:
			currentQuiz = test.speaking[quizIndex];
			break;
		default:
			currentQuiz = test.reading[quizIndex];
	}

	const addFillingGroup = () => {
		const newFGroup: FGroup = {
			question: "",
			type: QuizType.FILLING,
			startFrom: 0,
			quizzes: [],
		};
		currentQuiz.groups.push(newFGroup);
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const addMultipleChoiceGroup = () => {
		const newMCGroup: MCGroup = {
			question: "",
			type: QuizType.MULTIPLE_CHOICE,
			startFrom: 0,
			quizzes: [],
		};
		currentQuiz.groups.push(newMCGroup);
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	let isForQuiz: boolean;
	if (currentQuiz.tags.length > 0) {
		isForQuiz = currentQuiz.tags[0].forQuiz;
	} else {
		isForQuiz = true;
	}

	return (
		<div className="flex flex-col items-center w-full gap-8 h-fit">
			{currentQuiz.groups.map((group, index) => {
				return (
					<Fragment key={index}>
						<Group
							type={group.type}
							quizIndex={quizIndex}
							quizGroupIndex={index}
							skill={skill}
						/>
						<hr className="w-11/12 border border-gray-200 dark:border-gray-600" />
					</Fragment>
				);
			})}

			<div className="flex flex-row w-full gap-2 items-center justify-center">
				{isForQuiz && hasPrivilege ? (
					<Fragment>
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
					</Fragment>
				) : null}
			</div>
		</div>
	);
}

interface GroupInterface {
	type: QuizType;
	quizIndex: number;
	quizGroupIndex: number;
	skill: Skill;
}

function Group({ type, quizIndex, quizGroupIndex, skill }: GroupInterface) {
	switch (type) {
		case QuizType.FILLING:
			return (
				<FillingQuizGroup
					quizGroupIndex={quizGroupIndex}
					quizIndex={quizIndex}
					skill={skill}
				/>
			);
		case QuizType.MULTIPLE_CHOICE:
			return (
				<MultipleChoiceQuizGroup
					quizGroupIndex={quizGroupIndex}
					quizIndex={quizIndex}
					skill={skill}
				/>
			);
		default:
			return null;
	}
}
