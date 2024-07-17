import { Category, QuizType, Skill } from "./interfaces";

export interface FillingQuiz {
	id?: string;
	description: string;
	answer: string;
	explaination: string;
}

export interface FillingGroup {
	id?: string;
	type: QuizType.FILLING;
	question: string;
	startFrom: Number;
	quizzes: FillingQuiz[];
	quizId?: string;
}

export interface MultipleChoiceQuiz {
	id?: string;
	description: string;
	options: string[];
	answer: string[];
	numOfAnswers: number;
	explaination: string;
}

export interface MultipleChoiceGroup {
	id?: string;
	type: QuizType.MULTIPLE_CHOICE;
	question: string;
	startFrom: Number;
	quizzes: MultipleChoiceQuiz[];
	quizId?: string;
}

export interface Quiz {
	id?: string;
	content: string;
	category: Category;
	tag: string;
	skill: Skill;
	groups: (MultipleChoiceGroup | FillingGroup)[];
}

export interface Test {
	name: string;
	id?: string;
	reading: Quiz[];
	listening: Quiz[];
	writing: Quiz[];
	speaking: Quiz[];
}

export const getQuestionNumber = (
	quizList: Quiz[],
	quizIndex: number,
	quizGroupIndex: number,
	multipleChoiceIndex: number
) => {
	let count = 0;
	for (let i = 0; i < quizIndex; i++) {
		for (let j = 0; j < quizList[i].groups.length; j++) {
			count += quizList[i].groups[j].quizzes.length;
		}
	}
	for (let i = 0; i < quizGroupIndex; i++) {
		count += quizList[quizIndex].groups[i].quizzes.length;
	}

	return count + multipleChoiceIndex + 1;
};

export interface QuizDataRecieve {
	id: string;
	category: string;
	tag: string;
	content: string;
	skill: string;
	order: string[];
	createdAt: string;
	updatedAt: string;
	multipleChoiceQuiz: {
		id: string;
		question: string;
		startFrom: number;
		order: string[];
		quizId: string;
		createdAt: string;
		updatedAt: string;
		quizzes: {
			id: string;
			description: string;
			options: string[];
			answer: string[];
			numOfAnswers: number;
			explaination: string;
			groupId: string;
			createdAt: string;
			updatedAt: string;
		}[];
	}[];
	fillingQuiz: {
		id: string;
		question: string;
		startFrom: number;
		order: string[];
		quizId: string;
		createdAt: string;
		updatedAt: string;
		quizzes: {
			id: string;
			description: string;
			answer: string;
			explaination: string;
			groupId: string;
			createdAt: string;
			updatedAt: string;
		}[];
	}[];
}
export interface TestDataRecieve {
	id: string;
	createAt: string;
	updatedAt: string;
	reading: QuizDataRecieve[];
	listening: QuizDataRecieve[];
	writing: QuizDataRecieve[];
	speaking: QuizDataRecieve[];
}

export function quizDataRecieve2Quiz(data: QuizDataRecieve): Quiz {
	let newQuiz = {
		id: data.id,
		content: data.content,
		category: data.category,
		tag: data.tag,
		skill: data.skill,
		groups: [],
	} as Quiz;

	//merge multiple choice quiz with filling quiz using order
	let order = data.order;
	for (let i = 0; i < order.length; i++) {
		//find the quiz with the id in order
		let quizId = order[i];
		for (let j = 0; j < data.multipleChoiceQuiz.length; j++) {
			if (data.multipleChoiceQuiz[j].id == quizId) {
				newQuiz.groups.push({
					id: data.multipleChoiceQuiz[j].id,
					type: QuizType.MULTIPLE_CHOICE,
					question: data.multipleChoiceQuiz[j].question,
					startFrom: data.multipleChoiceQuiz[j].startFrom,
					quizId: data.multipleChoiceQuiz[j].quizId,
					quizzes: data.multipleChoiceQuiz[j].quizzes.map((quiz) => {
						return {
							id: quiz.id,
							description: quiz.description,
							options: quiz.options,
							answer: quiz.answer,
							numOfAnswers: quiz.numOfAnswers,
							explaination: quiz.explaination,
						} as MultipleChoiceQuiz;
					}),
				} as MultipleChoiceGroup);
				continue;
			}
		}
		for (let j = 0; j < data.fillingQuiz.length; j++) {
			if (data.fillingQuiz[j].id == quizId) {
				newQuiz.groups.push({
					id: data.fillingQuiz[j].id,
					type: QuizType.FILLING,
					question: data.fillingQuiz[j].question,
					startFrom: data.fillingQuiz[j].startFrom,
					quizId: data.fillingQuiz[j].quizId,
					quizzes: data.fillingQuiz[j].quizzes.map((quiz) => {
						return {
							id: quiz.id,
							description: quiz.description,
							answer: quiz.answer,
							explaination: quiz.explaination,
						} as FillingQuiz;
					}),
				} as FillingGroup);
			}
		}
	}
	return newQuiz;
}

export function TestDataRecieve2Test(data: TestDataRecieve): Test {
	let newTest = {
		id: data.id,
		name: data.id,
		reading: data.reading.map((quizData) => {
			return quizDataRecieve2Quiz(quizData);
		}),
		listening: data.listening.map((quizData) => {
			return quizDataRecieve2Quiz(quizData);
		}),
		writing: data.writing.map((quizData) => {
			return quizDataRecieve2Quiz(quizData);
		}),
		speaking: data.speaking.map((quizData) => {
			return quizDataRecieve2Quiz(quizData);
		}),
	} as Test;
	return newTest;
}
