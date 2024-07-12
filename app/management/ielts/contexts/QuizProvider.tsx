import { Quiz } from "@/app/interface/quizInterface/Quiz";
import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useContext, // Import useContext
} from "react";

interface QuizContextType {
	quizs: Quiz[];
	setQuizs: Dispatch<SetStateAction<Quiz[]>>;
	currentQuiz: number;
	setCurrentQuiz: Dispatch<SetStateAction<number>>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuizData = () => {
	const context = useContext(QuizContext);
	if (!context) {
		throw new Error("useQuizData must be used within a QuizProvider");
	}
	return context;
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
	const [quizs, setQuizs] = useState<Quiz[]>([
		{ content: "", filling: [], multipleChoice: [] },
	]);
	const [currentQuiz, setCurrentQuiz] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<QuizContext.Provider
			value={{
				quizs,
				setQuizs,
				currentQuiz,
				setCurrentQuiz,
				isLoading,
				setIsLoading,
			}}>
			{children}
		</QuizContext.Provider>
	);
};
