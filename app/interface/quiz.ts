import { Category, QuizType, Skill, UpdateTest } from "../lib/interfaces";

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
}

export interface Quiz {
	id?: string;
	content: string;
	category: Category;
	tags: Tag[];
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

export const getQuestionGroupNumber = (
	quizList: Quiz[],
	quizIndex: number,
	quizGroupIndex: number,
	skill: Skill
) => {
	let count = 0;
	for (let i = 0; i < quizIndex; i++) {
		if (quizList[i].skill != skill) continue;
		count += quizList[i].groups.length;
	}
	return count + quizGroupIndex + 1;
};

export const getQuestionNumber = (
	quizList: Quiz[],
	quizIndex: number,
	quizGroupIndex: number,
	multipleChoiceIndex: number,
	skill: Skill
) => {
	let count = 0;
	for (let i = 0; i < quizIndex; i++) {
		if (quizList[i].skill != skill) continue;
		for (let j = 0; j < quizList[i].groups.length; j++) {
			count += quizList[i].groups[j].quizzes.length;
		}
	}
	for (let i = 0; i < quizGroupIndex; i++) {
		count += quizList[quizIndex].groups[i].quizzes.length;
	}

	return count + multipleChoiceIndex + 1;
};

interface MCQuizDataRecieve {
	id: string;
	description: string;
	options: string[];
	answer: string[];
	numOfAnswers: number;
	explaination: string;
	groupId: string;
	createdAt: string;
	updatedAt: string;
}

const MCQuizDataRecieve2MCQuiz = (
	data: MCQuizDataRecieve
): MultipleChoiceQuiz => {
	return {
		id: data.id,
		description: data.description,
		options: data.options,
		answer: data.answer,
		numOfAnswers: data.numOfAnswers,
		explaination: data.explaination,
	};
};

interface MultipleChoiceGroupDataRecieve {
	id: string;
	question: string;
	startFrom: number;
	order: string[];
	quizId: string;
	createdAt: string;
	updatedAt: string;
	quizzes: MCQuizDataRecieve[];
}

const MultipleChoiceGroupDataRecieve2MultipleChoiceGroup = (
	data: MultipleChoiceGroupDataRecieve
): MultipleChoiceGroup => {
	return {
		id: data.id,
		type: QuizType.MULTIPLE_CHOICE,
		question: data.question,
		startFrom: data.startFrom,
		quizzes: data.order.map((quizid) => {
			for (let i = 0; i < data.quizzes.length; i++) {
				if (data.quizzes[i].id == quizid) {
					return MCQuizDataRecieve2MCQuiz(data.quizzes[i]);
				}
			}
		}),
	};
};

interface FQuizDataRecieve {
	id: string;
	description: string;
	answer: string;
	explaination: string;
	groupId: string;
	createdAt: string;
	updatedAt: string;
}

const FQuizDataRecieve2FQuiz = (data: FQuizDataRecieve): FillingQuiz => {
	return {
		id: data.id,
		description: data.description,
		answer: data.answer,
		explaination: data.explaination,
	};
};

interface FillingQuizDataRecieve {
	id: string;
	question: string;
	startFrom: number;
	order: string[];
	quizId: string;
	createdAt: string;
	updatedAt: string;
	quizzes: FQuizDataRecieve[];
}

const FillingQuizDataRecieve2FillingGroup = (
	data: FillingQuizDataRecieve
): FillingGroup => {
	return {
		id: data.id,
		type: QuizType.FILLING,
		question: data.question,
		startFrom: data.startFrom,
		quizzes: data.order.map((quizid) => {
			for (let i = 0; i < data.quizzes.length; i++) {
				if (data.quizzes[i].id == quizid) {
					return FQuizDataRecieve2FQuiz(data.quizzes[i]);
				}
			}
		}),
	};
};

export interface QuizDataRecieve {
	id: string;
	category: string;
	tags: Tag[];
	content: string;
	skill: string;
	order: string[];
	createdAt: string;
	updatedAt: string;
	multipleChoiceQuiz: MultipleChoiceGroupDataRecieve[];
	fillingQuiz: FillingQuizDataRecieve[];
}

export const quizDataRecieve2Quiz = (data: QuizDataRecieve): Quiz => {
	let newQuiz = {
		id: data.id,
		content: data.content,
		category: data.category,
		tagIds: data.tags,
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
				newQuiz.groups.push(
					MultipleChoiceGroupDataRecieve2MultipleChoiceGroup(
						data.multipleChoiceQuiz[j]
					)
				);
				continue;
			}
		}
		for (let j = 0; j < data.fillingQuiz.length; j++) {
			if (data.fillingQuiz[j].id == quizId) {
				newQuiz.groups.push(
					FillingQuizDataRecieve2FillingGroup(data.fillingQuiz[j])
				);
			}
		}
	}
	return newQuiz;
};

export interface TestDataRecieve {
	name: string;
	id: string;
}

export const TestDataRecieve2Test = (
	data: TestDataRecieve,
	quizList: Quiz[]
): UpdateTest => {
	let newTest = {
		name: data.name ? data.name : "",
		reading: [],
		listening: [],
		writing: [],
		speaking: [],
	} as Test;

	for (let i = 0; i < quizList.length; i++) {
		switch (quizList[i].skill) {
			case Skill.READING:
				newTest.reading.push(quizList[i]);
				break;
			case Skill.LISTENING:
				newTest.listening.push(quizList[i]);
				break;
			case Skill.WRITING:
				newTest.writing.push(quizList[i]);
				break;
			case Skill.SPEAKING:
				newTest.speaking.push(quizList[i]);
				break;
		}
	}
	return newTest as any;
};

export const setStartNumber = (quizList: Quiz[]) => {
	let readingQuiz = quizList.filter((quiz) => quiz.skill == Skill.READING);
	let listeningQuiz = quizList.filter(
		(quiz) => quiz.skill == Skill.LISTENING
	);
	let writingQuiz = quizList.filter((quiz) => quiz.skill == Skill.WRITING);
	let speakingQuiz = quizList.filter((quiz) => quiz.skill == Skill.SPEAKING);

	let count = 1;
	readingQuiz.forEach((quiz) => {
		quiz.groups.forEach((group) => {
			group.startFrom = count;
			count += group.quizzes.length;
		});
	});
	count = 1;
	listeningQuiz.forEach((quiz) => {
		quiz.groups.forEach((group) => {
			group.startFrom = count;
			count += group.quizzes.length;
		});
	});
	count = 1;
	writingQuiz.forEach((quiz) => {
		quiz.groups.forEach((group) => {
			group.startFrom = count;
			count += group.quizzes.length;
		});
	});
	count = 1;
	speakingQuiz.forEach((quiz) => {
		quiz.groups.forEach((group) => {
			group.startFrom = count;
			count += group.quizzes.length;
		});
	});

	return [...readingQuiz, ...listeningQuiz, ...writingQuiz, ...speakingQuiz];
};

export interface TestInfor {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface QuizInfor {
	id: string;
	createdAt: string;
	updatedAt: string;
}
