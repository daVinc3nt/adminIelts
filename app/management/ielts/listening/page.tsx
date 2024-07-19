"use client";
import { QuizDataProvider, useQuizData } from "../provider/QuizDataProvider";
import QuizList from "../components/QuizList";
import QuizContent from "../components/QuizContent";
import QuizGroup from "../components/QuizGroup";
import { Fragment } from "react";
import MenuBar from "../components/MenuBar";
import { Category, Skill } from "@/app/interface/interfaces";

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
					<MenuBar />

					<hr className="w-full border-[0.5px] border-gray-200" />

					<div className="flex flex-row w-full gap-8 h-fit">
						<div className="flex flex-col w-2/3">
							<QuizList
								category={Category.IELTS}
								skill={Skill.LISTENING}
							/>
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
