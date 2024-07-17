"use client";
import { QuizDataProvider, useQuizData } from "../../provider/QuizDataProvider";
import QuizList from "../../components/QuizList";
import QuizContent from "../../components/QuizContent";
import QuizGroup from "../../components/QuizGroup";
import { Fragment, useEffect } from "react";
import { getQuestionNumber, quizDataRecieve2Quiz } from "@/app/interface/quiz";

export default function Page() {
	return (
		<QuizDataProvider>
			<QuizManagement />
		</QuizDataProvider>
	);
}

function QuizManagement() {
	const { quizList, currentQuizIndex, setQuizList } = useQuizData();

	useEffect(() => {
		const newQuizList = [];
		newQuizList.push(quizDataRecieve2Quiz(data));
		setQuizList(newQuizList);
	}, []);

	const onSave = () => {
		let newQuizList = [...quizList];
		newQuizList.forEach((quiz, quizindex) => {
			quiz.groups.forEach((group, groupIndex) => {
				group.startFrom = getQuestionNumber(
					newQuizList,
					quizindex,
					groupIndex,
					0
				);
			});
		});
		console.log(newQuizList);
		setQuizList(newQuizList);
	};

	return (
		<main className="flex items-center justify-center flex-1">
			<div className="flex flex-col items-center w-11/12 min-h-screen gap-4 py-4">
				<div className="flex flex-col w-full gap-1 h-fit">
					<div className="flex flex-row gap-2 cursor-pointer">
						<span
							onClick={() => onSave()}
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

				<div className="flex flex-row w-full gap-8 h-fit">
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

const data = {
	id: "f6c113a6-4a5a-423e-b666-92845f9b5054",
	category: "IELTS",
	tag: "LISTENING BASIC",
	content:
		"One of the most famous works of art in the world is Leonardo da Vinci’s Mona Lisa. Nearly everyone who goes to see the original will already be familiar with it from reproductions, but they accept that fine art is more rewardingly viewed in its original form. However, if Mona Lisa was a famous novel, few people would bother to go to a museum to read the writer’s actual manuscript rather than a printed reproduction. This might be explained by the fact that the novel has evolved precisely because of technological developments that made it possible to print out huge numbers of texts, whereas oil paintings have always been produced as unique objects. In addition, it could be argued that the practice of interpreting or ‘reading’ each medium follows different conventions. With novels, the reader attends mainly to the meaning of words rather than the way they are printed on the page, whereas the ‘reader’ of a painting must attend just as closely to the material form of marks and shapes in the picture as to any ideas they may signify.",
	skill: "LISTENING",
	order: [
		"dfb72118-d6a1-4d22-99c6-1fcf3d0144d0",
		"e145ce8d-7bef-4fe6-97a5-0c41717cd627",
	],
	createdAt: "2024-07-15T12:46:51.000Z",
	updatedAt: "2024-07-15T12:46:51.000Z",
	multipleChoiceQuiz: [
		{
			id: "e145ce8d-7bef-4fe6-97a5-0c41717cd627",
			question: null,
			startFrom: 0,
			order: [
				"74e1c4d4-36f4-47a1-b8f8-f4bf1ce43609",
				"99dce9b8-e45b-430b-8540-98d8c92bc6ee",
				"7536f899-d528-45cb-8d78-99106e223330",
				"76b12089-29cd-463f-bc1c-cb395e6f0592",
			],
			quizId: "9adf2dc2-c2c8-468d-bb72-68f44ad2d517",
			createdAt: "2024-07-14T14:24:54.000Z",
			updatedAt: "2024-07-14T14:24:54.000Z",
			quizzes: [
				{
					id: "74e1c4d4-36f4-47a1-b8f8-f4bf1ce43609",
					description: "According to the passage, Monalisa is :",
					options: [
						"Da Vinci's masterpiece",
						"One of the famous works of art",
						"Just another painting",
						"The only work on art",
					],
					answer: ["One of the famous works of art"],
					numOfAnswers: 1,
					explaination: "Right there",
					groupId: "e145ce8d-7bef-4fe6-97a5-0c41717cd627",
					createdAt: "2024-07-14T14:24:54.000Z",
					updatedAt: "2024-07-14T14:24:54.000Z",
				},
				{
					id: "7536f899-d528-45cb-8d78-99106e223330",
					description:
						"According to the passage, what is the difference between a novel and a painting?",
					options: [
						"No difference",
						"Novels are unique.",
						"Paintings are unique objects.",
						"None of the above",
					],
					answer: ["Paintings are unique objects."],
					numOfAnswers: 1,
					explaination: "Back in",
					groupId: "e145ce8d-7bef-4fe6-97a5-0c41717cd627",
					createdAt: "2024-07-14T14:24:54.000Z",
					updatedAt: "2024-07-14T14:24:54.000Z",
				},
				{
					id: "76b12089-29cd-463f-bc1c-cb395e6f0592",
					description:
						"What is the difference between reading a novel and a painting?",
					options: [
						"No difference",
						"In a novel, they have to carefully observe the way they are printed and in a painting it is just reading the meaning.",
						"In a painting, they have to carefully observe the way they are printed and in a novel it is just reading the meaning.",
						"None of the above",
					],
					answer: [
						"In a painting, they have to carefully observe the way they are printed and in a novel it is just reading the meaning.",
					],
					numOfAnswers: 1,
					explaination: "Back in",
					groupId: "e145ce8d-7bef-4fe6-97a5-0c41717cd627",
					createdAt: "2024-07-14T14:24:54.000Z",
					updatedAt: "2024-07-14T14:24:54.000Z",
				},
				{
					id: "99dce9b8-e45b-430b-8540-98d8c92bc6ee",
					description:
						"Why do people want to view art in its original form?",
					options: [
						"They can appreciate art better in its original form.",
						"They are tired of viewing duplicates.",
						"both A & B",
						"None of the above",
					],
					answer: [
						"They can appreciate art better in its original form.",
					],
					numOfAnswers: 1,
					explaination: "Right here",
					groupId: "e145ce8d-7bef-4fe6-97a5-0c41717cd627",
					createdAt: "2024-07-14T14:24:54.000Z",
					updatedAt: "2024-07-14T14:24:54.000Z",
				},
			],
		},
	],
	fillingQuiz: [
		{
			id: "dfb72118-d6a1-4d22-99c6-1fcf3d0144d0",
			question: null,
			startFrom: 0,
			order: [
				"db6f7bf5-7ddb-4c73-ba85-fd0d7ef867f8",
				"33ab2c8e-af7a-4cd5-b89c-eb739eded5a9",
				"8bd91b0c-7757-4330-8041-0a0b4dfc649d",
				"7f24f13d-a003-45c7-84e6-9a7a43b23769",
				"98b7191b-bd6f-4066-badc-7d576824f87d",
				"cf561a7b-9243-4fd6-ae89-657cfe1c0aea",
			],
			quizId: "f6c113a6-4a5a-423e-b666-92845f9b5054",
			createdAt: "2024-07-15T12:46:51.000Z",
			updatedAt: "2024-07-15T12:46:51.000Z",
			quizzes: [
				{
					id: "33ab2c8e-af7a-4cd5-b89c-eb739eded5a9",
					description: "",
					answer: "established",
					explaination: "Right there",
					groupId: "dfb72118-d6a1-4d22-99c6-1fcf3d0144d0",
					createdAt: "2024-07-15T12:46:51.000Z",
					updatedAt: "2024-07-15T12:46:51.000Z",
				},
				{
					id: "7f24f13d-a003-45c7-84e6-9a7a43b23769",
					description: "",
					answer: "predicted",
					explaination: "Right there",
					groupId: "dfb72118-d6a1-4d22-99c6-1fcf3d0144d0",
					createdAt: "2024-07-15T12:46:51.000Z",
					updatedAt: "2024-07-15T12:46:51.000Z",
				},
				{
					id: "8bd91b0c-7757-4330-8041-0a0b4dfc649d",
					description: "",
					answer: "increased",
					explaination: "Right there",
					groupId: "dfb72118-d6a1-4d22-99c6-1fcf3d0144d0",
					createdAt: "2024-07-15T12:46:51.000Z",
					updatedAt: "2024-07-15T12:46:51.000Z",
				},
				{
					id: "98b7191b-bd6f-4066-badc-7d576824f87d",
					description: "",
					answer: "passengers",
					explaination: "Right there",
					groupId: "dfb72118-d6a1-4d22-99c6-1fcf3d0144d0",
					createdAt: "2024-07-15T12:46:51.000Z",
					updatedAt: "2024-07-15T12:46:51.000Z",
				},
				{
					id: "cf561a7b-9243-4fd6-ae89-657cfe1c0aea",
					description: "",
					answer: "assault",
					explaination: "Right there",
					groupId: "dfb72118-d6a1-4d22-99c6-1fcf3d0144d0",
					createdAt: "2024-07-15T12:46:51.000Z",
					updatedAt: "2024-07-15T12:46:51.000Z",
				},
				{
					id: "db6f7bf5-7ddb-4c73-ba85-fd0d7ef867f8",
					description: "",
					answer: "incident",
					explaination: "Right there",
					groupId: "dfb72118-d6a1-4d22-99c6-1fcf3d0144d0",
					createdAt: "2024-07-15T12:46:51.000Z",
					updatedAt: "2024-07-15T12:46:51.000Z",
				},
			],
		},
	],
};
