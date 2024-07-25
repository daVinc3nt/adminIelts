"use client";
import { QuizOperation, TestOperation } from "@/app/lib/main";
import { TestInfor, QuizInfor } from "@/app/interface/quiz";
import { useRouter } from "next/navigation";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface TestContextType {
	testList: TestInfor[];
	setTestList: Dispatch<SetStateAction<TestInfor[]>>;
	quizList: QuizInfor[];
	setQuizList: Dispatch<SetStateAction<QuizInfor[]>>;
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	handleChangePage: (
		event: React.ChangeEvent<unknown>,
		value: number
	) => void;
	fetchType: string;
	setFetchType: Dispatch<SetStateAction<string>>;
	searchPayload: {
		searchValue: string;
		searchField: string;
	};
	setSearchPayload: Dispatch<
		SetStateAction<{
			searchValue: string;
			searchField: string;
		}>
	>;
	skillType: string;
	setSkillType: Dispatch<SetStateAction<string>>;
	search: () => void;
	deleteTestOrQuiz: (id: string) => void;
	createTest: () => void;
	currentTest: TestInfor;
	setCurrentTest: Dispatch<SetStateAction<TestInfor>>;
}

const TestContext = createContext<TestContextType | null>(null);

export const useTestManagement = () => {
	const context = useContext(TestContext);
	if (!context) {
		throw new Error("useTestManagement must be used within a TestProvider");
	}
	return context;
};

export default function TestManagementProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [testList, setTestList] = useState<TestInfor[]>([]);
	const [quizList, setQuizList] = useState<QuizInfor[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [fetchType, setFetchType] = useState<string>("fulltest");
	const [skillType, setSkillType] = useState<string>("");

	const [currentTest, setCurrentTest] = useState<TestInfor>(null);

	const [searchPayload, setSearchPayload] = useState({
		searchValue: "",
		searchField: "name",
	});

	const router = useRouter();

	const search = () => {};

	const deleteTestOrQuiz = (id: string) => {
		const newTestOperation = new TestOperation();
		const newQuizOperation = new QuizOperation();

		if (fetchType == "fulltest") {
			newTestOperation.delete(id as any, testToken).then((response) => {
				if (response.success) {
					alert("Delete successfully");
					const newTestList = [];
					testList.forEach((test) => {
						if (test.id != id) {
							newTestList.push(test);
						}
					});
					setTestList(newTestList);
				} else {
					alert("Delete failed");
				}
			});
		} else {
			newQuizOperation.delete(id as any, testToken).then((response) => {
				if (response.success) {
					alert("Delete successfully");
					const newQuizList = [];
					quizList.forEach((quiz) => {
						if (quiz.id != id) {
							newQuizList.push(quiz);
						}
					});
					setQuizList(newQuizList);
				} else {
					alert("Delete failed");
				}
			});
		}
	};

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setCurrentPage(value);
	};

	const createTest = () => {
		const newTestOperation = new TestOperation();
		newTestOperation
			.createFullTest(
				{
					files: [] as any,
					data: {
						name: "New test",
						reading: [],
						listening: [],
						writing: [],
						speaking: [],
					},
				},
				testToken
			)
			.then((res) => {
				console.log(res);
				if (res.success) {
					console.log(res.data);
					// router.push(`/management/ielts/fulltest/${res.data.id}`);
				} else {
					alert("Create failed");
				}
			});
		// .create(
		// 	{
		// 		name: "New test",
		// 		reading: [],
		// 		listening: [],
		// 		writing: [],
		// 		speaking: [],
		// 	},
		// 	testToken
		// )
		// .then((response) => {
		// 	if (response.success) {
		// 		router.push(
		// 			`/management/ielts/fulltest/${response.data.id}`
		// 		);
		// 	} else {
		// 		alert("Create failed");
		// 	}
		// });
	};

	return (
		<TestContext.Provider
			value={{
				testList,
				setTestList,
				quizList,
				setQuizList,
				currentPage,
				setCurrentPage,
				handleChangePage,
				fetchType,
				setFetchType,
				searchPayload,
				setSearchPayload,
				skillType,
				setSkillType,
				search,
				deleteTestOrQuiz,
				createTest,
				currentTest,
				setCurrentTest,
			}}>
			{children}
		</TestContext.Provider>
	);
}

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";