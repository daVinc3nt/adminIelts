"use client";
import { Fragment, useEffect } from "react";
import TestProvider, { useTest } from "../provider/TestProvider";
import MenuBar from "../components/MenuBar";
import QuizContent from "../components/QuizContent";
import { Skill } from "@/app/lib/interfaces";
import QuizList from "../components/QuizList";
import QuizGroup from "../components/QuizGroup";
import WritingQuiz from "../components/WritingQuiz";
import SpeakingQuiz from "../components/SpeakingQuiz";
import PopupCreatePractice from "../components/CreatePractice/PopupCreatePractice";
import AudioPlayer from "../components/AudioPlayer";
import ScrollTopButton from "@/components/ScrollTopButton/ScrollTopButton";
import LoadingPage from "@/components/Page/LoadingPage";
import NotFoundPage from "@/components/Page/NotFoundPage";

export default function Page({ params }: { params: { id: string } }) {
	return (
		<TestProvider>
			<Test id={params.id} />
		</TestProvider>
	);
}

interface TestProps {
	id: string;
}

function Test({ id }: TestProps) {
	const {
		test,
		currentQuizIndex,
		currentSkill,
		isOpenCreateQuizPractice,
		hasPrivilege,
		onChangeTest,
		getTestById,
	} = useTest();

	useEffect(() => {
		getTestById(id);
	}, []);

	const onChangeName = (e: any) => {
		onChangeTest({ ...test, name: e.target.value });
	};

	if (!test) {
		return (
			<NotFoundPage
				message="Test not found"
				subMessage={`There are no test with id: ${id}`}
				backto="Back to ielts management"
				backtoLink="/management/ielts"
			/>
		);
	}

	if (test.id == "") {
		return <LoadingPage />;
	}

	return (
		<main className="relative flex flex-col items-center flex-1">
			<ScrollTopButton />
			{isOpenCreateQuizPractice && <PopupCreatePractice />}
			<div className="flex flex-col items-center w-11/12 min-h-screen gap-4 py-4">
				<div className="flex flex-col w-full gap-1 h-fit">
					{hasPrivilege && <MenuBar />}
					<div className="w-full pr-5">
						<hr className="w-full border-[0.5px] border-gray-200 dark:border-gray-400" />
					</div>
					<div className="flex flex-row items-center justify-between w-full">
						<div className="flex flex-col gap-1 w-[70%]">
							<QuizList />
							<div className="flex flex-row w-full gap-2 pt-2 h-fit items-center">
								<input
									value={test ? test.name : ""}
									disabled={!hasPrivilege}
									onChange={onChangeName}
									className="w-full px-4 py-1 text-xl bg-white rounded-md shadow-md outline-none h-fit dark:bg-pot-black ring-0"
									placeholder="Enter your test name"
								/>
								<input
									disabled={!hasPrivilege}
									className="w-40 px-4 py-1 text-xl bg-white rounded-md shadow-md outline-none h-fit dark:bg-pot-black ring-0"
									type="number"
									placeholder="Quiz duration"
								/>
								<span className="text-lg">sec</span>
							</div>
						</div>
						<div className="w-[25%] h-fit">
							{currentSkill == Skill.LISTENING && <AudioPlayer />}
						</div>
					</div>
				</div>

				<div className="flex flex-row justify-center w-full gap-8 h-fit">
					{test.reading.map((quiz, index) => {
						if (
							currentSkill !== Skill.READING ||
							currentQuizIndex != index
						)
							return null;
						return (
							<Fragment key={quiz.id + index}>
								<div className="w-1/2 h-fit">
									<QuizContent
										quizIndex={index}
										quizSkill={Skill.READING}
									/>
								</div>
								<div className="w-1/2 h-fit">
									<QuizGroup
										quizIndex={index}
										skill={Skill.READING}
									/>
								</div>
							</Fragment>
						);
					})}
					{test.listening.map((quiz, index) => {
						if (
							currentSkill !== Skill.LISTENING ||
							currentQuizIndex != index
						)
							return null;
						return (
							<Fragment key={quiz.id + index}>
								<div className="w-1/2 h-fit">
									<QuizContent
										quizIndex={index}
										quizSkill={Skill.LISTENING}
									/>
								</div>
								<div className="w-1/2 h-fit">
									<QuizGroup
										quizIndex={index}
										skill={Skill.LISTENING}
									/>
								</div>
							</Fragment>
						);
					})}
					{test.writing.map((quiz, index) => {
						if (
							currentSkill !== Skill.WRITING ||
							currentQuizIndex != index
						)
							return null;
						return (
							<Fragment key={quiz.id + index}>
								<div className="w-2/3 h-fit">
									<WritingQuiz
										quizIndex={index}
										skill={Skill.WRITING}
									/>
								</div>
							</Fragment>
						);
					})}
					{test.speaking.map((quiz, index) => {
						if (
							currentSkill !== Skill.SPEAKING ||
							currentQuizIndex != index
						)
							return null;
						return (
							<Fragment key={quiz.id + index}>
								<div className="w-2/3 h-fit">
									<SpeakingQuiz
										quizIndex={index}
										skill={Skill.SPEAKING}
									/>
								</div>
							</Fragment>
						);
					})}
				</div>
			</div>
		</main>
	);
}
