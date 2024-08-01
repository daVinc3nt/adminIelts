import { Category, Skill } from "../../lib/interfaces";
export interface RecordInfor {
	id: string;
	accountId: string;
	account: {
		firstName: string;
		lastName: string;
		username: string;
	};
	testId: string;
	readingDuration: number;
	listeningDuration: number;
	writingDuration: number;
	speakingDuration: number;
	readingAmount: number;
	listeningAmount: number;
	writingAmount: number;
	speakingAmount: number;
	completeReading: boolean;
	completeListening: boolean;
	completeWriting: boolean;
	completeSpeaking: boolean;
	score: number;
	createdAt: string;
	updatedAt: string;
}
//Question
export interface RecordMCQuestion {
	id: string;
	description: string;
	options: string[];
	answer: string[];
	numOfAnswers: number;
	explaination: string;
	groupId: string;
	createdAt: string;
	updatedAt: string;
	answerId: string;
	score: number;
	userAnswer: string[];
}

export interface RecordFQuestion {
	id: string;
	description: string;
	answer: string[];
	explaination: string;
	groupId: string;
	createdAt: string;
	updatedAt: string;
	answerId: string;
	score: number;
	userAnswer: string[];
}

//Group
export interface RecordMCGroup {
	id: string;
	question: string;
	startFrom: number;
	linkToTest: boolean;
	order: string[];
	quizId: string;
	createdAt: string;
	updatedAt: string;
	quizzes: RecordMCQuestion[];
}

export interface RecordFGroup {
	id: string;
	question: string;
	startFrom: number;
	linkToTest: boolean;
	order: string[];
	quizId: string;
	createdAt: string;
	updatedAt: string;
	quizzes: RecordFQuestion[];
}

export interface RecordQuiz {
	id: string;
	category: Category;
	linkToTest: boolean;
	filePath: string;
	content: string;
	skill: Skill;
	order: string[];
	createdAt: string;
	updatedAt: string;
	multipleChoiceQuiz: RecordMCGroup[];
	fillingQuiz: RecordFGroup[];
}

export interface RecordTest {
	id: string;
	name: string;
	isPractice: boolean;
	createdAt: string;
	updatedAt: string;
	score: number;
	reading: RecordQuiz[];
	listening: RecordQuiz[];
	writing: RecordQuiz[];
	speaking: RecordQuiz[];
}
