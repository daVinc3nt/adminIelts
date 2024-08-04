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
	id?: string;
	testId?: string;
	name?: string;
	isPractice?: boolean;
	completeReading?: boolean;
	completeListening?: boolean;
	completeWriting?: boolean;
	completeSpeaking?: boolean;

	createdAt?: string;
	updatedAt?: string;
	score?: number;

	reading?: RecordQuiz[];
	readingAmount?: number;
	readingCompletedQuizzes?: number;
	readingCorrectAnswers?: number;
	readingDuration?: number;
	readingUncompletedQuizzes?: number;
	readingWrongAnswers?: number;

	listening?: RecordQuiz[];
	listeningAmount?: number;
	listeningCompletedQuizzes?: number;
	listeningCorrectAnswers?: number;
	listeningDuration?: number;
	listeningUncompletedQuizzes?: number;
	listeningWrongAnswers?: number;

	writing?: RecordQuiz[];
	writingAmount?: number;
	writingCompletedQuizzes?: number;
	writingCorrectAnswers?: number;
	writingDuration?: number;
	writingUncompletedQuizzes?: number;

	speaking?: RecordQuiz[];
	speakingAmount?: number;
	speakingCompletedQuizzes?: number;
	speakingCorrectAnswers?: number;
	speakingDuration?: number;
	speakingUncompletedQuizzes?: number;
	speakingWrongAnswers?: number;
}
