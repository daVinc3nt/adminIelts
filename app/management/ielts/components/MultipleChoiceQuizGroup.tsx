"use client";
import { useTestData } from "../provider/TestDataProvider";
import TextArea from "@/components/TextArea/TextArea";
import {
	getQuestionGroupNumber,
	getQuestionNumber,
	MultipleChoiceQuiz,
} from "@/app/interface/quiz";
import { BsThreeDots } from "react-icons/bs";
import dynamic from "next/dynamic";
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { Skill } from "@/app/interface/interfaces";

interface MultipleChoiceQuizGroupProps {
	quizIndex: number;
	quizGroupIndex: number;
	isPreview?: boolean;
}

export default function MultipleChoiceQuizGroup({
	quizIndex,
	quizGroupIndex,
	isPreview,
}: MultipleChoiceQuizGroupProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const quizGroupSettingRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				quizGroupSettingRef.current &&
				!quizGroupSettingRef.current.contains(event.target as Node)
			) {
				quizGroupSettingRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const { quizList, setQuizList } = useTestData();

	const onChangeQuestion = (question: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].question = question;
		setQuizList(newQuizList);
	};

	const addMultipleChoiceQuiz = () => {
		const newMultipleChoiceQuiz = {
			description: "",
			options: [],
			answer: [],
			numOfAnswers: 0,
			explaination: "",
		};
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes.push(
			newMultipleChoiceQuiz as any
		);
		setQuizList(newQuizList);
	};

	const removeQuizGroup = () => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups.splice(quizGroupIndex, 1);
		setQuizList(newQuizList);
	};

	return (
		<div className="flex flex-col items-center w-full gap-6 h-fit">
			<div className="flex flex-col w-full h-fit">
				<div className="flex flex-row items-center justify-between w-full p-2 duration-200 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
					<div className="flex flex-col w-full h-fit">
						<span className="text-2xl font-bold text-white ">
							Question Group{" "}
							{getQuestionGroupNumber(
								quizList,
								quizIndex,
								quizGroupIndex,
								quizList[quizIndex].skill as Skill
							)}
							:
						</span>
						<span className="text-base font-semibold text-gray-400 ">
							Multiple Choice
						</span>
					</div>
					{!isPreview && (
						<details ref={quizGroupSettingRef} className="relative">
							<summary className="list-none">
								<BsThreeDots className="p-1 text-white size-8" />
							</summary>
							<div className="top-8 -left-10 absolute w-32 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
								<button className="flex items-start justify-start w-full p-2 text-sm rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
									Scan question
								</button>
								<button
									onClick={() => removeQuizGroup()}
									className="flex items-start justify-start w-full p-2 text-sm text-red-500 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
									Delete group
								</button>
							</div>
						</details>
					)}
				</div>
				{!isPreview ? (
					<CK5Editor
						content={
							quizList[quizIndex].groups[quizGroupIndex].question
						}
						onChangeContent={onChangeQuestion}
					/>
				) : (
					<div
						className="w-full h-fit preview border border-foreground-blue dark:border-foreground-red rounded-b-md p-2"
						dangerouslySetInnerHTML={{
							__html: quizList[quizIndex].groups[quizGroupIndex]
								.question,
						}}></div>
				)}
			</div>
			<div className="flex flex-col w-full gap-8 h-fit">
				{quizList[quizIndex].groups[quizGroupIndex].quizzes.map(
					(_, index) => {
						return (
							<MultipleChoiceQuestion
								key={index}
								quizIndex={quizIndex}
								quizGroupIndex={quizGroupIndex}
								multipleChoiceIndex={index}
								isPreview={isPreview}
							/>
						);
					}
				)}
			</div>

			{!isPreview && (
				<button
					onClick={() => addMultipleChoiceQuiz()}
					className="p-1 text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 w-fit h-fit">
					Add Question
				</button>
			)}
		</div>
	);
}

interface MultipleChoiceQuestionProps {
	quizIndex: number;
	quizGroupIndex: number;
	multipleChoiceIndex: number;
	isPreview?: boolean;
}

function MultipleChoiceQuestion({
	quizIndex,
	quizGroupIndex,
	multipleChoiceIndex,
	isPreview,
}: MultipleChoiceQuestionProps) {
	const questionSettingRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				questionSettingRef.current &&
				!questionSettingRef.current.contains(event.target as Node)
			) {
				questionSettingRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const { quizList, setQuizList } = useTestData();

	const [isSelect, setIsSelect] = useState<number[]>(() => {
		let newSelectArray = [];
		const currentQuiz = quizList[quizIndex].groups[quizGroupIndex].quizzes[
			multipleChoiceIndex
		] as MultipleChoiceQuiz;
		for (let i = 0; i < currentQuiz.options.length; i++) {
			newSelectArray.push(
				currentQuiz.answer.indexOf(currentQuiz.options[i])
			);
		}
		return newSelectArray;
	});

	const addOption = () => {
		const newQuizList = [...quizList];

		const currentQuiz = quizList[quizIndex].groups[quizGroupIndex].quizzes[
			multipleChoiceIndex
		] as MultipleChoiceQuiz;
		currentQuiz.options.push("");

		setQuizList(newQuizList);

		const newIsSelect = [...isSelect];
		newIsSelect.push(-1);
		setIsSelect(newIsSelect);
	};

	const onChangeDescription = (description: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes[
			multipleChoiceIndex
		].description = description;
		setQuizList(newQuizList);
	};

	const onChangeExplaination = (explaination: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes[
			multipleChoiceIndex
		].explaination = explaination;
		setQuizList(newQuizList);
	};

	const removeQuestion = () => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes.splice(
			multipleChoiceIndex,
			1
		);
		setQuizList(newQuizList);
	};

	return (
		<div className="flex flex-col w-full gap-1 bg-white border rounded-md shadow-md h-fit dark:bg-pot-black border-foreground-blue dark:border-foreground-red">
			<div className="flex flex-col w-full p-2 rounded-t-md h-fit ">
				<div className="flex flex-row items-center justify-between w-full h-fit">
					<span className="text-xl font-semibold">
						Multiple Choice question{" "}
						{getQuestionNumber(
							quizList,
							quizIndex,
							quizGroupIndex,
							multipleChoiceIndex,
							quizList[quizIndex].skill
						) + ":"}
					</span>
					{!isPreview && (
						<details ref={questionSettingRef} className="relative">
							<summary className="list-none">
								<BsThreeDots className="p-1 text-white rounded-full size-7 bg-foreground-blue dark:bg-foreground-red" />
							</summary>
							<div className="top-8 -left-10 absolute w-32 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
								<button
									onClick={() => removeQuestion()}
									className="flex items-start justify-start w-full p-2 text-sm text-red-500 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
									Delete
								</button>
							</div>
						</details>
					)}
				</div>
				<TextArea
					value={
						quizList[quizIndex].groups[quizGroupIndex].quizzes[
							multipleChoiceIndex
						].description
					}
					disabled={isPreview}
					onChangeInput={onChangeDescription}
					placeholder="Type in your question here"
					className="text-base bg-white border-transparent dark:bg-pot-black focus:border-transparent focus:ring-transparent dark:placeholder:text-gray-300"
				/>
			</div>
			<div className="flex flex-col items-center justify-center w-full gap-4 p-4 h-fit">
				<div className="flex flex-col w-full gap-2">
					{(
						quizList[quizIndex].groups[quizGroupIndex].quizzes[
							multipleChoiceIndex
						] as MultipleChoiceQuiz
					).options.map((_, index) => {
						return (
							<Option
								key={index}
								quizIndex={quizIndex}
								quizGroupIndex={quizGroupIndex}
								multipleChoiceIndex={multipleChoiceIndex}
								optionIndex={index}
								isSelect={isSelect}
								setIsSelect={setIsSelect}
								isPreview={isPreview}
							/>
						);
					})}

					{!isPreview && (
						<div className="flex items-center justify-center w-full h-fit">
							<button
								title="Add option"
								onClick={() => addOption()}>
								<FaPlus className="text-foreground-blue dark:text-foreground-red size-5" />
							</button>
						</div>
					)}
				</div>
				<hr className="w-full border-t dark:border-gray-400" />

				<div className="flex flex-row items-center w-full gap-2 h-fit">
					<span className="text-base text-gray-400">Answer:</span>
					<div className="flex-1 px-2 py-1 text-sm text-gray-400 whitespace-pre-wrap border border-gray-400 rounded-md dark:bg-pot-black dark:border-gray-400 min-h-[30px]">
						{(
							quizList[quizIndex].groups[quizGroupIndex].quizzes[
								multipleChoiceIndex
							] as MultipleChoiceQuiz
						).answer.join("\n")}
					</div>
				</div>
				<div className="flex flex-row items-center w-full gap-2 h-fit">
					<span className="text-base text-gray-400">
						Explanation:
					</span>
					<TextArea
						value={
							(
								quizList[quizIndex].groups[quizGroupIndex]
									.quizzes[
									multipleChoiceIndex
								] as MultipleChoiceQuiz
							).explaination
						}
						disabled={isPreview}
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
	isPreview?: boolean;
}

function Option({
	quizIndex,
	quizGroupIndex,
	multipleChoiceIndex,
	optionIndex,
	isSelect,
	setIsSelect,
	isPreview,
}: OptionProps) {
	const { quizList, setQuizList } = useTestData();

	const removeOption = (index: number) => {
		const newQuizList = [...quizList];
		const newIsSelect = [...isSelect];

		const currentQuiz = quizList[quizIndex].groups[quizGroupIndex].quizzes[
			multipleChoiceIndex
		] as MultipleChoiceQuiz;

		const answerIndex = newIsSelect[index];
		if (answerIndex > -1) {
			for (let i = 0; i < newIsSelect.length; i++) {
				if (newIsSelect[i] > answerIndex) {
					newIsSelect[i] -= 1;
				}
			}
			currentQuiz.answer.splice(answerIndex, 1);
		}
		newIsSelect.splice(index, 1);
		setIsSelect(newIsSelect);
		currentQuiz.numOfAnswers -= 1;

		currentQuiz.options.splice(index, 1);
		setQuizList(newQuizList);
	};

	const onChangeOption = (option: string) => {
		const currentQuiz = quizList[quizIndex].groups[quizGroupIndex].quizzes[
			multipleChoiceIndex
		] as MultipleChoiceQuiz;
		const newQuizList = [...quizList];
		currentQuiz.options[optionIndex] = option;
		setQuizList(newQuizList);

		if (isSelect[optionIndex] > -1) {
			const answerIndex = isSelect[optionIndex];
			currentQuiz.answer[answerIndex] = option;
		}
	};

	const getOptionAlpha = (index: number) => {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		return alphabet[index];
	};

	const onSelectOption = (index: number) => {
		const newQuizList = [...quizList];
		const newIsSelect = [...isSelect];

		const currentQuiz = quizList[quizIndex].groups[quizGroupIndex].quizzes[
			multipleChoiceIndex
		] as MultipleChoiceQuiz;

		if (newIsSelect[index] == -1) {
			const answerLengh = currentQuiz.answer.length;

			newIsSelect[index] = answerLengh;
			currentQuiz.answer.push(currentQuiz.options[index]);
			currentQuiz.numOfAnswers += 1;
		} else {
			const answerIndex = newIsSelect[index];
			for (let i = 0; i < newIsSelect.length; i++) {
				if (newIsSelect[i] > answerIndex) {
					newIsSelect[i] -= 1;
				}
			}
			currentQuiz.answer.splice(answerIndex, 1);
			newIsSelect[index] = -1;
			currentQuiz.numOfAnswers -= 1;
		}
		setIsSelect(newIsSelect);
		setQuizList(newQuizList);
	};

	return (
		<div className="flex flex-row items-center justify-center w-full gap-2 h-fit">
			{!isPreview && (
				<div
					onClick={() => onSelectOption(optionIndex)}
					className="flex items-center justify-center border rounded-full size-5 border-foreground-blue dark:border-foreground-red">
					{isSelect[optionIndex] > -1 && (
						<MdDone className="size-4 text-foreground-blue dark:text-foreground-red" />
					)}
				</div>
			)}
			<span className="text-lg font-bold text-black dark:text-gray-200">
				{getOptionAlpha(optionIndex)}.
			</span>
			<TextArea
				value={
					(
						quizList[quizIndex].groups[quizGroupIndex].quizzes[
							multipleChoiceIndex
						] as MultipleChoiceQuiz
					).options[optionIndex]
				}
				disabled={isPreview}
				onChangeInput={onChangeOption}
				className="flex-1 text-sm text-gray-white dark:text-gray-200 dark:bg-pot-black focus:border-foreground-blue focus:ring-foreground-blue dark:focus:border-foreground-red dark:focus:ring-foreground-red"
			/>
			{!isPreview && (
				<div onClick={() => removeOption(optionIndex)}>
					<FaMinus className="text-foreground-blue dark:text-foreground-red" />
				</div>
			)}
		</div>
	);
}
