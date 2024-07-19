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

interface QuizContextType {
	quizList: Quiz[];
	setQuizList: Dispatch<SetStateAction<Quiz[]>>;
	currentQuizIndex: number;
	setCurrentQuizIndex: Dispatch<SetStateAction<number>>;
	currentTest: TestDataRecieve;
	setCurrentTest: Dispatch<SetStateAction<TestDataRecieve>>;
}

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuizData = () => {
	const context = useContext(QuizContext);
	if (!context) {
		throw new Error("useQuizData must be used within a QuizProvider");
	}
	return context;
};

export const QuizDataProvider = ({ children }: { children: ReactNode }) => {
	const [quizList, setQuizList] = useState<Quiz[]>([
		{
			content: "",
			category: Category.IELTS,
			tag: "",
			skill: Skill.READING,
			groups: [],
		},
	]);

	const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

	const [currentTest, setCurrentTest] = useState<TestDataRecieve | null>(
		null
	);

	return (
		<QuizContext.Provider
			value={{
				quizList,
				setQuizList,
				currentQuizIndex,
				setCurrentQuizIndex,
				currentTest,
				setCurrentTest,
			}}>
			{children}
		</QuizContext.Provider>
	);
};
