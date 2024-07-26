import { setStartNumber, TestDataRecieve2Test } from "@/app/interface/quiz";
import { useTestData } from "../../provider/TestDataProvider";
import { TestOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";

export default function ReadingMenuBar() {
	const { sid } = useAuth();
	const { quizList, setQuizList, currentTest } = useTestData();

	const onSave = () => {
		let newQuizList = setStartNumber(quizList);

		// Save to server
		const testOperation = new TestOperation();
		const newUpdateTest = TestDataRecieve2Test(currentTest, newQuizList);

		console.log(newUpdateTest);
		testOperation
			.update(
				currentTest.id as any,
				{
					files: [] as any,
					data: newUpdateTest as any,
				},
				sid
			)
			.then((response) => {
				console.log(response);
				if (response.success == true) {
					alert("Save successfully");
				} else {
					alert("Save failed");
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
				className="px-1 ml-auto rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				print test
			</span>
		</div>
	);
}
