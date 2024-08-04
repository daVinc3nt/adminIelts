"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useTest } from "../provider/TestProvider";
import { Quiz } from "@/app/interface/test/test";
import { Skill } from "@/app/lib/interfaces";
import { RemoveInputRegex, RemoveStyleRegex } from "@/regex/IeltsRegex";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { AiOutlineClear } from "react-icons/ai";
import { FiFilePlus } from "react-icons/fi";
import { GoTag } from "react-icons/go";
import { FaArrowRight, FaTag } from "react-icons/fa";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { Tag } from "@/app/interface/tag/tag";
import { useUtility } from "@/app/provider/UtilityProvider";

interface QuizContentProps {
	quizIndex: number;
	quizSkill: Skill;
}

export default function QuizContent({
	quizIndex,
	quizSkill,
}: QuizContentProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);
	const { setError } = useUtility();

	const {
		test,
		onChangeQuiz,
		onSelectPractice,
		onChangePracticeType,
		onChangeIsOpenCreateQuizPractice,
		isLoading,
	} = useTest();

	const quizGroupSettingRef = useClickOutsideDetails();

	const removeStyle = () => {
		currentQuiz.content = currentQuiz.content.replace(RemoveStyleRegex, "");
		currentQuiz.content = currentQuiz.content.replace(
			RemoveInputRegex,
			"......."
		);
		onChangeQuiz(currentQuiz, quizSkill, quizIndex);
	};

	let currentQuiz: Quiz;
	switch (quizSkill) {
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

	const onChangeContent = (content: string) => {
		onChangeQuiz(
			{
				...currentQuiz,
				content: content,
			},
			quizSkill,
			quizIndex
		);
	};

	const onOpenCreatePractice = () => {
		if (!currentQuiz.id) {
			setError("You must save this test before creating a practice");
			return;
		}
		onSelectPractice(currentQuiz);
		onChangeIsOpenCreateQuizPractice(true);
		onChangePracticeType("quiz");
	};

	const removeTag = (index: number) => {
		if (currentQuiz.tags.length == 1) {
			setError("Practice must have at least 1 tag");
			return;
		}
		const newTags = currentQuiz.tags.filter((_, i) => i !== index);
		onChangeQuiz(
			{
				...currentQuiz,
				tags: newTags,
			},
			quizSkill,
			quizIndex
		);
	};

	return (
		<div
			style={{ display: isLoading ? "none" : "flex" }}
			className="flex flex-col w-full h-fit shadow-md">
			<div className="flex flex-col items-center w-full p-2  h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
				<div className="flex flex-row items-center w-full">
					<span className="text-2xl font-bold text-white mr-auto">
						Part {quizIndex + 1} Paragraph
					</span>
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
							{test.isPractice && (
								<AddTagButton
									quizIndex={quizIndex}
									quizSkill={quizSkill}
								/>
							)}
							{!test.isPractice ? (
								currentQuiz.linkToTest ? (
									<Link
										href={`/management/ielts/fulltest/${currentQuiz.linkToTest}`}
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
										<FiFilePlus className="size-4" />{" "}
									</button>
								)
							) : null}
						</div>
					</details>
				</div>
				<div className="w-full h-fit flex flex-row flex-wrap gap-2">
					{currentQuiz.tags.map((tag, index) => (
						<div
							key={index}
							className="flex flex-row items-center justify-center rounded-md text-gray-400 text-base gap-1 group cursor-pointer">
							<FaTag className="size-4" />
							{tag.value}
							<FaXmark
								onClick={() => removeTag(index)}
								className="size-4 group-hover:text-red-500 text-transparent "
							/>
						</div>
					))}
				</div>
			</div>
			<CK5Editor
				content={currentQuiz.content}
				onChangeContent={onChangeContent}
			/>
		</div>
	);
}

interface AddTagButtonProps {
	quizIndex: number;
	quizSkill: Skill;
}

function AddTagButton({ quizIndex, quizSkill }: AddTagButtonProps) {
	const { tagList, test, onChangeQuiz, currentSkill } = useTest();

	const [searchValue, setSearchValue] = useState<string>("");

	let currentQuiz: Quiz;
	switch (quizSkill) {
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

	const addTag = (tag: Tag) => {
		const newTags = [...currentQuiz.tags, tag];
		onChangeQuiz(
			{
				...currentQuiz,
				tags: newTags,
			},
			quizSkill,
			quizIndex
		);
	};

	const addTagRef = useClickOutsideDetails();

	return (
		<details ref={addTagRef} className="relative w-full">
			<summary className="list-none">
				<div className="flex items-center justify-between w-full p-2 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black cursor-pointer">
					Add tags
					<GoTag className="size-4" />
				</div>
			</summary>
			<div className="absolute w-128 min-h-40 flex flex-col gap-2 p-2 bg-gray-50 dark:bg-pot-black  shadow-md right-0 rounded-md">
				<div className="w-full flex flex-row">
					<input
						type="text"
						autoComplete="off"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search tag"
						className="w-1/2 px-2 py-1 bg-gray-100 rounded-md dark:bg-gray-22 focus:outline-none focus:ring-0 text-black dark:text-gray-200 text-sm"
					/>
				</div>
				<div className="w-full h-fit flex flex-row flex-wrap gap-2 mt-2">
					{tagList.map((tag, index) => {
						if (currentQuiz.tags[0].forQuiz != tag.forQuiz)
							return null;

						if (
							searchValue &&
							searchValue.trim() !== "" &&
							!tag.value
								.toLowerCase()
								.includes(searchValue.toLowerCase())
						)
							return null;

						if (tag.skill != currentSkill) {
							return null;
						}

						if (currentQuiz.tags.find((t) => t.value === tag.value))
							return null;

						return (
							<div
								onClick={() => addTag(tag)}
								key={index}
								className="w-fit h-fit px-3 py-1 flex flex-row gap-1 items-center justify-center cursor-pointer bg-gray-100 rounded-md dark:bg-gray-22 hover:bg-blue-50 dark:hover:bg-red-100 dark:hover:bg-opacity-20">
								<FaTag className="size-3" />
								{tag.value}
							</div>
						);
					})}
				</div>
			</div>
		</details>
	);
}
