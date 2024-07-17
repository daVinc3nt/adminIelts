"use client";
import { QuizDataProvider, useQuizData } from "../provider/QuizDataProvider";
import QuizList from "../components/QuizList";
import QuizContent from "../components/QuizContent";
import { QuizType } from "@/app/interface/interfaces";
import { FillingGroup, MultipleChoiceGroup } from "@/app/interface/quiz";
import QuizGroup from "../components/QuizGroup";
import { Fragment } from "react";

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
					<div className="flex flex-row gap-2 cursor-pointer">
						<span
							onClick={() => console.log(quizList)}
							className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
							Save & exit
						</span>
						<span className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
							Save
						</span>
						<span className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
							Edit test detail
						</span>
					</div>

					<hr className="w-full border-[0.5px] border-gray-200" />

					<div className="flex flex-row w-full gap-8 h-fit">
						<div className="flex flex-col w-2/3">
							<QuizList />

							<span className="text-3xl font-bold">
								IELTS test very very very long ass name
							</span>
						</div>

						<div className="flex-1 m-1"></div>
					</div>
				</div>

				<div className="w-full h-fit flex flex-row gap-8">
					{quizList.map((quiz, index) => {
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
