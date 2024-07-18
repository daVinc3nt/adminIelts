import { useQuizData } from "../provider/QuizDataProvider";
import TextArea from "@/components/TextArea/TextArea";
import {
	FillingQuiz,
	getQuestionGroupNumber,
	getQuestionNumber,
	Quiz,
} from "@/app/interface/quiz";
import { BsThreeDots } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";

interface FillingQuizGroupProps {
	quizIndex: number;
	quizGroupIndex: number;
}

export default function FillingQuizGroup({
	quizIndex,
	quizGroupIndex,
}: FillingQuizGroupProps) {
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

	const { quizList, setQuizList } = useQuizData();

	const onChangeQuestion = (question: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].question = question;
		setQuizList(newQuizList);
	};

	const addFillingQuiz = () => {
		const newFillingQuiz = {
			description: "",
			answer: "",
			explaination: "",
		};
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes.push(
			newFillingQuiz as any
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
				<div className="flex flex-row items-center justify-between w-full p-2 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
					<div className="flex flex-col w-full h-fit">
						<span className="text-2xl font-bold text-white ">
							Question Group{" "}
							{getQuestionGroupNumber(
								quizList,
								quizIndex,
								quizGroupIndex
							)}
							:
						</span>
						<span className="text-base font-semibold text-gray-400 ">
							Filling
						</span>
					</div>
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
				</div>
				<CK5Editor
					content={
						quizList[quizIndex].groups[quizGroupIndex].question
					}
					onChangeContent={onChangeQuestion}
				/>
			</div>
			<div className="flex flex-col w-full gap-8 h-fit">
				{quizList[quizIndex].groups[quizGroupIndex].quizzes.map(
					(_, index) => {
						return (
							<FillingQuestion
								key={index}
								quizIndex={quizIndex}
								quizGroupIndex={quizGroupIndex}
								fillingIndex={index}
							/>
						);
					}
				)}
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
}

function FillingQuestion({
	quizIndex,
	quizGroupIndex,
	fillingIndex,
}: FillingQuestionProps) {
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

	const { quizList, setQuizList } = useQuizData();

	const onChangeDescription = (description: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes[
			fillingIndex
		].description = description;
		setQuizList(newQuizList);
	};

	const onChangeAnswer = (answer: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes[
			fillingIndex
		].answer = answer;
		setQuizList(newQuizList);
	};

	const onChangeExplaination = (explaination: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes[
			fillingIndex
		].explaination = explaination;
		setQuizList(newQuizList);
	};

	const removeQuestion = () => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes.splice(
			fillingIndex,
			1
		);
		setQuizList(newQuizList);
	};

	return (
		<div className="flex flex-col w-full gap-1 duration-200 bg-white border rounded-md shadow-md h-fit dark:bg-pot-black border-foreground-blue dark:border-foreground-red">
			<div className="flex flex-col w-full p-2 text-black rounded-t-md h-fit dark:text-gray-200">
				<div className="flex flex-row items-center justify-between w-full h-fit">
					<span className="text-xl font-semibold duration-200">
						Filling question{" "}
						{getQuestionNumber(
							quizList,
							quizIndex,
							quizGroupIndex,
							fillingIndex
						) + ":"}
					</span>
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
				</div>
				<TextArea
					value={
						quizList[quizIndex].groups[quizGroupIndex].quizzes[
							fillingIndex
						].description
					}
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
						value={
							(
								quizList[quizIndex].groups[quizGroupIndex]
									.quizzes[fillingIndex] as FillingQuiz
							).answer
						}
						onChangeInput={onChangeAnswer}
						className="flex-1 text-sm text-gray-400 dark:bg-pot-black focus:border-foreground-blue focus:ring-foreground-blue dark:focus:border-foreground-red dark:focus:ring-foreground-red"
					/>
				</div>
				<div className="flex flex-row items-center w-full gap-2 h-fit">
					<span className="text-base text-gray-400">
						Explaination:
					</span>
					<TextArea
						value={
							(
								quizList[quizIndex].groups[quizGroupIndex]
									.quizzes[fillingIndex] as FillingQuiz
							).explaination
						}
						onChangeInput={onChangeExplaination}
						className="flex-1 text-sm text-gray-400 dark:bg-pot-black focus:border-foreground-blue focus:ring-foreground-blue dark:focus:border-foreground-red dark:focus:ring-foreground-red"
					/>
				</div>
			</div>
		</div>
	);
}
