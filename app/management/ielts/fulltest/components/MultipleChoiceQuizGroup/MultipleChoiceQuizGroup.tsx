"use client";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Skill } from "@/app/lib/interfaces";
import { useTest } from "../../provider/TestProvider";
import {
	getQuestionGroupIndex,
	MCGroup,
	MCQuestion,
	Quiz,
} from "@/app/interface/test/test";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { RemoveInputRegex, RemoveStyleRegex } from "@/regex/IeltsRegex";
import { AiOutlineClear } from "react-icons/ai";
import { FiFilePlus } from "react-icons/fi";
import { useUtility } from "@/app/provider/UtilityProvider";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

interface MultipleChoiceQuizGroupProps {
	quizIndex: number;
	quizGroupIndex: number;
	skill: Skill;
}

export default function MultipleChoiceQuizGroup({
	quizIndex,
	quizGroupIndex,
	skill,
}: MultipleChoiceQuizGroupProps) {
	const { onSetConfirmation, setSuccess, setError } = useUtility();
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const quizGroupSettingRef = useClickOutsideDetails();

	const {
		test,
		isLoading,
		hasPrivilege,
		onChangeQuiz,
		onChangeIsOpenCreateQuizPractice,
		onChangePracticeType,
		onSelectPractice,
	} = useTest();

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
	let currentGroup = currentQuiz.groups[quizGroupIndex] as MCGroup;

	const onChangeQuestion = (question: string) => {
		currentQuiz.groups[quizGroupIndex].question = question;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const addMultipleChoiceQuiz = () => {
		const newQuestion: MCQuestion = {
			description: "",
			options: [],
			answer: [],
			numOfAnswers: 0,
			explaination: "",
		};
		currentGroup.quizzes.push(newQuestion);
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const removeQuizGroup = () => {
		const remove = () => {
			currentQuiz.groups.splice(quizGroupIndex, 1);
			onChangeQuiz(currentQuiz, skill, quizIndex);
			setSuccess("Question group removed successfully");
		};
		onSetConfirmation({
			message: "Do you want to remove this question group?",
			onConfirm: remove,
			type: "delete",
		});
	};

	const removeStyle = () => {
		currentGroup.question = currentGroup.question.replace(
			RemoveStyleRegex,
			""
		);
		currentGroup.question = currentGroup.question.replace(
			RemoveInputRegex,
			"......."
		);
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const onOpenCreatePractice = () => {
		const newQuiz = { ...currentQuiz };
		newQuiz.groups = [currentGroup];
		if (!currentGroup.id || !currentQuiz.id) {
			setError("You must save this test before creating a practice");
			return;
		}
		onSelectPractice(newQuiz);
		onChangeIsOpenCreateQuizPractice(true);
		onChangePracticeType("group");
	};

	return (
		<div className="flex flex-col items-center w-full gap-6 h-fit">
			<div
				style={{ display: isLoading ? "none" : "flex" }}
				className="flex flex-col w-full shadow-md h-fit">
				<div className="flex flex-row items-start justify-between w-full p-2 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
					<div className="flex flex-col w-full h-fit">
						<span className="text-2xl font-bold text-white ">
							Question Group{" "}
							{getQuestionGroupIndex(
								test,
								quizIndex,
								quizGroupIndex,
								skill
							)}
						</span>
						<span className="text-base text-gray-400 ">
							Multiple Choice
						</span>
					</div>

					{hasPrivilege && (
						<details ref={quizGroupSettingRef} className="relative">
							<summary className="list-none">
								<BsThreeDots className="p-1 text-white size-8" />
							</summary>
							<div className="top-8 -left-28 absolute w-40 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center text-xs">
								<button
									onClick={() => removeStyle()}
									className="flex items-center justify-between w-full p-2 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
									Clear style
									<AiOutlineClear className="size-4" />
								</button>
								{!test.isPractice ? (
									currentGroup.linkToTest ? (
										<Link
											href={`/management/ielts/fulltest/${currentGroup.linkToTest}`}
											target="_blank"
											className="flex items-center justify-between w-full p-2 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
											Go to practice
											<FaArrowRight className="size-4" />
										</Link>
									) : (
										<button
											onClick={() =>
												onOpenCreatePractice()
											}
											className="flex items-center justify-between w-full p-2 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
											Create practice
											<FiFilePlus className="size-4" />
										</button>
									)
								) : null}
								<button
									onClick={() => removeQuizGroup()}
									className="flex items-center justify-between w-full p-2 text-red-500 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
									Delete group
									<BsTrash className="text-red-500 size-4" />
								</button>
							</div>
						</details>
					)}
				</div>

				<CK5Editor
					content={currentGroup.question}
					onChangeContent={onChangeQuestion}
					disable={!hasPrivilege}
				/>
			</div>
			<div className="flex flex-col w-full gap-8 h-fit">
				{currentGroup.quizzes.map((_, index) => {
					return (
						<MultipleChoiceQuestion
							key={index}
							quizIndex={quizIndex}
							quizGroupIndex={quizGroupIndex}
							multipleChoiceIndex={index}
							skill={skill}
						/>
					);
				})}
			</div>
			{hasPrivilege && (
				<button
					onClick={() => addMultipleChoiceQuiz()}
					className="p-1 text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 w-fit h-fit">
					Add Question
				</button>
			)}
		</div>
	);
}
