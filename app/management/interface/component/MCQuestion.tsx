"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
	Multiple_Choice_Question,
	QuestionGroupInterface,
	QuestionType,
	TestInterface,
} from "../TestInterface";
import TextEditor from "@/components/TextEditor/TextEditor";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";

interface Props {
	partIndex: number;
	groupIndex: number;
	questionIndex: number;
	currentTest: TestInterface;
	setCurrentTest: Dispatch<SetStateAction<TestInterface>>;
}

export default function MCQuestion({
	partIndex,
	groupIndex,
	questionIndex,
	currentTest,
	setCurrentTest,
}: Props) {
	const question = currentTest.partList[partIndex].groupList[groupIndex]
		.questionList[questionIndex] as Multiple_Choice_Question;

	const [isEdit, setEdit] = useState<boolean>(
		question.question === "Multiple Choice Question"
	);

	const onChangeQuestion = (value: string) => {
		let newTest = { ...currentTest };
		(
			newTest.partList[partIndex].groupList[groupIndex].questionList[
				questionIndex
			] as Multiple_Choice_Question
		).question = value;
		setCurrentTest(newTest);
	};

	const onChangeChoice = (value: string, choiceIndex: number) => {
		let newTest = { ...currentTest };
		(
			newTest.partList[partIndex].groupList[groupIndex].questionList[
				questionIndex
			] as Multiple_Choice_Question
		).choice[choiceIndex] = value;
		setCurrentTest(newTest);
	};

	const addChoice = () => {
		let newTest = { ...currentTest };
		(
			newTest.partList[partIndex].groupList[groupIndex].questionList[
				questionIndex
			] as Multiple_Choice_Question
		).choice.push("");
		(
			newTest.partList[partIndex].groupList[groupIndex].questionList[
				questionIndex
			] as Multiple_Choice_Question
		).numberOfChoice += 1;
		setCurrentTest(newTest);
	};

	const removeChoice = (choiceIndex: number) => {
		let newTest = { ...currentTest };
		(
			newTest.partList[partIndex].groupList[groupIndex].questionList[
				questionIndex
			] as Multiple_Choice_Question
		).choice = (
			newTest.partList[partIndex].groupList[groupIndex].questionList[
				questionIndex
			] as Multiple_Choice_Question
		).choice.filter((_, i) => i !== choiceIndex);
		(
			newTest.partList[partIndex].groupList[groupIndex].questionList[
				questionIndex
			] as Multiple_Choice_Question
		).numberOfChoice -= 1;
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
					Multiple Choice Question{" "}
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
				className={`w-full h-fit flex flex-col ${isEdit ? "border-0" : "border-2 border-red-400 rounded-lg"} items-center justify-start gap-4 overflow-hidden`}>
				{isEdit ? (
					<TextEditor
						className="w-full h-full overflow-y-hidden border-b-2 border-red-300"
						placeholder="Enter question here..."
						text={question.question}
						onChangeText={onChangeQuestion}
					/>
				) : (
					<>
						<div
							className="w-full h-full px-4 py-2"
							dangerouslySetInnerHTML={{
								__html: question.question,
							}}
						/>
						<hr className="w-11/12 border border-gray-300 solid"></hr>
					</>
				)}
				<div
					className={`w-full h-fit flex flex-col items-center px-2  ${isEdit ? "border-2 border-red-400 rounded-lg gap-4 py-4" : "gap-2 py-2"}`}>
					{question.choice.map((choice, index) => {
						return (
							<div
								key={index}
								className="flex flex-row items-center justify-center w-full gap-2 px-2 h-fit">
								<div className="font-bold">
									{String.fromCharCode(65 + index)}.
								</div>
								<textarea
									key={index}
									className={`w-full px-2 py-1 rounded-lg hover:bg-primary ${isEdit ? "bg-primary" : "bg-white"} border border-red-400 min-h-6 resize-none outline-none focus:border-transparent focus:outline focus:ring focus:ring-red-400`}
									disabled={!isEdit}
									rows={1}
									value={choice}
									onInput={(e) => {
										const target =
											e.target as HTMLTextAreaElement;
										target.style.height = "inherit";
										target.style.height = `${target.scrollHeight}px`;
									}}
									onChange={(e) => {
										onChangeChoice(e.target.value, index);
									}}
								/>
								{isEdit && (
									<div
										title="Remove choice"
										onClick={() => removeChoice(index)}
										className="p-1 rounded-full w-fit h-fit hover:bg-primary">
										<FaMinus
											size={15}
											color="#f87171
"
										/>
									</div>
								)}
							</div>
						);
					})}
					{isEdit && (
						<button
							title="Add choice"
							onClick={() => addChoice()}
							className="flex flex-row p-1 mb-1 rounded-full w-fit h-fit hover:bg-primary">
							<FaPlus
								height={15}
								width={15}
								color="#f87171
"
							/>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
