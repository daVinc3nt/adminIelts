import dynamic from "next/dynamic";
import { useQuizData } from "../provider/QuizDataProvider";
import { useMemo } from "react";

interface QuizContentProps {
	quizIndex: number;
}

export default function QuizContent({ quizIndex }: QuizContentProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const { quizList, setQuizList, currentQuizIndex } = useQuizData();

	const onChangeContent = (content: string) => {
		setQuizList((prev) => {
			const newQuizList = [...prev];
			newQuizList[quizIndex].content = content;
			return newQuizList;
		});
	};

	return (
		<div className="flex flex-col w-1/2 h-fit">
			<div className="flex flex-row items-center w-full p-2 duration-200 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
				<span className="text-2xl font-bold text-white ">
					Part {currentQuizIndex + 1} Paragraph
				</span>
			</div>
			<CK5Editor
				content={quizList[quizIndex].content}
				onChangeContent={onChangeContent}
			/>
		</div>
	);
}
