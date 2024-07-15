import { QuizType } from "./interfaces";

export interface FillingQuiz {
	description: string;
	answer: string;
	explaination: string;
}

export interface FillingGroup {
	type: QuizType;
	question: String;
	startFrom: Number;
	quizzes: FillingQuiz[];
	quizId: string;
}
