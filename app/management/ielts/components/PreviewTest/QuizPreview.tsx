import { QuizType, Skill } from "@/app/lib/interfaces";
import { useTestManagement } from "../../provider/TestManagementProvider";
import { FGroup, MCGroup, Quiz } from "@/app/interface/test/test";

interface RecordProps {
	quizIndex: number;
	quizskill: Skill;
}

export default function QuizPreview({ quizIndex, quizskill }: RecordProps) {
	const { currentTest } = useTestManagement();

	let currentQuiz: Quiz;
	switch (quizskill) {
		case Skill.LISTENING:
			currentQuiz = currentTest.listening[quizIndex];
			break;
		case Skill.WRITING:
			currentQuiz = currentTest.writing[quizIndex];
			break;
		case Skill.SPEAKING:
			currentQuiz = currentTest.speaking[quizIndex];
			break;
		default:
			currentQuiz = currentTest.reading[quizIndex];
	}

	return (
		<div className="flex flex-col w-10/12 gap-4 h-fit">
			{quizskill == Skill.READING && (
				<div
					className="flex flex-col w-full p-4 text-black bg-white rounded-md shadow-md dark:bg-pot-black dark:text-gray-200 h-fit preview"
					dangerouslySetInnerHTML={{
						__html: currentQuiz.content,
					}}
				/>
			)}

			{currentQuiz.groups.map((group, index) => {
				switch (group.type) {
					case QuizType.FILLING:
						return (
							<FillingGroup
								key={index}
								quizIndex={quizIndex}
								groupIndex={index}
								quizSkill={quizskill}
							/>
						);
					case QuizType.MULTIPLE_CHOICE:
						return (
							<MultipleChoiceGroup
								key={index}
								quizIndex={quizIndex}
								groupIndex={index}
								quizSkill={quizskill}
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
	quizIndex: number;
	groupIndex: number;
	quizSkill: Skill;
}

function FillingGroup({ quizIndex, groupIndex, quizSkill }: FillingGroupprops) {
	const { currentTest } = useTestManagement();

	let currentGroup: FGroup;
	switch (quizSkill) {
		case Skill.LISTENING:
			currentGroup = currentTest.listening[quizIndex].groups[
				groupIndex
			] as FGroup;
			break;
		case Skill.WRITING:
			currentGroup = currentTest.writing[quizIndex].groups[
				groupIndex
			] as FGroup;
			break;
		case Skill.SPEAKING:
			currentGroup = currentTest.speaking[quizIndex].groups[
				groupIndex
			] as FGroup;
			break;
		default:
			currentGroup = currentTest.reading[quizIndex].groups[
				groupIndex
			] as FGroup;
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
							<div className="flex flex-col items-center justify-center w-full gap-2 p-2 border-2 rounded-md h-fit">
								<div className="flex flex-row items-center justify-start w-full gap-4 h-fit">
									<span className="font-semibold whitespace-nowrap">
										Answer:
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
	const { currentTest } = useTestManagement();

	let currentGroup: MCGroup;
	switch (quizSkill) {
		case Skill.LISTENING:
			currentGroup = currentTest.listening[quizIndex].groups[
				groupIndex
			] as MCGroup;
			break;
		case Skill.WRITING:
			currentGroup = currentTest.writing[quizIndex].groups[
				groupIndex
			] as MCGroup;
			break;
		case Skill.SPEAKING:
			currentGroup = currentTest.speaking[quizIndex].groups[
				groupIndex
			] as MCGroup;
			break;
		default:
			currentGroup = currentTest.reading[quizIndex].groups[
				groupIndex
			] as MCGroup;
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
							key={id + index}
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
