import TextArea from "@/components/TextArea/TextArea";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Skill } from "@/app/lib/interfaces";
import { useTest } from "../provider/TestProvider";
import {
	FGroup,
	FQuestion,
	getQuestionGroupIndex,
	getQuestionIndex,
	Quiz,
} from "@/app/interface/test/test";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { RemoveStyleRegex, RemoveInputRegex } from "@/regex/IeltsRegex";
import { AiOutlineClear } from "react-icons/ai";
import { FiFilePlus } from "react-icons/fi";
import { GrScan } from "react-icons/gr";
import { useUtility } from "@/app/provider/UtilityProvider";
import { MdControlPointDuplicate } from "react-icons/md";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface FillingQuizGroupProps {
	quizIndex: number;
	quizGroupIndex: number;
	skill: Skill;
}

export default function FillingQuizGroup({
	quizIndex,
	quizGroupIndex,
	skill,
}: FillingQuizGroupProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const quizGroupSettingRef = useClickOutsideDetails();

	const { onSetConfirmation, setSuccess, setError } = useUtility();
	const {
		test,
		onChangeQuiz,
		isLoading,
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
	let currentGroup = currentQuiz.groups[quizGroupIndex] as FGroup;

	const onChangeQuestion = (question: string) => {
		currentQuiz.groups[quizGroupIndex].question = question;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const addFillingQuiz = () => {
		const newFillingQuiz: FQuestion = {
			description: "",
			answer: [],
			explaination: "",
		};
		currentGroup.quizzes.push(newFillingQuiz);
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const removeQuizGroup = () => {
		const remove = () => {
			currentQuiz.groups.splice(quizGroupIndex, 1);
			onChangeQuiz(currentQuiz, skill, quizIndex);
			setSuccess("Question group removed successfully");
		};
		onSetConfirmation(
			"Do you want to remove this question group?",
			remove,
			"delete"
		);
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
				className="flex flex-col w-full h-fit shadow-md">
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
							Filling
						</span>
					</div>

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
										onClick={() => onOpenCreatePractice()}
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
								<BsTrash className="size-4 text-red-500" />
							</button>
						</div>
					</details>
				</div>

				<CK5Editor
					content={currentGroup.question}
					onChangeContent={onChangeQuestion}
				/>
			</div>
			<div className="flex flex-col w-full gap-8 h-fit">
				{currentGroup.quizzes.map((_, index) => {
					return (
						<FillingQuestion
							key={index}
							quizIndex={quizIndex}
							quizGroupIndex={quizGroupIndex}
							fillingIndex={index}
							skill={skill}
						/>
					);
				})}
			</div>

			<button
				onClick={() => addFillingQuiz()}
				className="p-1 text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 w-fit h-fit">
				Add Question
			</button>
		</div>
	);
}

interface FillingQuestionProps {
	quizIndex: number;
	quizGroupIndex: number;
	fillingIndex: number;
	skill: Skill;
}

function FillingQuestion({
	quizIndex,
	quizGroupIndex,
	fillingIndex,
	skill,
}: FillingQuestionProps) {
	const { onSetConfirmation, setSuccess } = useUtility();
	const { test, onChangeQuiz } = useTest();

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

		onSetConfirmation(
			"Do you want to remove this question?",
			remove,
			"delete"
		);
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
		<div className="flex flex-col w-full gap-1  bg-white border rounded-md shadow-md h-fit dark:bg-pot-black border-foreground-blue dark:border-foreground-red">
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

					<details ref={questionSettingRef} className="relative">
						<summary className="list-none">
							<BsThreeDots className="p-1 text-white rounded-full size-7 bg-foreground-blue dark:bg-foreground-red" />
						</summary>
						<div className="top-8 -left-28 absolute w-40 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
							<button
								onClick={() => duplicateQuestion()}
								className="flex items-center justify-between w-full p-2 text-black dark:text-gray-200 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black text-xs">
								Duplicate question
								<MdControlPointDuplicate className="size-4 text-black dark:text-gray-200" />
							</button>
							<button
								onClick={() => removeQuestion()}
								className="flex items-center justify-between w-full p-2 text-red-500 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black text-xs">
								Delete question
								<BsTrash className="size-4 text-red-500" />
							</button>
						</div>
					</details>
				</div>
				<TextArea
					value={currentQuestion.description}
					onChangeInput={onChangeDescription}
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
						className="flex-1 text-sm text-gray-400 dark:bg-pot-black focus:border-foreground-blue focus:ring-foreground-blue dark:focus:border-foreground-red dark:focus:ring-foreground-red"
					/>
				</div>
			</div>
		</div>
	);
}
