import { Skill } from "@/app/lib/interfaces";
import { useRecord } from "../provider/RecordProvider";
import {
	RecordFGroup,
	RecordMCGroup,
	RecordQuiz,
} from "@/app/interface/record/fulltestRecord";

interface RecordProps {
	quizIndex: number;
	quizskill: Skill;
}

export default function RecordPreview({ quizIndex, quizskill }: RecordProps) {
	const { record, currentQuizIndex, currentSkill } = useRecord();

	if (currentSkill != quizskill || currentQuizIndex != quizIndex) return null;

	let currentQuiz: RecordQuiz;
	switch (quizskill) {
		case Skill.LISTENING:
			currentQuiz = record.listening[quizIndex];
			break;
		case Skill.WRITING:
			currentQuiz = record.writing[quizIndex];
			break;
		case Skill.SPEAKING:
			currentQuiz = record.speaking[quizIndex];
			break;
		default:
			currentQuiz = record.reading[quizIndex];
	}

	return (
		<div className="flex flex-col w-full gap-4 py-4 h-fit">
			{quizskill == Skill.READING && (
				<div
					className="flex flex-col w-full p-4 text-black bg-white rounded-md shadow-md dark:bg-pot-black dark:text-gray-200 h-fit preview"
					dangerouslySetInnerHTML={{
						__html: currentQuiz.content,
					}}
				/>
			)}

			{currentQuiz.order.map((id) => {
				const fillingGroup = currentQuiz.fillingQuiz;
				let groupIndex = fillingGroup.findIndex(
					(group) => group.id === id
				);
				if (groupIndex != -1) {
					return (
						<FillingGroup
							key={id}
							quizIndex={quizIndex}
							groupIndex={groupIndex}
							quizSkill={quizskill}
						/>
					);
				}

				const multipleChoiceGroup = currentQuiz.multipleChoiceQuiz;
				groupIndex = multipleChoiceGroup.findIndex(
					(group) => group.id === id
				);
				if (groupIndex != -1) {
					return (
						<MultipleChoiceGroup
							key={id}
							quizIndex={quizIndex}
							groupIndex={groupIndex}
							quizSkill={quizskill}
						/>
					);
				}

				return null;
			})}
		</div>
	);
}

interface FillingGroupprops {
	quizIndex: number;
	groupIndex: number;
	quizSkill: Skill;
}

function FillingGroup({ quizIndex, groupIndex, quizSkill }: FillingGroupprops) {
	const { record } = useRecord();

	let currentGroup: RecordFGroup;
	switch (quizSkill) {
		case Skill.LISTENING:
			currentGroup = record.listening[quizIndex].fillingQuiz[groupIndex];
			break;
		case Skill.WRITING:
			currentGroup = record.writing[quizIndex].fillingQuiz[groupIndex];
			break;
		case Skill.SPEAKING:
			currentGroup = record.speaking[quizIndex].fillingQuiz[groupIndex];
			break;
		default:
			currentGroup = record.reading[quizIndex].fillingQuiz[groupIndex];
	}

	return (
		<div className="flex flex-col w-full gap-4 p-4 text-black bg-white rounded-md shadow-md dark:text-gray-200 dark:bg-pot-black h-fit">
			<div
				className="preview"
				dangerouslySetInnerHTML={{
					__html: currentGroup.question,
				}}
			/>
			{currentGroup.order.map((id, index) => {
				const quizIndex = currentGroup.quizzes.findIndex(
					(quiz) => quiz.id === id
				);
				if (quizIndex != -1) {
					const currentQuiz = currentGroup.quizzes[quizIndex];
					return (
						<div
							key={id}
							className="flex flex-col w-full gap-4 p-4 h-fit preview">
							<div className="flex flex-row items-center w-full gap-2 h-fit">
								<span className="flex items-center justify-center font-bold text-white rounded-full dark:text-gray-200 bg-foreground-blue dark:bg-foreground-red size-8">
									{currentGroup.startFrom + index}
								</span>
								<span>{currentQuiz.description}</span>
							</div>
							<div
								style={{
									borderColor:
										currentQuiz.score != 0
											? "#22c55e"
											: "#ef4444",
								}}
								className="flex flex-col items-center justify-center w-full gap-2 p-2 border-2 rounded-md h-fit">
								<div className="flex flex-row items-center justify-start w-full gap-4 h-fit">
									<span className="font-semibold whitespace-nowrap">
										User answer:
									</span>
									<span>{currentQuiz.userAnswer}</span>
								</div>

								<hr className="w-11/12 border-t" />

								<div className="flex flex-row items-center justify-start w-full gap-4 h-fit">
									<span className="font-semibold whitespace-nowrap">
										Correct answer:
									</span>
									<span>{currentQuiz.answer}</span>
								</div>
								<div className="flex flex-row items-start justify-start w-full gap-4 h-fit">
									<span className="font-semibold whitespace-nowrap">
										Explanation:
									</span>
									<span className="whitespace-pre-wrap">
										{currentQuiz.explaination}
									</span>
								</div>
							</div>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}

interface MultipleChoiceGroupprops {
	quizIndex: number;
	groupIndex: number;
	quizSkill: Skill;
}

function MultipleChoiceGroup({
	quizIndex,
	groupIndex,
	quizSkill,
}: MultipleChoiceGroupprops) {
	const { record } = useRecord();

	let currentGroup: RecordMCGroup;
	switch (quizSkill) {
		case Skill.LISTENING:
			currentGroup =
				record.listening[quizIndex].multipleChoiceQuiz[groupIndex];
			break;
		case Skill.WRITING:
			currentGroup =
				record.writing[quizIndex].multipleChoiceQuiz[groupIndex];
			break;
		case Skill.SPEAKING:
			currentGroup =
				record.speaking[quizIndex].multipleChoiceQuiz[groupIndex];
			break;
		default:
			currentGroup =
				record.reading[quizIndex].multipleChoiceQuiz[groupIndex];
	}

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
			{currentGroup.order.map((id, index) => {
				const quizIndex = currentGroup.quizzes.findIndex(
					(quiz) => quiz.id === id
				);
				if (quizIndex != -1) {
					const currentQuiz = currentGroup.quizzes[quizIndex];
					return (
						<div
							key={id}
							className="flex flex-col w-full gap-4 p-4 h-fit preview">
							<div className="flex flex-row items-center w-full gap-2 h-fit">
								<span className="flex items-center justify-center font-bold text-white rounded-full dark:text-gray-200 bg-foreground-blue dark:bg-foreground-red size-8">
									{currentGroup.startFrom + index}
								</span>
								<span>{currentQuiz.description}</span>
							</div>
							<div className="flex flex-col w-full gap-2 px-2 h-fit">
								{currentQuiz.options.map((option, index) => {
									return (
										<div className="flex flex-row w-full gap-2">
											<span className="font-bold">
												{getAlpha(index)}.
											</span>
											{option}
										</div>
									);
								})}
							</div>

							<div
								style={{
									borderColor:
										currentQuiz.score ==
										currentQuiz.numOfAnswers
											? "#22c55e"
											: "#ef4444",
								}}
								className="flex flex-col items-center justify-center w-full gap-2 p-2 border-2 rounded-md h-fit">
								<div className="flex flex-row items-center justify-start w-full gap-4 h-fit">
									<span className="font-semibold whitespace-nowrap">
										User answer:
									</span>
									<span>{currentQuiz.userAnswer}</span>
								</div>

								<hr className="w-11/12 border-t" />

								<div className="flex flex-row items-center justify-start w-full gap-4 h-fit">
									<span className="font-semibold whitespace-nowrap">
										Correct answer:
									</span>
									<span>{currentQuiz.answer}</span>
								</div>
								<div className="flex flex-row items-start justify-start w-full gap-4 h-fit">
									<span className="font-semibold whitespace-nowrap">
										Explanation:
									</span>
									<span className="whitespace-pre-wrap">
										{currentQuiz.explaination}
									</span>
								</div>
							</div>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}
