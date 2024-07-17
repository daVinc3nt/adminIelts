import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect, // Import useContext
} from "react";
import { FillingGroup, MultipleChoiceGroup, Quiz } from "@/app/interface/quiz";
import { Category, Skill } from "@/app/interface/interfaces";

interface QuizContextType {
	quizList: Quiz[];
	setQuizList: Dispatch<SetStateAction<Quiz[]>>;
	currentQuizIndex: number;
	setCurrentQuizIndex: Dispatch<SetStateAction<number>>;
	addQuiz: (newQuiz: Quiz) => void;
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
			id: undefined,
			content: "bla 1",
			category: Category.IELTS,
			tag: "",
			skill: Skill.READING,
			groups: [],
		},
		{
			id: undefined,
			content: "bla 2",
			category: Category.IELTS,
			tag: "",
			skill: Skill.READING,
			groups: [],
		},
	]);
	const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

	const addQuiz = (newQuiz: Quiz) => {
		setQuizList([...quizList, newQuiz]);
	};

	return (
		<QuizContext.Provider
			value={{
				quizList,
				setQuizList,
				currentQuizIndex,
				setCurrentQuizIndex,
				addQuiz,
			}}>
			{children}
		</QuizContext.Provider>
	);
};
