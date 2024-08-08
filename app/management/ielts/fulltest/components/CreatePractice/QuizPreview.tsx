"use client";
import { QuizType, Skill } from "@/app/lib/interfaces";
import { FGroup, MCGroup, Quiz } from "@/app/interface/test/test";
import { useTest } from "../../provider/TestProvider";

interface RecordProps {}

export default function QuizPreview({}: RecordProps) {
	const { currentPractice, currentSkill } = useTest();

	return (
		<div className="flex flex-col w-10/12 gap-4 h-fit">
			{currentSkill != Skill.SPEAKING &&
				currentPractice.content != "" && (
					<div
						className="flex flex-col w-full p-4 text-black bg-white rounded-md shadow-md dark:bg-pot-black dark:text-gray-200 h-fit preview"
						dangerouslySetInnerHTML={{
							__html: currentPractice.content,
						}}
					/>
				)}

			{currentPractice.groups.map((group, index) => {
				switch (group.type) {
					case QuizType.FILLING:
						return <FillingGroup key={index} groupIndex={index} />;
					case QuizType.MULTIPLE_CHOICE:
						return (
							<MultipleChoiceGroup
								key={index}
								groupIndex={index}
							/>
						);
					default:
						return null;
				}
			})}
		</div>
	);
}

interface FillingGroupprops {
	groupIndex: number;
}

function FillingGroup({ groupIndex }: FillingGroupprops) {
	const { currentPractice } = useTest();

	const currentGroup = currentPractice.groups[groupIndex] as FGroup;

	return (
		<div className="flex flex-col w-full gap-4 p-4 text-black bg-white rounded-md shadow-md dark:text-gray-200 dark:bg-pot-black h-fit">
			<div
				className="preview"
				dangerouslySetInnerHTML={{
					__html: currentGroup.question,
				}}
			/>
			{currentGroup.quizzes.map((quiz, index) => {
				return (
					<div
						key={index}
						className="flex flex-col w-full gap-4 p-4 h-fit preview">
						<div className="flex flex-row items-center w-full gap-2 h-fit">
							<span className="flex items-center justify-center font-bold text-white rounded-full dark:text-gray-200 bg-foreground-blue dark:bg-foreground-red size-8">
								{currentGroup.startFrom + index}
							</span>
							<span>{quiz.description}</span>
						</div>
						<div className="flex flex-col items-center justify-center w-full gap-2 p-2 border-2 rounded-md h-fit">
							<div className="flex flex-row items-center justify-start w-full gap-4 h-fit">
								<span className="font-semibold whitespace-nowrap">
									Answer:
								</span>
								<span>{quiz.answer.join(" / ")}</span>
							</div>
							<div className="flex flex-row items-start justify-start w-full gap-4 h-fit">
								<span className="font-semibold whitespace-nowrap">
									Explanation:
								</span>
								<span className="whitespace-pre-wrap">
									{quiz.explaination}
								</span>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

interface MultipleChoiceGroupprops {
	groupIndex: number;
}

function MultipleChoiceGroup({ groupIndex }: MultipleChoiceGroupprops) {
	const { currentPractice } = useTest();

	const currentGroup = currentPractice.groups[groupIndex] as MCGroup;

	const getAlpha = (index: number) => {
		return String.fromCharCode(65 + index);
	};

	return (
		<div className="flex flex-col w-full gap-4 p-4 text-black bg-white rounded-md shadow-md h-fit dark:text-gray-200 dark:bg-pot-black">
			<div
				className="preview"
				dangerouslySetInnerHTML={{
					__html: currentGroup.question,
				}}
			/>
			{currentGroup.quizzes.map((quiz, index) => {
				return (
					<div
						key={index}
						className="flex flex-col w-full gap-4 p-4 h-fit preview">
						<div className="flex flex-row items-center w-full gap-2 h-fit">
							<span className="flex items-center justify-center font-bold text-white rounded-full dark:text-gray-200 bg-foreground-blue dark:bg-foreground-red size-8">
								{currentGroup.startFrom + index}
							</span>
							<span>{quiz.description}</span>
						</div>
						<div className="flex flex-col w-full gap-2 px-2 h-fit">
							{quiz.options.map((option, index) => {
								return (
									<div
										key={option + index}
										className="flex flex-row w-full gap-2">
										<span className="font-bold">
											{getAlpha(index)}.
										</span>
										{option}
									</div>
								);
							})}
						</div>

						<div className="flex flex-col items-center justify-center w-full gap-2 p-2 border-2 rounded-md h-fit">
							<div className="flex flex-row items-center justify-start w-full gap-4 h-fit">
								<span className="font-semibold whitespace-nowrap">
									Answer:
								</span>
								<span className="whitespace-pre-line">
									{quiz.answer.join("\n")}
								</span>
							</div>
							<div className="flex flex-row items-start justify-start w-full gap-4 h-fit">
								<span className="font-semibold whitespace-nowrap">
									Explanation:
								</span>
								<span className="whitespace-pre-wrap">
									{quiz.explaination}
								</span>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
