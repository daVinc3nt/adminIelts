"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	QuestionGroupInterface,
	TestInterface,
	True_False_Question,
} from "../TestInterface";
import TextEditor from "@/components/TextEditor/TextEditor";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";

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

	const [isEdit, setEdit] = useState<boolean>(
		question.question === "True or False Question"
	);

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
				tabIndex={-1}
				className="relative w-8 h-8 cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
				onBlur={() =>
					setTimeout(() => {
						setIsOpen(false);
					}, 150)
				}>
				<div className="flex items-center justify-center w-full h-full bg-red-400 rounded-full">
					<BsThreeDotsVertical size={25} color="white" />
				</div>

				{isOpen && (
					<motion.div
						className={`w-36 h-fit bg-white border text-base font-bold shadow-lg rounded-lg absolute z-10 flex flex-col overflow-hidden`}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}>
						<button
							className="w-full px-2 py-1 text-white bg-red-400"
							onClick={() => setEdit(true)}>
							Edit question
						</button>
						<button
							className="w-full px-2 py-1 text-white bg-red-400"
							onClick={() => removeQuestion()}>
							Delete question
						</button>
					</motion.div>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-col w-full gap-2 h-fit">
			<div className="flex flex-row items-center w-full gap-2 h-fit">
				<DeleteQuestionButton />
				<div className="mr-auto font-bold">
					True False Question{" "}
					{countAllQuestionBefore() + questionIndex + 1}:
				</div>
				{isEdit && (
					<div
						className="px-2 py-1 font-bold text-white bg-red-400 rounded-lg cursor-pointer w-fit h-fit"
						onClick={() => setEdit(false)}>
						Save
					</div>
				)}
			</div>
			<div
				className={`w-full h-fit flex flex-col ${isEdit ? "border-0" : "border-2 border-red-400"} rounded-lg items-center justify-start gap-1`}>
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
							className="w-full h-full px-4 py-2 min-h-8"
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
