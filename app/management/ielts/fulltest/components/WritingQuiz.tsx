import { BsThreeDots } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Skill } from "@/app/lib/interfaces";
import { useTest } from "../provider/TestProvider";
import { FGroup, Quiz } from "@/app/interface/test/test";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { RemoveInputRegex, RemoveStyleRegex } from "@/regex/IeltsRegex";

interface FillingQuizGroupProps {
	quizIndex: number;
	skill: Skill;
}

export default function WritingQuiz({
	quizIndex,
	skill,
}: FillingQuizGroupProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const quizGroupSettingRef = useClickOutsideDetails();

	const { test, onChangeQuiz } = useTest();

	const currentQuiz: Quiz = test.writing[quizIndex];

	const onChangeContent = (content: string) => {
		currentQuiz.content = content;
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	const removeStyle = () => {
		currentQuiz.content = currentQuiz.content.replace(RemoveStyleRegex, "");
		currentQuiz.content = currentQuiz.content.replace(
			RemoveInputRegex,
			"......."
		);
		onChangeQuiz(currentQuiz, skill, quizIndex);
	};

	return (
		<div className="flex flex-col items-center w-full gap-6 h-fit">
			<div className="flex flex-col w-full h-fit">
				<div className="flex flex-row items-center justify-between w-full p-2 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
					<div className="flex flex-col w-full h-fit">
						<span className="text-2xl font-bold text-white ">
							Writing Part: {quizIndex + 1}
						</span>
					</div>

					<details ref={quizGroupSettingRef} className="relative">
						<summary className="list-none">
							<BsThreeDots className="p-1 text-white size-8" />
						</summary>
						<div className="top-8 -left-10 absolute w-32 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
							<button
								onClick={() => removeStyle()}
								className="flex items-start justify-start w-full p-2 text-sm rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
								Remove Style
							</button>
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
