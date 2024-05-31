"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
	Fill_Question,
	Multiple_Choice_Question,
	QuestionType,
	TestInterface,
	True_False_Question,
} from "../../interface/TestInterface";
import MCQuestion from "./MCQuestion";
import TFQuestion from "./TFQuestion";
import FQuestion from "./FQuestion";
import TextEditor from "@/components/TextEditor/TextEditor";
import HorizontalDotsIcon from "@/components/Icon/HorizontalDotsIcon";
import { AnimatePresence, motion } from "framer-motion";
import PlusIcon from "@/components/Icon/PlusIcon";

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
				className="w-8 h-8 cursor-pointer relative"
				onClick={() => setIsOpen(!isOpen)}
				onMouseLeave={() => setIsOpen(false)}>
				<div className="w-full h-full flex justify-center items-center bg-red-400 rounded-full">
					<HorizontalDotsIcon width={10} height={10} color="white" />
				</div>

				{isOpen && (
					<motion.div
						className={`w-40 h-fit bg-white border text-base font-bold shadow-lg rounded-lg absolute z-10 flex flex-col overflow-hidden`}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}>
						<button
							className="px-2 py-1 bg-red-400 text-white w-full"
							onClick={() => setIsEditDescription(true)}>
							Edit description
						</button>
						<button
							className="px-2 py-1 bg-red-400 text-white w-full"
							onClick={() => deleteGroup()}>
							Delete Group
						</button>
					</motion.div>
				)}
			</div>
		);
	};

	return (
		<div className="w-full h-fit flex flex-col gap-2">
			{currentGroup.questionList.length != 0 ? (
				<div className="w-full h-fit text-2xl font-bold flex flex-row items-center gap-2">
					<DeleteGroupDropDownButton />
					{`Group ${countAllGroupBefore() + groupIndex + 1} - Question ${countAllQuestionBefore() + 1} - ${countAllQuestionBefore() + currentGroup.questionList.length}`}
				</div>
			) : (
				<div className="w-full h-fit text-2xl font-bold flex flex-row items-center gap-2">
					<DeleteGroupDropDownButton />
					{`Group ${countAllGroupBefore() + groupIndex + 1}`}
				</div>
			)}
			<div className="w-full h-fit flex flex-col mb-5 gap-2">
				<div className="flex flex-row justify-start items-center">
					<span className="text-lg font-bold mr-auto">
						Description:
					</span>
					{isEditDescription && (
						<div
							className="w-fit h-fit font-bold px-2 py-1 rounded-lg bg-red-400 text-white cursor-pointer"
							onClick={() => setIsEditDescription(false)}>
							Save
						</div>
					)}
				</div>
				{isEditDescription ? (
					<TextEditor
						text={currentGroup.description}
						onChangeText={onChangeDescription}
						className="w-full h-full overflow-y-hidden border-b-2 border-red-300"
					/>
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
			<div className="w-full h-fit flex justify-start items-center gap-2 pt-10">
				<button
					title="Add Question"
					className="p-2 bg-red-400 text-white rounded-full font-bold z-10"
					onClick={() => setIsOpenAddQuestion(!isOpenAddQuestion)}>
					<PlusIcon width={6} height={6} />
				</button>
				<AnimatePresence mode="wait">
					{isOpenAddQuestion && (
						<motion.div
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: "-50%" }}
							className="w-full h-fit flex justify-start items-center gap-2 z-0">
							<button
								className="px-2 p-1 bg-red-400 text-white rounded-lg font-bold"
								onClick={() =>
									addquestion(QuestionType.True_Fasle)
								}>
								True false
							</button>
							<button
								className="px-2 p-1 bg-red-400 text-white rounded-lg font-bold"
								onClick={() =>
									addquestion(QuestionType.Multiple_Choice)
								}>
								Multiple Choice
							</button>
							<button
								className="px-2 p-1 bg-red-400 text-white rounded-lg font-bold"
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
