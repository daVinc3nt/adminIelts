export interface ReadingTestInterface {
	readingTestID: string;
	numberOfQuestion: number;
	duration: number;
	numberOfPart: number;
	partList: PartInterface[];
}

export interface PartInterface {
	partNumer: number;
	startQuestion: number;
	endQuestion: number;
	title: string;
	paragraph: string;
	sectionList: SectionInterface[];
}

export interface SectionInterface {
	sectionType: string;
	startQuestion: number;
	endQuestion: number;
}

// True false section
export interface TFSectionInterface extends SectionInterface {
	sectionType: string;
	decription: string;
	startQuestion: number;
	endQuestion: number;
	questionList: TFQuestionInterface[];
}

export interface TFQuestionInterface {
	question: string;
	questionNumber: number;
}

// Multiple choice section
export interface MCSectionInterface extends SectionInterface {
	sectionType: string;
	decription: string;
	startQuestion: number;
	endQuestion: number;
	questionList: MCQuestionInterface[];
}

export interface MCQuestionInterface {
	question: string;
	questionNumber: number;
	choiceA: string;
	choiceB: string;
	choiceC: string;
	choiceD: string;
}

// Fill section, Match heading
export interface FSectionInterface extends SectionInterface {
	sectionType: string;
	decription: string;
	paragraph: string;
	startQuestion: number;
	endQuestion: number;
	question: string[];
}
