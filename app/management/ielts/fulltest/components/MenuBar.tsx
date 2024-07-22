import { setStartNumber, TestDataRecieve2Test } from "@/app/interface/quiz";
import { useQuizData } from "../../provider/QuizDataProvider";
import { QuizOperation, TestOperation } from "@/app/interface/main";

export default function ReadingMenuBar() {
	const { quizList, setQuizList, currentTest } = useQuizData();

	const onSave = () => {
		let newQuizList = setStartNumber(quizList);

		// Save to server
		const testOperation = new TestOperation();
		const newUpdateTest = TestDataRecieve2Test(currentTest, newQuizList);

		console.log(newUpdateTest);
		testOperation
			.update(currentTest.id as any, newUpdateTest, testToken)
			.then((response) => {
				console.log(response);
				if (response.success == true) {
					alert("Save successfully");
				}
			});
	};

	const print = () => {
		let newQuizList = [...quizList];
		console.log(
			JSON.stringify(
				TestDataRecieve2Test(currentTest, setStartNumber(newQuizList))
			)
		);
		setQuizList(newQuizList);
	};

	return (
		<div className="flex flex-row gap-2 cursor-pointer">
			<span
				onClick={() => onSave()}
				className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				Save & exit
			</span>
			<span
				onClick={() => onSave()}
				className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				Save
			</span>
			<span className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				Edit test detail
			</span>
			<span
				onClick={() => print()}
				className="ml-auto px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				print test
			</span>
		</div>
	);
}

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
