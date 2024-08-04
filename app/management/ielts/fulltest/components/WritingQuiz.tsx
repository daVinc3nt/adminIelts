import { BsThreeDots } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Skill } from "@/app/lib/interfaces";
import { useTest } from "../provider/TestProvider";
import { FGroup, Quiz } from "@/app/interface/test/test";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { RemoveInputRegex, RemoveStyleRegex } from "@/regex/IeltsRegex";
import { AiOutlineClear } from "react-icons/ai";
import Link from "next/link";
import { FiFilePlus } from "react-icons/fi";
import { useUtility } from "@/app/provider/UtilityProvider";
import { FaArrowRight } from "react-icons/fa";

interface FillingQuizGroupProps {
	quizIndex: number;
	skill: Skill;
}

export default function WritingQuiz({
	quizIndex,
	skill,
}: FillingQuizGroupProps) {
	const { setError } = useUtility();

	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const quizGroupSettingRef = useClickOutsideDetails();

	const {
		test,
		onChangeQuiz,
		onSelectPractice,
		onChangeIsOpenCreateQuizPractice,
		onChangePracticeType,
		isLoading,
	} = useTest();

	const currentQuiz: Quiz = test.writing[quizIndex];

	const onChangeContent = (content: string) => {
		currentQuiz.content = content;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const removeStyle = () => {
		currentQuiz.content = currentQuiz.content.replace(RemoveStyleRegex, "");
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const onOpenCreatePractice = () => {
		const newQuiz = currentQuiz;
		if (!currentQuiz.id) {
			setError("You must save this test before creating a practice");
			return;
		}
		onSelectPractice(newQuiz);
		onChangeIsOpenCreateQuizPractice(true);
		onChangePracticeType("quiz");
	};

	return (
		<div className="flex flex-col items-center w-full gap-6 h-fit">
			<div className="flex flex-col w-full h-fit">
				<div
					style={{ display: isLoading ? "none" : "flex" }}
					className="flex flex-row items-center justify-between w-full p-2 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
					<div className="flex flex-col w-full h-fit">
						<span className="text-2xl font-bold text-white ">
							Writing Part: {quizIndex + 1}
						</span>
					</div>

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
										<FiFilePlus className="size-4" />
									</button>
								)
							) : null}
						</div>
					</details>
				</div>

				<CK5Editor
					content={currentQuiz.content}
					onChangeContent={onChangeContent}
				/>
			</div>
		</div>
	);
}
