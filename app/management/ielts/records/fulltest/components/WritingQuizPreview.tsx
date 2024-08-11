import { useMemo } from "react";
import { useRecord } from "../provider/RecordProvider";
import dynamic from "next/dynamic";

interface WritingQuizPreviewProps {
	quizIndex: number;
}

export default function WritingQuizPreview({
	quizIndex,
}: WritingQuizPreviewProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(
				() => import("@/components/CK5Editor/CKEditor5ForWriting"),
				{
					ssr: false,
				}
			),
		[]
	);
	const { record } = useRecord();

	const currentWritingQuiz = record.writing[quizIndex];

	return (
		<div className="flex flex-col w-full gap-4 h-fit">
			<div className="w-full flex flex-row gap-4 justify-end">
				<div className="flex flex-col h-full w-fit">
					<div className="size-[188px] bg-white rounded-md dark:bg-pot-black shadow-md flex flex-col items-center justify-center">
						<span className="text-4xl font-bold">Score</span>
						<input
							value={currentWritingQuiz.score}
							readOnly
							autoComplete="off"
							className="w-32 h-20 text-4xl text-center text-black bg-white rounded-md dark:bg-pot-black focus:outline-none focus:ring-0 dark:text-gray-200"
						/>
					</div>
				</div>
				<div className="flex flex-col w-full h-full gap-5 p-2 items-stretch justify-between">
					<div className="w-full flex flex-row gap-2 items-center">
						<span className="min-w-fit font-bold">
							First Criterion:
						</span>
						<span>{currentWritingQuiz.firstCriterion}</span>
					</div>
					<div className="w-full flex flex-row gap-2 items-center">
						<span className="min-w-fit font-bold">
							Second Criterion:
						</span>
						<span>{currentWritingQuiz.secondCriterion}</span>
					</div>
					<div className="w-full flex flex-row gap-2 items-center">
						<span className="min-w-fit font-bold">
							Third Criterion:
						</span>
						<span>{currentWritingQuiz.thirdCriterion}</span>
					</div>
					<div className="w-full flex flex-row gap-2 items-center">
						<span className="min-w-fit font-bold">
							Fourth Criterion:
						</span>
						<span>{currentWritingQuiz.fourthCriterion}</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col w-full overflow-hidden bg-white rounded-md shadow-md h-fit dark:bg-pot-black">
				<div className="w-full px-4 py-2 h-fit bg-foreground-blue dark:bg-foreground-red ">
					<span className="text-2xl font-bold text-white dark:text-gray-200">
						Teacher review
					</span>
				</div>
				<CK5Editor
					content={currentWritingQuiz.remark}
					onChangeContent={() => {}}
					disable
				/>
			</div>
		</div>
	);
}
