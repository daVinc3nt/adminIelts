"use client";
import { QuizDataProvider, useQuizData } from "../provider/QuizDataProvider";
import ReadingQuizList from "../components/ReadingQuizList";
import QuizContent from "../components/QuizContent";
import QuizGroup from "../components/QuizGroup";
import { Fragment } from "react";
import ReadingMenuBar from "../components/ReadingMenuBar";

export default function Page() {
	return (
		<QuizDataProvider>
			<QuizManagement />
		</QuizDataProvider>
	);
}

function QuizManagement() {
	const { quizList, currentQuizIndex } = useQuizData();

	return (
		<main className="flex items-center justify-center flex-1">
			<div className="flex flex-col items-center w-11/12 min-h-screen gap-4 py-4">
				<div className="flex flex-col w-full gap-1 h-fit">
					<ReadingMenuBar />

					<hr className="w-full border-[0.5px] border-gray-200" />

					<div className="flex flex-row w-full gap-8 h-fit">
						<div className="flex flex-col w-2/3">
							<ReadingQuizList />
						</div>

						<div className="flex-1 m-1"></div>
					</div>
				</div>

				<div className="flex flex-row w-full gap-8 h-fit">
					{quizList.map((_, index) => {
						if (index != currentQuizIndex) return null;
						return (
							<Fragment key={index}>
								<QuizContent quizIndex={index} />
								<QuizGroup quizIndex={index} />
							</Fragment>
						);
					})}
				</div>
			</div>
		</main>
	);
}