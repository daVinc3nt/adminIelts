import { useQuizData } from "../provider/QuizDataProvider";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface WritingQuizGroupProps {
	quizIndex: number;
}

export default function WritingQuizGroup({ quizIndex }: WritingQuizGroupProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const { quizList, setQuizList } = useQuizData();

	const onChangeQuestion = (question: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[0].question = question;
		setQuizList(newQuizList);
	};

	return (
		<div className="flex flex-col items-center w-full gap-6 h-fit">
			<div className="flex flex-col w-full h-fit">
				<div className="flex flex-row items-center justify-between w-full p-2 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
					<div className="flex flex-col w-full h-fit">
						<span className="text-2xl font-bold text-white ">
							Writing Question :
						</span>
					</div>
				</div>
				<CK5Editor
					content={quizList[quizIndex].groups[0].question}
					onChangeContent={onChangeQuestion}
				/>
			</div>
		</div>
	);
}
