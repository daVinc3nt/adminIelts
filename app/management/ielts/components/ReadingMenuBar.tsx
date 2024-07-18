import {
	getQuestionNumber,
	Quiz,
	QuizDataRecieve,
	quizDataRecieve2Quiz,
} from "@/app/interface/quiz";
import { useQuizData } from "../provider/QuizDataProvider";
import { CreateQuiz, UpdateQuiz } from "@/app/interface/interfaces";
import { QuizOperation } from "@/app/interface/main";

export default function ReadingMenuBar() {
	const { quizList, setQuizList } = useQuizData();

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

		// Save to server
		newQuizList.forEach((quiz) => {
			const quizOperation = new QuizOperation();

			if (quiz.id) {
				quizOperation
					.update(quiz.id as any, quiz as UpdateQuiz, testToken)
					.then((data) => {
						console.log(data);
						if (data.data && data.data.reading) {
							const quizData = data.data
								.reading as QuizDataRecieve[];
							let quizList: Quiz[] = [];
							quizData.forEach((quizdata) => {
								const quiz = quizDataRecieve2Quiz(quizdata);
								quizList.push(quiz);
							});
							setQuizList(quizList);
						}
					});
			} else {
				console.log("Create new quiz", JSON.stringify(quiz));
			}
		});

		setQuizList(newQuizList);
	};

	return (
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
	);
}

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
