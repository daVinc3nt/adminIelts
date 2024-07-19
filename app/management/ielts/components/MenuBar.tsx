import { useQuizData } from "../provider/QuizDataProvider";
import { CreateQuiz, UpdateQuiz } from "@/app/interface/interfaces";
import { QuizOperation } from "@/app/interface/main";

export default function ReadingMenuBar() {
	const { quizList, setQuizList } = useQuizData();

	const onSave = () => {
		let newQuizList = [...quizList];

		// Save to server
		newQuizList.forEach((quiz) => {
			const quizOperation = new QuizOperation();

			if (quiz.id) {
				quizOperation
					.update(quiz.id as any, quiz as UpdateQuiz, testToken)
					.then((response) => {
						console.log(response);
					});
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
