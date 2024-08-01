import dynamic from "next/dynamic";
import { useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useTest } from "../provider/TestProvider";
import { Quiz } from "@/app/interface/test/test";
import { Skill } from "@/app/lib/interfaces";
import { RemoveInputRegex, RemoveStyleRegex } from "@/regex/IeltsRegex";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { AiOutlineClear } from "react-icons/ai";
import { FiFilePlus } from "react-icons/fi";
import { GoTag } from "react-icons/go";

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
		onSelectPractice(currentQuiz);
		onChangeIsOpenCreateQuizPractice(true);
		onChangePracticeType("quiz");
	};

	return (
		<div
			style={{ display: isLoading ? "none" : "flex" }}
			className="flex flex-col w-full h-fit">
			<div className="flex flex-row items-center w-full p-2 duration-200 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
				<span className="text-2xl font-bold text-white mr-auto">
					Part {quizIndex + 1} Paragraph
				</span>
				<details ref={quizGroupSettingRef} className="relative">
					<summary className="list-none">
						<BsThreeDots className="p-1 text-white size-8" />
					</summary>
					<div className="top-8 -left-28 absolute w-40 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center text-xs">
						<button className="flex items-center justify-between w-full p-2 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
							Add tags
							<GoTag className="size-4" />
						</button>
						<button
							onClick={() => removeStyle()}
							className="flex items-center justify-between w-full p-2 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
							Clear style
							<AiOutlineClear className="size-4" />
						</button>
						<button
							onClick={() => onOpenCreatePractice()}
							className="flex items-center justify-between w-full p-2 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
							Create practice
							<FiFilePlus className="size-4" />
						</button>
					</div>
				</details>
			</div>
			<CK5Editor
				content={currentQuiz.content}
				onChangeContent={onChangeContent}
			/>
		</div>
	);
}
