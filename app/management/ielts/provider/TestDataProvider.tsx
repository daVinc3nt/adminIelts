import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect, // Import useContext
} from "react";
import { Quiz, Test, TestDataRecieve } from "@/app/interface/quiz";
import { Category, Skill } from "@/app/interface/interfaces";

interface TestContextType {
	quizList: Quiz[];
	setQuizList: Dispatch<SetStateAction<Quiz[]>>;
	currentQuizIndex: number;
	setCurrentQuizIndex: Dispatch<SetStateAction<number>>;
	currentTest: TestDataRecieve;
	setCurrentTest: Dispatch<SetStateAction<TestDataRecieve>>;
}

const TestContext = createContext<TestContextType | null>(null);

export const useTestData = () => {
	const context = useContext(TestContext);
	if (!context) {
		throw new Error("useTestData must be used within a QuizProvider");
	}
	return context;
};

export const TestDataProvider = ({ children }: { children: ReactNode }) => {
	const [quizList, setQuizList] = useState<Quiz[]>([]);

	const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

	const [currentTest, setCurrentTest] = useState<TestDataRecieve | null>(
		null
	);

	return (
		<TestContext.Provider
			value={{
				quizList,
				setQuizList,
				currentQuizIndex,
				setCurrentQuizIndex,
				currentTest,
				setCurrentTest,
			}}>
			{children}
		</TestContext.Provider>
	);
};
