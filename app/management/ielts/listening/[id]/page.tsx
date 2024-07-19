"use client";
import { QuizDataProvider, useQuizData } from "../../provider/QuizDataProvider";
import ReadingQuizList from "../../components/QuizList";
import QuizContent from "../../components/QuizContent";
import QuizGroup from "../../components/QuizGroup";
import { Fragment, useEffect } from "react";
import { QuizDataRecieve, quizDataRecieve2Quiz } from "@/app/interface/quiz";
import ReadingMenuBar from "../../components/MenuBar";
import { TestOperation } from "@/app/interface/main";
import { Quiz } from "@/app/interface/quiz";
import { Category, Skill } from "@/app/interface/interfaces";

export default function Page({ params }: { params: { id: string } }) {
	return (
		<QuizDataProvider>
			<QuizManagement id={params.id} />
		</QuizDataProvider>
	);
}

interface QuizManagementProps {
	id: string;
}

function QuizManagement({ id }: QuizManagementProps) {
	const { quizList, currentQuizIndex, setQuizList } = useQuizData();

	useEffect(() => {
		const testOperation = new TestOperation();
	}, []);

	return (
		<main className="flex items-center justify-center flex-1">
			<div className="flex flex-col items-center w-11/12 min-h-screen gap-4 py-4">
				<div className="flex flex-col w-full gap-1 h-fit">
					<ReadingMenuBar />

					<hr className="w-full border-[0.5px] border-gray-200" />

					<div className="flex flex-row w-full gap-8 h-fit">
						<div className="flex-1 m-1"></div>
					</div>
				</div>

				<div className="flex flex-row w-full gap-8 h-fit justify-center">
					{quizList.map((_, index) => {
						if (index != currentQuizIndex) return null;
						return (
							<Fragment key={index}>
								<QuizContent quizIndex={index} oneQuiz />
								<QuizGroup quizIndex={index} />
							</Fragment>
						);
					})}
				</div>
			</div>
		</main>
	);
}

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
