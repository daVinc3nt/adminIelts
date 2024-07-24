import { useTestData } from "../provider/TestDataProvider";
import TextArea from "@/components/TextArea/TextArea";
import {
	getQuestionGroupNumber,
	getQuestionNumber,
} from "@/app/interface/quiz";
import { BsThreeDots } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
import { Skill } from "@/app/interface/interfaces";

interface SpeakingQuizGroupProps {
	quizIndex: number;
	isPreview?: boolean;
}

export default function SpeakingQuizGroup({
	quizIndex,
	isPreview,
}: SpeakingQuizGroupProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const { quizList, setQuizList } = useTestData();

	const onChangeQuestion = (question: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[0].question = question;
		setQuizList(newQuizList);
	};

	const addFillingQuiz = () => {
		const newFillingQuiz = {
			description: "",
			answer: "",
			explaination: "",
		};
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[0].quizzes.push(newFillingQuiz as any);
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
								0,
								quizList[quizIndex].skill as Skill
							)}
							:
						</span>
						<span className="text-base font-semibold text-gray-400 ">
							Speaking
						</span>
					</div>
				</div>
				<CK5Editor
					content={quizList[quizIndex].groups[0].question}
					onChangeContent={onChangeQuestion}
				/>
			</div>
			<div className="flex flex-col w-full gap-8 h-fit">
				{quizList[quizIndex].groups[0].quizzes.map((_, index) => {
					return (
						<FillingQuestion
							key={index}
							quizIndex={quizIndex}
							quizGroupIndex={0}
							fillingIndex={index}
							isPreview={isPreview}
						/>
					);
				})}
			</div>

			{!isPreview && (
				<button
					onClick={() => addFillingQuiz()}
					className="p-1 text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 w-fit h-fit">
					Add Question
				</button>
			)}
		</div>
	);
}

interface FillingQuestionProps {
	quizIndex: number;
	quizGroupIndex: number;
	fillingIndex: number;
	isPreview?: boolean;
}

function FillingQuestion({
	quizIndex,
	quizGroupIndex,
	fillingIndex,
	isPreview,
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

	const { quizList, setQuizList } = useTestData();

	const onChangeDescription = (description: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[quizGroupIndex].quizzes[
			fillingIndex
		].description = description;
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
						Speaking question{" "}
						{getQuestionNumber(
							quizList,
							quizIndex,
							quizGroupIndex,
							fillingIndex,
							quizList[quizIndex].skill as Skill
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
							fillingIndex
						].description
					}
					disabled={isPreview}
					onChangeInput={onChangeDescription}
					placeholder="Type in your speaking question here..."
					className="text-base bg-white border-transparent dark:bg-pot-black focus:border-transparent focus:ring-transparent dark:placeholder:text-gray-300"
				/>
			</div>
		</div>
	);
}
