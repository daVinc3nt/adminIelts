import { Category, QuizType, Skill, UpdateTest } from "../lib/interfaces";

// Quiz Interface
interface FQuiz {
	id?: string;
	description: string;
	answer: string[];
	explaination: string;
}

interface MCQuiz {
	id?: string;
	description: string;
	options: string[];
	answer: string[];
	numOfAnswers: number;
	explaination: string;
}

//Group Interface
interface FGroup {
	id?: string;
	type: QuizType.FILLING;
	question: string;
	startFrom: Number;
	quizzes: FQuiz[];
}

interface MCGroup {
	id?: string;
	type: QuizType.MULTIPLE_CHOICE;
	question: string;
	startFrom: Number;
	quizzes: MCQuiz[];
}

// Quiz Interface
interface Quiz {
	id?: string;
	content: string;
	category: Category;
	skill: Skill;
	tags: Tag[];
	groups: (MCGroup | FGroup)[];
}

// Test Interface
export interface Test {
	name: string;
	id?: string;
	reading: Quiz[];
	listening: Quiz[];
	writing: Quiz[];
	speaking: Quiz[];
}

/*----------------------------------------------------------------------------*/
