import dynamic from "next/dynamic";
import { useTestData } from "../provider/TestDataProvider";
import { useEffect, useMemo, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { QuizOperation } from "@/app/lib/main";

interface QuizContentProps {
	quizIndex: number;
	isPreview?: boolean;
}

export default function QuizContent({
	quizIndex,
	isPreview,
}: QuizContentProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const { quizList, setQuizList, currentQuizIndex } = useTestData();

	const onChangeContent = (content: string) => {
		setQuizList((prev) => {
			const newQuizList = [...prev];
			newQuizList[quizIndex].content = content;
			return newQuizList;
		});
	};

	if (isPreview) {
		return (
			<div className="flex flex-col w-full h-fit">
				<div className="flex flex-row items-center w-full p-2 duration-200 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
					<span className="text-2xl font-bold text-white mr-auto">
						Part {currentQuizIndex + 1} Paragraph
					</span>
				</div>
				<div
					className="preview w-full h-fit p-2 border border-foreground-blue dark:border-foreground-red rounded-b-md bg-white dark:bg-pot-black"
					dangerouslySetInnerHTML={{
						__html: quizList[quizIndex].content,
					}}></div>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full h-fit">
			<div className="flex flex-row items-center w-full p-2 duration-200 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
				<span className="text-2xl font-bold text-white mr-auto">
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

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
