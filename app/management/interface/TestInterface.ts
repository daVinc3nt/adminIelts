export interface TestInterface {
	testID: string;
	testName: string;
	numberOfQuestion: number;
	duration: number;
	partList: PartInterface[];
}

export interface PartInterface {
	partNumber: number;
	startQuestion: number;
	endQuestion: number;
	paragraph?: string;
	groupList: QuestionGroupInterface[];
}

export interface QuestionGroupInterface {
	startQuestion: number;
	endQuestion: number;
	description: string;
	questionList: QuestionInterface[];
}

export enum QuestionType {
	True_Fasle,
	Multiple_Choice,
	Fill,
	Match_Heading,
}

export interface QuestionInterface {
	questionType: QuestionType;
	questionNumber: number;
}

export interface True_False_Question extends QuestionInterface {
	questionType: QuestionType.True_Fasle;
	questionNumber: number;
	question: string;
}

export interface Multiple_Choice_Question extends QuestionInterface {
	questionType: QuestionType.Multiple_Choice;
	questionNumber: number;
	question: string;
	choice: string[];
	numberOfChoice: number;
	numberOfAnswer: number;
}

export interface Fill_Question extends QuestionInterface {
	questionType: QuestionType.Fill;
	questionNumber: number;
	question?: string;
}
