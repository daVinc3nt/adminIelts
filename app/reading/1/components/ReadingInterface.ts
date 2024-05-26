export interface ReadingTest {
	readingTestID: string;
	numberOfQuestion: number;
	duration: number;
	partList: Part[];
}

export interface Part {
	partNumber: number;
	startQuestion: number;
	endQuestion: number;
	title?: string;
	paragraph?: string;
	groupList: QuestionGroup[];
}

export interface QuestionGroup {
	startQuestion: number;
	endQuestion: number;
	description: string;
	paragraph?: string;
	questionList: Question[];
}

export enum QuestionType {
	True_Fasle,
	Multiple_Choice,
	Fill,
	Match_Heading,
}

export interface Question {
	questionType: QuestionType;
	questionNumber: number;
}

export interface True_False_Question extends Question {
	questionType: QuestionType.True_Fasle;
	questionNumber: number;
	question: string;
}

export interface Multiple_Choice_Question extends Question {
	questionType: QuestionType.Multiple_Choice;
	questionNumber: number;
	question: string;
	choice: string[];
	numberOfChoice: number;
	numberOfAnswer: number;
}

export interface Fill_Question extends Question {
	questionType: QuestionType.Fill;
	questionNumber: number;
	question?: string;
}
