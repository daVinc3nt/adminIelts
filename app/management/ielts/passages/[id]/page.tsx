"use client";
import { TestDataProvider, useTestData } from "../../provider/TestDataProvider";
import QuizContent from "../../components/QuizContent";
import QuizGroup from "../../components/QuizGroup";
import { Fragment, useEffect } from "react";
import { QuizDataRecieve, quizDataRecieve2Quiz } from "@/app/interface/quiz";
import MenuBar from "../components/MenuBar";
import { QuizOperation, TestOperation } from "@/app/lib/main";
import { Quiz } from "@/app/interface/quiz";
import QuizList from "../components/QuizList";
import { Skill } from "@/app/lib/interfaces";
import WritingQuizGroup from "../../components/WritingQuizGroup";
import SpeakingQuizGroup from "../../components/SpeakingQuizGroup";

export default function Page({ params }: { params: { id: string } }) {
	return (
		<TestDataProvider>
			<QuizManagement id={params.id} />
		</TestDataProvider>
	);
}

interface QuizManagementProps {
	id: string;
}

function QuizManagement({ id }: QuizManagementProps) {
	const { quizList, currentQuizIndex, setQuizList } = useTestData();

	useEffect(() => {
		const quizOperation = new QuizOperation();
		quizOperation.findOne(id as any, testToken).then((response) => {
			if (!response.data) {
				setQuizList(null);
				return;
			}

			console.log(response.data);

			setQuizList([quizDataRecieve2Quiz(response.data)]);
		});
	}, []);

	return (
		<main className="flex items-center justify-center flex-1">
			{quizList ? (
				<div className="flex flex-col items-center w-11/12 min-h-screen gap-4 py-4">
					<div className="flex flex-col w-full gap-1 h-fit">
						<MenuBar />

						<hr className="w-full border-[0.5px] border-gray-200" />

						<div className="flex flex-row w-full gap-8 h-fit">
							<div className="flex flex-col w-2/3">
								<QuizList oneQuiz />
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
										<div
											key={index}
											className="w-2/3 h-fit">
											<QuizGroup quizIndex={index} />
										</div>
									);
								case Skill.WRITING:
									return (
										<div
											key={index}
											className="w-2/3 h-fit">
											<WritingQuizGroup
												quizIndex={index}
											/>
										</div>
									);
								case Skill.SPEAKING:
									return (
										<div
											key={index}
											className="w-2/3 h-fit">
											<SpeakingQuizGroup
												quizIndex={index}
											/>
										</div>
									);
							}
						})}
					</div>
				</div>
			) : (
				<div className="w-full h-full flex justify-center items-center">
					Passage don't exist
				</div>
			)}
		</main>
	);
}

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
