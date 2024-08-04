"use client";
import TextArea from "@/components/TextArea/TextArea";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdControlPointDuplicate, MdDone } from "react-icons/md";
import { Skill } from "@/app/lib/interfaces";
import { useTest } from "../provider/TestProvider";
import {
	getQuestionGroupIndex,
	getQuestionIndex,
	MCGroup,
	MCQuestion,
	Quiz,
} from "@/app/interface/test/test";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { RemoveInputRegex, RemoveStyleRegex } from "@/regex/IeltsRegex";
import { AiOutlineClear } from "react-icons/ai";
import { GrScan } from "react-icons/gr";
import { FiFilePlus } from "react-icons/fi";
import { useUtility } from "@/app/provider/UtilityProvider";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

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
				<div className="flex flex-row items-start justify-between w-full p-2  h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
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
						<MultipleChoiceQuestion
							key={index}
							quizIndex={quizIndex}
							quizGroupIndex={quizGroupIndex}
							multipleChoiceIndex={index}
							skill={skill}
						/>
					);
				})}

				{currentGroup.quizzes.map((question, index) => {
					if (question.id) return null;
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
			<button
				onClick={() => addMultipleChoiceQuiz()}
				className="p-1 text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 w-fit h-fit">
				Add Question
			</button>
		</div>
	);
}

interface MultipleChoiceQuestionProps {
	quizIndex: number;
	quizGroupIndex: number;
	multipleChoiceIndex: number;
	skill: Skill;
}

function MultipleChoiceQuestion({
	quizIndex,
	quizGroupIndex,
	multipleChoiceIndex,
	skill,
}: MultipleChoiceQuestionProps) {
	const { onSetConfirmation, setSuccess } = useUtility();
	const questionSettingRef = useClickOutsideDetails();

	const { test, onChangeQuiz } = useTest();

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
	let currentQuestion = currentGroup.quizzes[
		multipleChoiceIndex
	] as MCQuestion;

	const [isSelect, setIsSelect] = useState<number[]>(() => {
		let newSelectArray = [];
		for (let i = 0; i < currentQuestion.options.length; i++) {
			newSelectArray.push(
				currentQuestion.answer.indexOf(currentQuestion.options[i])
			);
		}
		return newSelectArray;
	});

	const addOption = () => {
		currentQuestion.options.push("");
		setIsSelect([...isSelect, -1]);
		currentGroup.quizzes[multipleChoiceIndex] = currentQuestion;
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const onChangeDescription = (description: string) => {
		currentQuestion.description = description;
		currentGroup.quizzes[multipleChoiceIndex] = currentQuestion;
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const onChangeExplaination = (explaination: string) => {
		currentQuestion.explaination = explaination;
		currentGroup.quizzes[multipleChoiceIndex] = currentQuestion;
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const removeQuestion = () => {
		const remove = () => {
			currentGroup.quizzes.splice(multipleChoiceIndex, 1);
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
		const newQuestion: MCQuestion = {
			description: currentQuestion.description,
			options: currentQuestion.options,
			answer: currentQuestion.answer,
			numOfAnswers: currentQuestion.numOfAnswers,
			explaination: currentQuestion.explaination,
		};
		currentGroup.quizzes.push(newQuestion);
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	return (
		<div className="flex flex-col w-full gap-1 bg-white border rounded-md shadow-md h-fit dark:bg-pot-black border-foreground-blue dark:border-foreground-red">
			<div className="flex flex-col w-full p-2 rounded-t-md h-fit ">
				<div className="flex flex-row items-center justify-between w-full h-fit">
					<span className="text-xl font-semibold">
						Multiple Choice question{" "}
						{getQuestionIndex(
							test,
							quizIndex,
							quizGroupIndex,
							multipleChoiceIndex,
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
					placeholder="Type in your question here"
					className="text-base bg-white border-transparent dark:bg-pot-black focus:border-transparent focus:ring-transparent dark:placeholder:text-gray-300"
				/>
			</div>
			<div className="flex flex-col items-center justify-center w-full gap-4 p-4 h-fit">
				<div className="flex flex-col w-full gap-2">
					{currentQuestion.options.map((_, index) => {
						return (
							<Option
								key={index}
								quizIndex={quizIndex}
								quizGroupIndex={quizGroupIndex}
								multipleChoiceIndex={multipleChoiceIndex}
								optionIndex={index}
								isSelect={isSelect}
								setIsSelect={setIsSelect}
								skill={skill}
							/>
						);
					})}

					<div className="flex items-center justify-center w-full h-fit">
						<button title="Add option" onClick={() => addOption()}>
							<FaPlus className="text-foreground-blue dark:text-foreground-red size-5" />
						</button>
					</div>
				</div>
				<hr className="w-full border-t dark:border-gray-400" />

				<div className="flex flex-row items-center w-full gap-2 h-fit">
					<span className="text-base text-gray-400">Answer:</span>
					<div className="flex-1 px-2 py-1 text-sm text-gray-400 whitespace-pre-wrap border border-gray-400 rounded-md dark:bg-pot-black dark:border-gray-400 min-h-[30px]">
						{currentQuestion.answer.join("\n")}
					</div>
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

interface OptionProps {
	quizIndex: number;
	quizGroupIndex: number;
	multipleChoiceIndex: number;
	optionIndex: number;
	isSelect: number[];
	setIsSelect: Dispatch<SetStateAction<number[]>>;
	skill: Skill;
}

function Option({
	quizIndex,
	quizGroupIndex,
	multipleChoiceIndex,
	optionIndex,
	isSelect,
	setIsSelect,
	skill,
}: OptionProps) {
	const { test, onChangeQuiz } = useTest();

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
	let currentQuestion = currentGroup.quizzes[
		multipleChoiceIndex
	] as MCQuestion;
	let currentOption = currentQuestion.options[optionIndex];

	const removeOption = (index: number) => {
		const newIsSelect = [...isSelect];

		const answerIndex = newIsSelect[index];
		if (answerIndex > -1) {
			for (let i = 0; i < newIsSelect.length; i++) {
				if (newIsSelect[i] > answerIndex) {
					newIsSelect[i] -= 1;
				}
			}
			currentQuestion.answer.splice(answerIndex, 1);
		}
		newIsSelect.splice(index, 1);
		setIsSelect(newIsSelect);
		currentQuestion.numOfAnswers -= 1;

		currentQuestion.options.splice(index, 1);
		currentGroup.quizzes[multipleChoiceIndex] = currentQuestion;
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const onChangeOption = (option: string) => {
		currentOption = option;
		currentQuestion.options[optionIndex] = option;
		currentGroup.quizzes[multipleChoiceIndex] = currentQuestion;
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const getOptionAlpha = (index: number) => {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		return alphabet[index];
	};

	const onSelectOption = (index: number) => {
		const newIsSelect = [...isSelect];

		if (newIsSelect[index] == -1) {
			const answerLengh = currentQuestion.answer.length;

			newIsSelect[index] = answerLengh;
			currentQuestion.answer.push(currentQuestion.options[index]);
			currentQuestion.numOfAnswers += 1;
		} else {
			const answerIndex = newIsSelect[index];
			for (let i = 0; i < newIsSelect.length; i++) {
				if (newIsSelect[i] > answerIndex) {
					newIsSelect[i] -= 1;
				}
			}
			currentQuestion.answer.splice(answerIndex, 1);
			newIsSelect[index] = -1;
			currentQuestion.numOfAnswers -= 1;
		}
		setIsSelect(newIsSelect);
		currentGroup.quizzes[multipleChoiceIndex] = currentQuestion;
		currentQuiz.groups[quizGroupIndex] = currentGroup;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	return (
		<div className="flex flex-row items-center justify-center w-full gap-2 h-fit">
			<div
				onClick={() => onSelectOption(optionIndex)}
				className="flex items-center justify-center border rounded-full size-5 border-foreground-blue dark:border-foreground-red">
				{isSelect[optionIndex] > -1 && (
					<MdDone className="size-4 text-foreground-blue dark:text-foreground-red" />
				)}
			</div>

			<span className="text-lg font-bold text-black dark:text-gray-200">
				{getOptionAlpha(optionIndex)}.
			</span>
			<TextArea
				value={currentOption}
				onChangeInput={onChangeOption}
				className="flex-1 text-sm text-gray-white dark:text-gray-200 dark:bg-pot-black focus:border-foreground-blue focus:ring-foreground-blue dark:focus:border-foreground-red dark:focus:ring-foreground-red"
			/>

			<div onClick={() => removeOption(optionIndex)}>
				<FaMinus className="text-foreground-blue dark:text-foreground-red" />
			</div>
		</div>
	);
}
