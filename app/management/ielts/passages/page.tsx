"use client";
import { QuizDataProvider, useQuizData } from "../provider/QuizDataProvider";
import QuizContent from "../components/QuizContent";
import QuizGroup from "../components/QuizGroup";
import { Fragment, useEffect } from "react";
import { QuizDataRecieve, quizDataRecieve2Quiz } from "@/app/interface/quiz";
import MenuBar from "./components/MenuBar";
import { TestOperation } from "@/app/interface/main";
import { Quiz } from "@/app/interface/quiz";
import QuizList from "./components/QuizList";
import { Skill } from "@/app/interface/interfaces";
import WritingQuizGroup from "../components/WritingQuizGroup";
import SpeakingQuizGroup from "../components/SpeakingQuizGroup";

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
							<QuizList />
						</div>

						<div className="flex-1 m-1"></div>
					</div>
				</div>

				<div className="flex flex-row w-full gap-8 h-fit justify-center">
					{quizList.map((quiz, index) => {
						if (index != currentQuizIndex) return null;

						switch (quiz.skill) {
							case Skill.READING:
								return (
									<Fragment key={index}>
										<div className="w-1/2 h-fit">
											<QuizContent
												quizIndex={index}
												oneQuiz
											/>
										</div>
										<div className="w-1/2 h-fit">
											<QuizGroup quizIndex={index} />
										</div>
									</Fragment>
								);
							case Skill.LISTENING:
								return (
									<div key={index} className="w-2/3 h-fit">
										<QuizGroup quizIndex={index} />
									</div>
								);
							case Skill.WRITING:
								return (
									<div key={index} className="w-2/3 h-fit">
										<WritingQuizGroup quizIndex={index} />
									</div>
								);
							case Skill.SPEAKING:
								return (
									<div key={index} className="w-2/3 h-fit">
										<SpeakingQuizGroup quizIndex={index} />
									</div>
								);
						}
					})}
				</div>
			</div>
		</main>
	);
}

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
