"use client";
import { TestDataProvider, useTestData } from "../../provider/TestDataProvider";
import QuizContent from "../../components/QuizContent";
import QuizGroup from "../../components/QuizGroup";
import { Fragment, useEffect } from "react";
import { QuizDataRecieve, quizDataRecieve2Quiz } from "@/app/interface/quiz";
import MenuBar from "../components/MenuBar";
import { TestOperation } from "@/app/lib/main";
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
	const {
		quizList,
		currentQuizIndex,
		setQuizList,
		currentTest,
		setCurrentTest,
	} = useTestData();

	useEffect(() => {
		const testOperation = new TestOperation();
		testOperation.findOne(id as any, testToken).then((response) => {
			if (!response.data) return null;

			console.log(response.data);
			let newTest = {
				id: response.data.id,
				name: response.data.name,
			};
			setCurrentTest(newTest);

			let quizList: Quiz[] = [];
			if (response.data.reading) {
				const quizData = response.data.reading as QuizDataRecieve[];
				quizData.forEach((quizdata) => {
					const quiz = quizDataRecieve2Quiz(quizdata);
					quizList.push(quiz);
				});
			}
			if (response.data.listening) {
				const quizData = response.data.listening as QuizDataRecieve[];
				quizData.forEach((quizdata) => {
					const quiz = quizDataRecieve2Quiz(quizdata);
					quizList.push(quiz);
				});
			}
			if (response.data.writing) {
				const quizData = response.data.writing as QuizDataRecieve[];
				quizData.forEach((quizdata) => {
					const quiz = quizDataRecieve2Quiz(quizdata);
					quizList.push(quiz);
				});
			}
			if (response.data.speaking) {
				const quizData = response.data.speaking as QuizDataRecieve[];
				quizData.forEach((quizdata) => {
					const quiz = quizDataRecieve2Quiz(quizdata);
					quizList.push(quiz);
				});
			}
			setQuizList(quizList);
		});
	}, []);

	const onChangeName = (e: any) => {
		let newTest = { ...currentTest };
		newTest.name = e.target.value;
		setCurrentTest(newTest);
	};

	return (
		<main className="flex items-center justify-center flex-1">
			<div className="flex flex-col items-center w-11/12 min-h-screen gap-4 py-4">
				<div className="flex flex-col w-full gap-1 h-fit">
					<MenuBar />

					<hr className="w-full border-[0.5px] border-gray-200 dark:border-gray-400" />

					<div className="flex flex-col w-full gap-2 h-fit pt-2 font-bold">
						<input
							value={
								currentTest
									? currentTest.name
										? currentTest.name
										: ""
									: ""
							}
							onChange={onChangeName}
							className="w-full h-fit px-4 py-1 text-2xl bg-white dark:bg-pot-black focus:ring-0 focus:outline-none duration-200"
							placeholder="Enter your test name"
						/>

						<QuizList />
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
											<QuizContent quizIndex={index} />
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
