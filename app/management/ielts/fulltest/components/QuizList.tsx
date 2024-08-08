"use client";
import { BsPlus, BsTrash } from "react-icons/bs";
import { Category, QuizType, Skill } from "@/app/lib/interfaces";
import { useTest } from "../provider/TestProvider";
import { useHorizontallScroll } from "@/hooks/useHorizontalScroll";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { Quiz } from "@/app/interface/test/test";
import { Fragment } from "react";
import { useUtility } from "@/app/provider/UtilityProvider";

export default function QuizList() {
	const { test, onChangeTest } = useTest();

	const divRef = useHorizontallScroll();
	const addQuizButtonRef = useClickOutsideDetails();

	const addQuiz = (skill: Skill) => {
		const newTest = { ...test };
		const newQuiz = {
			category: Category.IELTS,
			skill: skill,
			content: "",
			tags: [],
			groups: [],
		};
		switch (skill) {
			case Skill.READING:
				newTest.reading.push(newQuiz);
				break;
			case Skill.LISTENING:
				newTest.listening.push(newQuiz);
				break;
			case Skill.WRITING:
				newTest.writing.push(newQuiz);
				break;
			case Skill.SPEAKING:
				newQuiz.groups = [
					{
						question: "",
						type: QuizType.FILLING,
						quizzes: [],
						startFrom: 0,
					},
				];
				newTest.speaking.push(newQuiz);
		}
		onChangeTest(newTest);
	};

	let currentQuiz: Quiz = null;
	if (test.isPractice) {
		if (test.reading.length > 0) {
			currentQuiz = test.reading[0];
		} else if (test.listening.length > 0) {
			currentQuiz = test.listening[0];
		} else if (test.writing.length > 0) {
			currentQuiz = test.writing[0];
		} else if (test.speaking.length > 0) {
			currentQuiz = test.speaking[0];
		}

		if (currentQuiz == null) {
			return null;
		}

		return (
			<div className="flex flex-row w-full px-4 mt-1">
				<span className="text-3xl font-bold">IELTS Practice</span>
			</div>
		);
	}

	return (
		<div className="flex flex-row w-full gap-2 pt-2 mt-1">
			<details ref={addQuizButtonRef} className="relative">
				<summary className="list-none">
					<div
						title="Add Part"
						className="flex items-center justify-center rounded-full dark:bg-foreground-red size-8 bg-foreground-blue">
						<BsPlus size={35} color="white" strokeWidth={0.5} />
					</div>
				</summary>
				<div className="top-8 -left-10 absolute w-44 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
					<button
						onClick={() => addQuiz(Skill.READING)}
						className="flex items-start justify-start w-full p-2 text-sm text-black rounded-md dark:text-gray-200 h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
						Add Reading Part
					</button>
					<button
						onClick={() => addQuiz(Skill.LISTENING)}
						className="flex items-start justify-start w-full p-2 text-sm text-black rounded-md dark:text-gray-200 h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
						Add Listening Part
					</button>
					<button
						onClick={() => addQuiz(Skill.WRITING)}
						className="flex items-start justify-start w-full p-2 text-sm text-black rounded-md dark:text-gray-200 h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
						Add Writing Part
					</button>
					<button
						onClick={() => addQuiz(Skill.SPEAKING)}
						className="flex items-start justify-start w-full p-2 text-sm text-black rounded-md dark:text-gray-200 h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
						Add Speaking Part
					</button>
				</div>
			</details>

			<div
				ref={divRef}
				className="flex flex-row w-full h-40 gap-2 -mb-32 overflow-x-scroll overflow-y-visible cursor-pointer scrollbar-hide">
				<Pills quizList={test.reading} />
				<Pills quizList={test.listening} />
				<Pills quizList={test.writing} />
				<Pills quizList={test.speaking} />
			</div>
		</div>
	);
}

interface PillsProps {
	quizList: Quiz[];
}

function Pills({ quizList }: PillsProps) {
	const { onSetConfirmation } = useUtility();

	const {
		currentQuizIndex,
		currentSkill,
		onChangecurrentQuizIndex,
		onChangeCurrentSkill,
		onDeleteQuiz,
		onChangeIsLoading,
	} = useTest();

	const onSelectQuiz = (index: number, skill: Skill) => {
		onChangecurrentQuizIndex(index);
		onChangeCurrentSkill(skill);
		onChangeIsLoading(true);
	};

	const deleteQuiz = (index: number, skill: Skill) => {
		onSetConfirmation({
			message: "Are you sure you want to delete this quiz?",
			onConfirm: () => onDeleteQuiz(index, skill),
			type: "delete",
		});
	};

	return (
		<Fragment>
			{quizList.map((quiz, index) => {
				return (
					<div
						onClick={() => onSelectQuiz(index, quiz.skill)}
						key={index}
						className={`relative flex flex-row items-center justify-center whitespace-nowrap w-fit h-fit px-3 gap-2 py-1 text-center rounded-md cursor-pointer shadow-md  ${currentQuizIndex == index && currentSkill == quiz.skill ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-white"}`}>
						{partLabel(quiz.skill, index)}
						{currentQuizIndex == index &&
						currentSkill == quiz.skill ? (
							<BsTrash
								onClick={() => deleteQuiz(index, quiz.skill)}
								className="text-white size-4"
							/>
						) : (
							<BsTrash className="text-white size-4 dark:text-gray-22" />
						)}
					</div>
				);
			})}
		</Fragment>
	);
}

const partLabel = (skill: Skill, index: number) => {
	switch (skill) {
		case Skill.READING:
			return `Reading Part ${index + 1}`;
		case Skill.LISTENING:
			return `Listening Part ${index + 1}`;
		case Skill.WRITING:
			return `Writing Part ${index + 1}`;
		case Skill.SPEAKING:
			return `Speaking Part ${index + 1}`;
	}
};
