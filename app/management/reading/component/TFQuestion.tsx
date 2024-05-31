"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	QuestionGroupInterface,
	TestInterface,
	True_False_Question,
} from "../../interface/TestInterface";
import TextEditor from "@/components/TextEditor/TextEditor";
import HorizontalDotsIcon from "@/components/Icon/HorizontalDotsIcon";
import { motion } from "framer-motion";

interface Props {
	partIndex: number;
	groupIndex: number;
	questionIndex: number;
	currentTest: TestInterface;
	setCurrentTest: Dispatch<SetStateAction<TestInterface>>;
}

export default function TFQuestion({
	partIndex,
	groupIndex,
	questionIndex,
	currentTest,
	setCurrentTest,
}: Props) {
	const question = currentTest.partList[partIndex].groupList[groupIndex]
		.questionList[questionIndex] as True_False_Question;

	const [isEdit, setEdit] = useState<boolean>(false);

	const onChangeQuestion = (value: string) => {
		let newTest = { ...currentTest };
		(
			newTest.partList[partIndex].groupList[groupIndex].questionList[
				questionIndex
			] as True_False_Question
		).question = value;
		setCurrentTest(newTest);
	};

	const removeQuestion = () => {
		let newTest = { ...currentTest };
		newTest.partList[partIndex].groupList[groupIndex].questionList =
			newTest.partList[partIndex].groupList[
				groupIndex
			].questionList.filter((_, i) => i !== questionIndex);
		setCurrentTest(newTest);
	};

	const countAllQuestionBefore = () => {
		let count = 0;
		for (let i = 0; i < partIndex; i++) {
			for (let j = 0; j < currentTest.partList[i].groupList.length; j++) {
				count +=
					currentTest.partList[i].groupList[j].questionList.length;
			}
		}
		for (let j = 0; j < groupIndex; j++) {
			count +=
				currentTest.partList[partIndex].groupList[j].questionList
					.length;
		}
		return count;
	};

	const DeleteQuestionButton = () => {
		const [isOpen, setIsOpen] = useState<boolean>(false);

		return (
			<div
				className="w-8 h-8 cursor-pointer relative"
				onClick={() => setIsOpen(!isOpen)}
				onMouseLeave={() => setIsOpen(false)}>
				<div className="w-full h-full flex justify-center items-center bg-red-400 rounded-full">
					<HorizontalDotsIcon width={10} height={10} color="white" />
				</div>

				{isOpen && (
					<motion.div
						className={`w-36 h-fit bg-white border text-base font-bold shadow-lg rounded-lg absolute z-10 flex flex-col overflow-hidden`}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}>
						<button
							className="px-2 py-1 bg-red-400 text-white w-full"
							onClick={() => setEdit(true)}>
							Edit question
						</button>
						<button
							className="px-2 py-1 bg-red-400 text-white w-full"
							onClick={() => removeQuestion()}>
							Delete question
						</button>
					</motion.div>
				)}
			</div>
		);
	};

	return (
		<div className="w-full h-fit flex flex-col gap-2">
			<div className="w-full h-fit flex flex-row items-center gap-2">
				<DeleteQuestionButton />
				<div className="font-bold mr-auto">
					True False Question{" "}
					{countAllQuestionBefore() + questionIndex + 1}:
				</div>
				{isEdit && (
					<div
						className="w-fit h-fit font-bold px-2 py-1 rounded-lg bg-red-400 text-white cursor-pointer"
						onClick={() => setEdit(false)}>
						Save
					</div>
				)}
			</div>
			<div
				className={`w-full h-fit flex flex-col ${isEdit ? "border-0" : "border-2 border-red-300"} rounded-lg items-center justify-start gap-1`}>
				{isEdit ? (
					<div className="w-full border-b-1">
						<TextEditor
							className="w-full"
							placeholder="Enter question here..."
							text={question.question}
							onChangeText={onChangeQuestion}
						/>
					</div>
				) : (
					<>
						<div
							className="w-full h-full min-h-8 px-4 py-2"
							dangerouslySetInnerHTML={{
								__html: question.question,
							}}
						/>
					</>
				)}
			</div>
		</div>
	);
}
