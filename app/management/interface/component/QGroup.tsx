"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
	Fill_Question,
	Multiple_Choice_Question,
	QuestionType,
	TestInterface,
	True_False_Question,
} from "../TestInterface";
import MCQuestion from "./MCQuestion";
import TFQuestion from "./TFQuestion";
import FQuestion from "./FQuestion";
import TextEditor from "@/components/TextEditor/TextEditor";
import { AnimatePresence, motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

interface Props {
	partIndex: number;
	groupIndex: number;
	currentTest: TestInterface;
	setCurrentTest: Dispatch<SetStateAction<TestInterface>>;
}

export default function QGroup({
	partIndex,
	groupIndex,
	currentTest,
	setCurrentTest,
}: Props) {
	const currentGroup = currentTest.partList[partIndex].groupList[groupIndex];

	const [isEditDescription, setIsEditDescription] = useState<boolean>(
		currentGroup.description === ""
	);

	const [isOpenAddQuestion, setIsOpenAddQuestion] = useState<boolean>(false);

	const onChangeDescription = (value: string) => {
		const newTest = { ...currentTest };
		newTest.partList[partIndex].groupList[groupIndex].description = value;
		setCurrentTest(newTest);
	};

	const addquestion = (type: QuestionType) => {
		const createQuestion = (questionType: QuestionType) => {
			switch (questionType) {
				case QuestionType.Multiple_Choice:
					return {
						questionType: QuestionType.Multiple_Choice,
						questionNumber: 0,
						question: "Multiple Choice Question",
						choice: [
							"Choice A",
							"Choice B",
							"Choice C",
							"Choice D",
						],
						numberOfChoice: 0,
						numberOfAnswer: 1,
					} as Multiple_Choice_Question;
				case QuestionType.True_Fasle:
					return {
						questionType: QuestionType.True_Fasle,
						questionNumber: 0,
						question: "True or False Question",
					} as True_False_Question;
				case QuestionType.Fill:
					return {
						questionType: QuestionType.Fill,
						questionNumber: 0,
						question: "Fill in the blank question",
					} as Fill_Question;
			}
		};
		const newQuestion = createQuestion(type);

		const newTest = { ...currentTest };
		newTest.partList[partIndex].groupList[groupIndex].questionList.push(
			newQuestion
		);
		setCurrentTest(newTest);
	};

	const countAllGroupBefore = () => {
		let count = 0;
		for (let i = 0; i < partIndex; i++) {
			count += currentTest.partList[i].groupList.length;
		}
		return count;
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

	const deleteGroup = () => {
		const newTest = { ...currentTest };
		newTest.partList[partIndex].groupList = newTest.partList[
			partIndex
		].groupList.filter((_, i) => i !== groupIndex);
		setCurrentTest(newTest);
	};

	const DeleteGroupDropDownButton = () => {
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
						className={`w-40 h-fit bg-white border text-base font-bold shadow-lg rounded-lg absolute z-10 flex flex-col overflow-hidden`}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}>
						<button
							className="w-full px-2 py-1 text-white bg-red-400"
							onClick={() => setIsEditDescription(true)}>
							Edit description
						</button>
						<button
							className="w-full px-2 py-1 text-white bg-red-400"
							onClick={() => deleteGroup()}>
							Delete Group
						</button>
					</motion.div>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-col w-full gap-2 h-fit">
			{currentGroup.questionList.length != 0 ? (
				<div className="flex flex-row items-center w-full gap-2 text-2xl font-bold h-fit">
					<DeleteGroupDropDownButton />
					{`Group ${countAllGroupBefore() + groupIndex + 1} - Question ${countAllQuestionBefore() + 1} - ${countAllQuestionBefore() + currentGroup.questionList.length}`}
				</div>
			) : (
				<div className="flex flex-row items-center w-full gap-2 text-2xl font-bold h-fit">
					<DeleteGroupDropDownButton />
					{`Group ${countAllGroupBefore() + groupIndex + 1}`}
				</div>
			)}
			<div className="flex flex-col w-full gap-2 mb-5 h-fit">
				<div className="flex flex-row items-center justify-start">
					<span className="mr-auto text-lg font-bold">
						Description:
					</span>
					{isEditDescription && (
						<div
							className="px-2 py-1 font-bold text-white bg-red-400 rounded-lg cursor-pointer w-fit h-fit"
							onClick={() => setIsEditDescription(false)}>
							Save
						</div>
					)}
				</div>
				{isEditDescription ? (
					<div className="w-full min-h-40">
						<TextEditor
							text={currentGroup.description}
							onChangeText={onChangeDescription}
						/>
					</div>
				) : (
					<div
						className="w-full h-fit"
						dangerouslySetInnerHTML={{
							__html: currentGroup.description,
						}}></div>
				)}
			</div>
			{currentGroup.questionList.map((question, index) => {
				switch (question.questionType) {
					case QuestionType.Multiple_Choice:
						return (
							<MCQuestion
								key={index}
								partIndex={partIndex}
								groupIndex={groupIndex}
								questionIndex={index}
								currentTest={currentTest}
								setCurrentTest={setCurrentTest}
							/>
						);
					case QuestionType.True_Fasle:
						return (
							<TFQuestion
								key={index}
								partIndex={partIndex}
								groupIndex={groupIndex}
								questionIndex={index}
								currentTest={currentTest}
								setCurrentTest={setCurrentTest}
							/>
						);
					case QuestionType.Fill:
						return (
							<FQuestion
								key={index}
								partIndex={partIndex}
								groupIndex={groupIndex}
								questionIndex={index}
								currentTest={currentTest}
								setCurrentTest={setCurrentTest}
							/>
						);
				}
				return null;
			})}
			<div className="flex items-center justify-start w-full gap-2 pt-10 rounded-full h-fit">
				<button
					title="Add Question"
					className="z-10 p-2 font-bold text-white bg-red-400 rounded-full"
					onClick={() => setIsOpenAddQuestion(!isOpenAddQuestion)}>
					<FaPlus size={15} color="white" />
				</button>
				<AnimatePresence mode="wait">
					{isOpenAddQuestion && (
						<motion.div
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: "-50%" }}
							className="z-0 flex items-center justify-start w-full gap-2 h-fit">
							<button
								className="p-1 px-2 font-bold text-white bg-red-400 rounded-lg"
								onClick={() =>
									addquestion(QuestionType.True_Fasle)
								}>
								True false
							</button>
							<button
								className="p-1 px-2 font-bold text-white bg-red-400 rounded-lg"
								onClick={() =>
									addquestion(QuestionType.Multiple_Choice)
								}>
								Multiple Choice
							</button>
							<button
								className="p-1 px-2 font-bold text-white bg-red-400 rounded-lg"
								onClick={() => addquestion(QuestionType.Fill)}>
								Fill
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
