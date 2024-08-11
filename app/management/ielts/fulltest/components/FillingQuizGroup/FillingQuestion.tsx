"use client";
import { Skill } from "@/app/lib/interfaces";
import { useUtility } from "@/app/provider/UtilityProvider";
import { useTest } from "../../provider/TestProvider";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import {
	FGroup,
	FQuestion,
	getQuestionIndex,
	Quiz,
} from "@/app/interface/test/test";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { MdControlPointDuplicate } from "react-icons/md";
import TextArea from "@/components/TextArea/TextArea";

interface FillingQuestionProps {
	quizIndex: number;
	quizGroupIndex: number;
	fillingIndex: number;
	skill: Skill;
}

export default function FillingQuestion({
	quizIndex,
	quizGroupIndex,
	fillingIndex,
	skill,
}: FillingQuestionProps) {
	const { onSetConfirmation, setSuccess } = useUtility();
	const { test, hasPrivilege, onChangeQuiz } = useTest();

	const questionSettingRef = useClickOutsideDetails();

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

	const currentGroup = currentQuiz.groups[quizGroupIndex] as FGroup;
	const currentQuestion = currentGroup.quizzes[fillingIndex] as FQuestion;

	const onChangeDescription = (description: string) => {
		currentQuestion.description = description;
		currentGroup.quizzes[fillingIndex] = currentQuestion;
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const onChangeAnswer = (answer: string) => {
		currentQuestion.answer = answer.split("/");
		currentGroup.quizzes[fillingIndex] = currentQuestion;
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const onChangeExplaination = (explaination: string) => {
		currentQuestion.explaination = explaination;
		currentGroup.quizzes[fillingIndex] = currentQuestion;
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const removeQuestion = () => {
		const remove = () => {
			currentGroup.quizzes.splice(fillingIndex, 1);
			currentQuiz.groups[quizGroupIndex] = currentGroup;
			onChangeQuiz(currentQuiz, skill, quizIndex);
			setSuccess("Question removed successfully");
		};
		onSetConfirmation({
			message: "Do you want to remove this question?",
			onConfirm: remove,
			type: "delete",
		});
	};

	const duplicateQuestion = () => {
		const newQuestion: FQuestion = {
			description: currentQuestion.description,
			answer: currentQuestion.answer,
			explaination: currentQuestion.explaination,
		};
		currentGroup.quizzes.push(newQuestion);
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	return (
		<div className="flex flex-col w-full gap-1 bg-white border rounded-md shadow-md h-fit dark:bg-pot-black border-foreground-blue dark:border-foreground-red">
			<div className="flex flex-col w-full p-2 text-black rounded-t-md h-fit dark:text-gray-200">
				<div className="flex flex-row items-center justify-between w-full h-fit">
					<span className="text-xl font-semibold ">
						Filling question{" "}
						{getQuestionIndex(
							test,
							quizIndex,
							quizGroupIndex,
							fillingIndex,
							skill
						)}
					</span>

					{hasPrivilege && (
						<details ref={questionSettingRef} className="relative">
							<summary className="list-none">
								<BsThreeDots className="p-1 text-white rounded-full size-7 bg-foreground-blue dark:bg-foreground-red" />
							</summary>
							<div className="top-8 -left-28 absolute w-40 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
								<button
									onClick={() => duplicateQuestion()}
									className="flex items-center justify-between w-full p-2 text-xs text-black rounded-md dark:text-gray-200 h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
									Duplicate question
									<MdControlPointDuplicate className="text-black size-4 dark:text-gray-200" />
								</button>
								<button
									onClick={() => removeQuestion()}
									className="flex items-center justify-between w-full p-2 text-xs text-red-500 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
									Delete question
									<BsTrash className="text-red-500 size-4" />
								</button>
							</div>
						</details>
					)}
				</div>
				<TextArea
					value={currentQuestion.description}
					onChangeInput={onChangeDescription}
					disabled={!hasPrivilege}
					placeholder="Type in your question here or leave it blank"
					className="text-base bg-white border-transparent dark:bg-pot-black focus:border-transparent focus:ring-transparent dark:placeholder:text-gray-300"
				/>
			</div>
			<div className="flex flex-col w-full gap-4 p-4 pt-0 h-fit ">
				<hr className="w-full border-t border-gray-200 dark:border-gray-400" />
				<div className="flex flex-row items-center w-full gap-2 h-fit">
					<span className="text-base text-gray-400">Answer:</span>
					<TextArea
						value={currentQuestion.answer.join("/")}
						onChangeInput={onChangeAnswer}
						disabled={!hasPrivilege}
						className="flex-1 text-sm text-gray-400 dark:bg-pot-black focus:border-foreground-blue focus:ring-foreground-blue dark:focus:border-foreground-red dark:focus:ring-foreground-red"
					/>
				</div>
				<div className="flex flex-row items-center w-full gap-2 h-fit">
					<span className="text-base text-gray-400">
						Explanation:
					</span>
					<TextArea
						value={currentQuestion.explaination}
						onChangeInput={onChangeExplaination}
						disabled={!hasPrivilege}
						className="flex-1 text-sm text-gray-400 dark:bg-pot-black focus:border-foreground-blue focus:ring-foreground-blue dark:focus:border-foreground-red dark:focus:ring-foreground-red"
					/>
				</div>
			</div>
		</div>
	);
}
