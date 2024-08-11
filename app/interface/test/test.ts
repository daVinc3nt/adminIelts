import {
	Category,
	CreateFillingGroup,
	CreateFillingQuiz,
	CreateMultipleChoiceGroup,
	CreateMultipleChoiceQuiz,
	CreateQuiz,
	CreateTest,
	QuizType,
	Skill,
	UpdateFillingGroup,
	UpdateFillingQuiz,
	UpdateMultipleChoiceGroup,
	UpdateMultipleChoiceQuiz,
	UpdateQuiz,
	UpdateTest,
} from "@/app/lib/interfaces";
import { UUID } from "crypto";
import { Tag } from "../tag/tag";

export interface FQuestion {
	id?: string;
	groupId?: string;
	description: string;
	answer: string[];
	explaination: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface MCQuestion {
	id?: string;
	groupId?: string;
	description: string;
	options: string[];
	answer: string[];
	numOfAnswers: number;
	explaination: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface FGroup {
	id?: string;
	quizId?: string;
	question: string;
	type: QuizType.FILLING;
	linkToTest?: boolean;
	startFrom: number;
	order?: string[];
	quizzes: FQuestion[];
	createdAt?: string;
	updatedAt?: string;
}

export interface MCGroup {
	id?: string;
	quizId?: string;
	question: string;
	type: QuizType.MULTIPLE_CHOICE;
	linkToTest?: boolean;
	startFrom: number;
	order?: string[];
	quizzes: MCQuestion[];
	createdAt?: string;
	updatedAt?: string;
}

export interface Quiz {
	id?: string;
	category: Category;
	skill: Skill;
	linkToTest?: boolean;
	tags?: Tag[];
	filePath?: string;
	content: string;
	groups: (FGroup | MCGroup)[];
	createdAt?: string;
	updatedAt?: string;
}

export interface ReceiveQuiz {
	id: string;
	category: Category;
	skill: Skill;
	linkToTest: boolean;
	tags: Tag[];
	filePath: string;
	content: string;
	order: string[];
	fillingQuiz: FGroup[];
	multipleChoiceQuiz: MCGroup[];
	createdAt: string;
	updatedAt: string;
}

export interface Test {
	id?: string;
	name?: string;
	isPractice?: boolean;
	hasPublished?: boolean;
	reading?: Quiz[];
	listening?: Quiz[];
	writing?: Quiz[];
	speaking?: Quiz[];
	createdAt?: string;
	updatedAt?: string;
}

export interface ReciveTest {
	id: string;
	name: string;
	isPractice: boolean;
	hasPublished: boolean;
	reading: ReceiveQuiz[];
	listening: ReceiveQuiz[];
	writing: ReceiveQuiz[];
	speaking: ReceiveQuiz[];
	createdAt: string;
	updatedAt: string;
}

export const FQuestionToUpdateFQuiz = (
	fQuestion: FQuestion
): UpdateFillingQuiz => {
	const newFQuestion: UpdateFillingQuiz = {
		description: fQuestion.description,
		answer: fQuestion.answer.map((a) => a.trim().replace(/\s+/g, " ")),
		explaination: fQuestion.explaination,
	};
	if (fQuestion.id) {
		newFQuestion.id = fQuestion.id as UUID;
	}
	return newFQuestion;
};

export const MCQuestionToUpdateMCQuiz = (
	mcQuestion: MCQuestion
): UpdateMultipleChoiceQuiz => {
	const newMCQuestion: UpdateMultipleChoiceQuiz = {
		description: mcQuestion.description,
		options: mcQuestion.options.map((o) => o.trim().replace(/\s+/g, " ")),
		answer: mcQuestion.answer.map((a) => a.trim().replace(/\s+/g, " ")),
		explaination: mcQuestion.explaination,
	};
	if (mcQuestion.id) {
		newMCQuestion.id = mcQuestion.id as UUID;
	}
	return newMCQuestion;
};

export const FGroupToUpdateFGroup = (fGroup: FGroup): UpdateFillingGroup => {
	const newFGroup: UpdateFillingGroup = {
		type: QuizType.FILLING,
		question: fGroup.question,
		startFrom: fGroup.startFrom,
	};
	let newQuizzList: FQuestion[] = [];
	if (fGroup.order) {
		newQuizzList = fGroup.order.map((id) => {
			return fGroup.quizzes.find((q) => q.id === id) as FQuestion;
		});
	}
	fGroup.quizzes.forEach((q) => {
		if (!newQuizzList.includes(q)) {
			newQuizzList.push(q);
		}
	});
	newFGroup.quizzes = newQuizzList.map((q) => {
		return FQuestionToUpdateFQuiz(q);
	});

	if (fGroup.id) {
		newFGroup.id = fGroup.id as UUID;
	}
	return newFGroup;
};

export const MCGroupToUpdateMCGroup = (
	mcGroup: MCGroup
): UpdateMultipleChoiceGroup => {
	const newMCGroup: UpdateMultipleChoiceGroup = {
		type: QuizType.MULTIPLE_CHOICE,
		question: mcGroup.question,
		startFrom: mcGroup.startFrom,
	};

	let newQuizzList: MCQuestion[] = [];
	if (mcGroup.order) {
		newQuizzList = mcGroup.order.map((id) => {
			return mcGroup.quizzes.find((q) => q.id === id) as MCQuestion;
		});
	}
	mcGroup.quizzes.forEach((q) => {
		if (!newQuizzList.includes(q)) {
			newQuizzList.push(q);
		}
	});
	newMCGroup.quizzes = newQuizzList.map((q) => {
		return MCQuestionToUpdateMCQuiz(q);
	});

	if (mcGroup.id) {
		newMCGroup.id = mcGroup.id as UUID;
	}
	return newMCGroup;
};

export const QuizToUpdateQuiz = (quiz: Quiz): UpdateQuiz => {
	const newQuiz: UpdateQuiz = {
		content: quiz.content,
		category: quiz.category,
		skill: quiz.skill,
		tagIds: quiz.tags.map((tag) => tag.id) as UUID[],
		isFileUpdated: quiz.filePath == null,
		groups: quiz.groups.map((group) => {
			if (group.type == QuizType.FILLING) {
				return FGroupToUpdateFGroup(group as FGroup);
			} else if (group.type == QuizType.MULTIPLE_CHOICE) {
				return MCGroupToUpdateMCGroup(group as MCGroup);
			}
		}),
	};
	if (quiz.id) {
		newQuiz.id = quiz.id as UUID;
	}

	return newQuiz;
};

export const TestToUpdateTest = (test: Test): UpdateTest => {
	const newTest: UpdateTest = {
		name: test.name,
		hasPublished: test.hasPublished,
		reading: test.reading.map((quiz) => {
			return QuizToUpdateQuiz(quiz);
		}),
		listening: test.listening.map((quiz) => {
			return QuizToUpdateQuiz(quiz);
		}),
		writing: test.writing.map((quiz) => {
			return QuizToUpdateQuiz(quiz);
		}),
		speaking: test.speaking.map((quiz) => {
			return QuizToUpdateQuiz(quiz);
		}),
	};

	return newTest;
};

export const ReceiveGroupToGroup = (
	group: FGroup | MCGroup
): FGroup | MCGroup => {
	const newGroup = { ...group };
	newGroup.quizzes = group.order.map((id) => {
		let questionIndex = group.quizzes.findIndex((q) => q.id === id);
		if (questionIndex !== -1) {
			const newQuestion = group.quizzes[questionIndex];
			return newQuestion;
		}
		return null;
	});

	return group;
};

export const ReceiveQuizToQuiz = (quiz: ReceiveQuiz): Quiz => {
	return {
		id: quiz.id,
		category: quiz.category,
		skill: quiz.skill,
		linkToTest: quiz.linkToTest,
		tags: quiz.tags,
		filePath: quiz.filePath,
		content: quiz.content,
		createdAt: quiz.createdAt,
		updatedAt: quiz.updatedAt,
		groups: quiz.order.map((id) => {
			let groupIndex = quiz.fillingQuiz.findIndex((q) => q.id === id);
			if (groupIndex !== -1) {
				const newGroup = quiz.fillingQuiz[groupIndex];
				newGroup.type = QuizType.FILLING;
				return ReceiveGroupToGroup(newGroup);
			}

			groupIndex = quiz.multipleChoiceQuiz.findIndex((q) => q.id === id);
			if (groupIndex !== -1) {
				const newGroup = quiz.multipleChoiceQuiz[groupIndex];
				newGroup.type = QuizType.MULTIPLE_CHOICE;
				return ReceiveGroupToGroup(newGroup);
			}

			return null;
		}) as any,
	};
};

export const ReceiveQuizListToQuizList = (quizList: ReceiveQuiz[]): Quiz[] => {
	//sort ascending startFrom of first group
	//id of the first group is the first id in order
	//First group may not exist
	quizList.sort((a, b) => {
		if (a.order.length === 0 && b.order.length != 0) {
			return 1;
		}
		if (a.order.length != 0 && b.order.length === 0) {
			return -1;
		}
		if (a.order.length === 0 && b.order.length === 0) {
			return 0;
		}
		const aGroup = a.fillingQuiz.find((q) => q.id === a.order[0]);
		const bGroup = b.fillingQuiz.find((q) => q.id === b.order[0]);
		if (aGroup && bGroup) {
			return aGroup.startFrom - bGroup.startFrom;
		}
		return 0;
	});
	return quizList.map((quiz) => {
		return ReceiveQuizToQuiz(quiz);
	});
};

export const ReciveTestToTest = (test: ReciveTest): Test => {
	return {
		id: test.id,
		name: test.name,
		isPractice: test.isPractice,
		hasPublished: test.hasPublished,
		reading: ReceiveQuizListToQuizList(test.reading),
		listening: ReceiveQuizListToQuizList(test.listening),
		writing: ReceiveQuizListToQuizList(test.writing),
		speaking: ReceiveQuizListToQuizList(test.speaking),
		createdAt: test.createdAt,
		updatedAt: test.updatedAt,
	};
};

export const FQuestionToCreateFQuiz = (
	fQuestion: FQuestion
): CreateFillingQuiz => {
	return {
		description: fQuestion.description,
		answer: fQuestion.answer,
		explaination: fQuestion.explaination,
	};
};

export const MCQuestionToCreateMCQuiz = (
	mcQuestion: MCQuestion
): CreateMultipleChoiceQuiz => {
	return {
		description: mcQuestion.description,
		options: mcQuestion.options,
		answer: mcQuestion.answer,
		explaination: mcQuestion.explaination,
	};
};

export const FGroupToCreateFGroup = (fGroup: FGroup): CreateFillingGroup => {
	const newGroup = {
		type: QuizType.FILLING,
		question: fGroup.question,
		startFrom: fGroup.startFrom,
		quizzes: fGroup.quizzes.map((q) => {
			return FQuestionToCreateFQuiz(q);
		}),
	} as any;
	return newGroup;
};

export const MCGroupToCreateMCGroup = (
	mcGroup: MCGroup
): CreateMultipleChoiceGroup => {
	const newGroup = {
		type: QuizType.MULTIPLE_CHOICE,
		question: mcGroup.question,
		startFrom: mcGroup.startFrom,
		quizzes: mcGroup.quizzes.map((q) => {
			return MCQuestionToCreateMCQuiz(q);
		}),
	} as any;
	return newGroup;
};

export const QuizToCreateQuiz = (quiz: Quiz): CreateQuiz => {
	const newQuiz = {
		content: quiz.content,
		category: quiz.category,
		skill: quiz.skill,
		tagIds: quiz.tags.map((tag) => tag.id) as UUID[],
		groups: quiz.groups.map((group) => {
			if (group.type == QuizType.FILLING) {
				return FGroupToCreateFGroup(group as FGroup);
			} else if (group.type == QuizType.MULTIPLE_CHOICE) {
				return MCGroupToCreateMCGroup(group as MCGroup);
			}
		}),
	} as any;
	return newQuiz;
};

export const TestToCreateTest = (test: Test): CreateTest => {
	const newTest = {
		name: test.name,
		reading: test.reading.map((quiz) => {
			return QuizToCreateQuiz(quiz);
		}),
		listening: test.listening.map((quiz) => {
			return QuizToCreateQuiz(quiz);
		}),
		writing: test.writing.map((quiz) => {
			return QuizToCreateQuiz(quiz);
		}),
		speaking: test.speaking.map((quiz) => {
			return QuizToCreateQuiz(quiz);
		}),
	} as any;
	return newTest;
};

export const setStartFrom = (test: Test) => {
	const setStartFromForList = (quizList: Quiz[]) => {
		let count = 1;
		quizList.forEach((quiz, quizIndex) => {
			quiz.groups.forEach((group, groupIndex) => {
				if (!test.isPractice || !(groupIndex == 0)) {
					group.startFrom = count;
				}
				if (group.type == QuizType.FILLING) {
					count += group.quizzes.length;
				} else {
					group.quizzes.forEach((q) => {
						count += q.numOfAnswers;
					});
				}
			});
		});
		return quizList;
	};

	test.reading = setStartFromForList(test.reading);
	test.listening = setStartFromForList(test.listening);
	test.writing = setStartFromForList(test.writing);
	test.speaking = setStartFromForList(test.speaking);

	return test;
};

export const getQuestionGroupIndex = (
	test: Test,
	quizIndex: number,
	groupIndex: number,
	skill: Skill
) => {
	const quizList: Quiz[] = [];
	switch (skill) {
		case Skill.READING:
			quizList.push(...test.reading);
			break;
		case Skill.LISTENING:
			quizList.push(...test.listening);
			break;
		case Skill.WRITING:
			quizList.push(...test.writing);
			break;
		case Skill.SPEAKING:
			quizList.push(...test.speaking);
			break;
	}

	let count = 0;
	for (let i = 0; i < quizIndex; i++) {
		count += quizList[i].groups.length;
	}
	return count + groupIndex + 1;
};

export const getQuestionIndex = (
	test: Test,
	quizIndex: number,
	groupIndex: number,
	questionIndex: number,
	skill: Skill
) => {
	const quizList: Quiz[] = [];
	switch (skill) {
		case Skill.READING:
			quizList.push(...test.reading);
			break;
		case Skill.LISTENING:
			quizList.push(...test.listening);
			break;
		case Skill.WRITING:
			quizList.push(...test.writing);
			break;
		case Skill.SPEAKING:
			quizList.push(...test.speaking);
			break;
	}

	const currentGroup = quizList[quizIndex].groups[groupIndex];
	let count = currentGroup.startFrom;

	if (currentGroup.type == QuizType.FILLING) {
		currentGroup.quizzes.forEach((q, i) => {
			if (i < questionIndex) {
				count++;
			}
		});
	} else {
		currentGroup.quizzes.forEach((q, i) => {
			if (i < questionIndex) {
				count += q.answer.length == 0 ? 1 : q.answer.length;
			}
		});
	}
	return count;
};

export const readyForPublish = (
	test: Test
): {
	isReady: boolean;
	message: string;
	quizIndex: number;
	skill: Skill;
} => {
	//check all quizzes have at least 1 group
	//check all groups have at least 1 question
	//check all question have answer

	const checkQuiz = (quiz: Quiz, quizIndex: number, skill: Skill) => {
		if (quiz.groups.length == 0) {
			return {
				isReady: false,
				message: `${skill} part ${quizIndex + 1} does not have any group!`,
				quizIndex,
				skill,
			};
		}
		for (let i = 0; i < quiz.groups.length; i++) {
			const group = quiz.groups[i];
			if (group.type == QuizType.FILLING) {
				if (group.quizzes.length == 0) {
					return {
						isReady: false,
						message: `${skill} part ${quizIndex + 1}, group ${i + 1} does not have any question!`,
						quizIndex,
						skill,
					};
				}
				for (let j = 0; j < group.quizzes.length; j++) {
					const question = group.quizzes[j];
					if (question.answer.length == 0) {
						return {
							isReady: false,
							message: `${skill} part ${quizIndex + 1}, group ${i + 1}, question ${j + 1} does not have answer!`,
							quizIndex,
							skill,
						};
					}
					for (let k = 0; k < question.answer.length; k++) {
						if (question.answer[k].trim() === "") {
							return {
								isReady: false,
								message: `${skill} part ${quizIndex + 1}, group ${i + 1}, question ${j + 1} is empty!`,
								quizIndex,
								skill,
							};
						}
					}
				}
			} else {
				if (group.quizzes.length == 0) {
					return {
						isReady: false,
						message: `${skill} part ${quizIndex + 1}, group ${i + 1} does not have any quiz!`,
						quizIndex,
						skill,
					};
				}
				for (let j = 0; j < group.quizzes.length; j++) {
					const question = group.quizzes[j];
					if (question.answer.length == 0) {
						return {
							isReady: false,
							message: `${skill} part ${quizIndex + 1}, group ${i + 1}, question ${j + 1} does not have answer!`,
							quizIndex,
							skill,
						};
					}
				}
			}
		}
		return {
			isReady: true,
			message: "",
			quizIndex,
			skill,
		};
	};

	for (let i = 0; i < test.reading.length; i++) {
		const result = checkQuiz(test.reading[i], i, Skill.READING);
		if (!result.isReady) {
			return result;
		}
	}
	for (let i = 0; i < test.listening.length; i++) {
		const result = checkQuiz(test.listening[i], i, Skill.LISTENING);
		if (!result.isReady) {
			return result;
		}
	}
	return {
		isReady: true,
		message: "",
		quizIndex: 0,
		skill: Skill.READING,
	};
};