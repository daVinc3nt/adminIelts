import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useContext, // Import useContext
} from "react";

interface QuizContextType {}

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuizData = () => {
	const context = useContext(QuizContext);
	if (!context) {
		throw new Error("useQuizData must be used within a QuizProvider");
	}
	return context;
};

export const QuizDataProvider = ({ children }: { children: ReactNode }) => {
	return <QuizContext.Provider value={{}}>{children}</QuizContext.Provider>;
};
