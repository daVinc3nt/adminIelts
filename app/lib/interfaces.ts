import { UUID } from 'crypto';


export enum UserRole {
	ADMIN = "Quản trị viên",
	SYS_ADMIN = "Quản trị viên hệ thống",
	EXAM_ADMIN = "Quản trị viên đề thi",
	STUDENT = "Học viên",
	PAID_USER = "Người dùng có trả phí",
	NONPAID_USER = "Người dùng không trả phí",
}

export enum InvitationStatus {
	PENDING = "Chưa phản hồi",
	ACCEPT = "Chấp nhận",
	DECLINE = "Từ chối",
}

// Quiz Interface

export enum QuizType {
	MULTIPLE_CHOICE = "MULTIPLE CHOICE",
	FILLING = "FILLING",
}

export enum Skill {
	READING = "READING",
	LISTENING = "LISTENING",
	WRITING = "WRITING",
	SPEAKING = "SPEAKING",
}

export enum Category {
	THPTQG = "THPTQG",
	IELTS = "IELTS",
	HSK = "HSK",
}

export enum FetchingType {
	FULL = "full",
	AUTO = "auto",
}

export enum SplitType {
	QUIZ_LEVEL = "QUIZ_LEVEL",
	GROUP_LEVEL = "GROUP_LEVEL",
}

export interface SignUpPayload {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	dateOfBirth: Date;
	username: string;
	email: string;
	password: string;
	roles: UserRole[];
}

export interface LoginPayload {
	identifier: string;
	password: string;
}

export interface VerifyOtpPayload {
	id: UUID;
	otp: string; // 6 numeric digits
}

export interface SearchCriteria {
	field: string;
	operator:
		| "~"
		| "!~"
		| "="
		| "!="
		| "isSet"
		| "isNotSet"
		| "<"
		| "<="
		| ">"
		| ">=";
	value?: any;
}

export interface SearchAddition {
	sort?: [string, "ASC" | "DESC"][];
	page?: number;
	size?: number;
	group?: string[];
}

export interface SearchPayload {
	criteria: SearchCriteria[];
	addition: SearchAddition;
}

export interface UpdateAccountPayload {
	username?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	dateOfBirth?: Date;
	roles?: UserRole[]; // Just ADMIN, SYS_ADMIN allowed
}

export interface UpdateAvatarPayload {
	avatar: File;
}

export interface CreateFillingQuiz {
	description: string;
	answer: string[];
	explaination: string;
}

export interface CreateFillingGroup {
	type: QuizType;
	question: String;
	startFrom: Number;
	quizzes: CreateFillingQuiz[];
	quizId: string;
}

export interface UpdateFillingQuiz {
	id?: UUID;
	description?: string;
	answer?: string;
	explaination?: string;
}

export interface UpdateFillingGroup {
	id?: UUID;
	type?: QuizType;
	question?: String;
	startFrom?: Number;
	quizzes?: UpdateFillingQuiz[];
}

export interface CreateMultipleChoiceQuiz {
	description: string;
	options: string[];
	answer: string[];
	numOfAnswers: number;
	explaination: string;
}
export interface CreateMultipleChoiceGroup {
	type: QuizType;
	question: String;
	startFrom: Number;
	quizzes: CreateMultipleChoiceQuiz[];
	quizId: string;
}

export interface UpdateMultipleChoiceGroup {
	id?: UUID;
	type?: QuizType;
	question?: String;
	startFrom?: Number;
	quizzes?: UpdateMultipleChoiceQuiz[];
}

export interface UpdateMultipleChoiceQuiz {
	id?: UUID;
	description?: string;
	options?: string[];
	answer?: string[];
	numOfAnswers?: number;
	explaination?: string;
}

export interface UpdateQuiz {
	id?: UUID;
	content?: string;
	skill?: Skill;
	category?: Category;
	tagIds?: UUID[];
	tag?: string;
	groups?: (UpdateMultipleChoiceGroup | UpdateFillingGroup)[];
	order?: UUID[];
}

export interface UpdateQuizStatistics {
	readingCount: number;
	listeningCount: number;
	writingCount: number;
	speakingCount: number;
	multipleChoiceCount: number;
	fillingCount: number;
}

export interface CreateFullQuiz {
	file: File;
	data: CreateQuiz;
}

export interface UpdateFullQuiz {
	file: File;
	data: UpdateQuiz;
}

export interface CreateQuiz {
	content: string;
	category: Category;
	tagIds: UUID[];
	tag: string;
	skill: Skill;
	groups: (CreateMultipleChoiceGroup | CreateFillingGroup)[];
}

export interface CreateTestFromQuizIds {
	name: string;
	reading: UUID[];
	listening: UUID[];
	writing: UUID[];
	speaking: UUID[];
}

// Test interface

/**
 * Mỗi phần tử là 1 quizId
 */
export interface CreateTest {
	name: string;
	reading: CreateQuiz[];
	listening: CreateQuiz[];
	writing: CreateQuiz[];
	speaking: CreateQuiz[];
}

export interface CreateFullTest {
	files: File[]; //listening file in order
	data: CreateTest;
}

export interface UpdateFullTest {
	files: File[];
	data: UpdateTest;
}

export interface UpdateTest {
	name?: string;
	reading?: UpdateQuiz[];
	listening?: UpdateQuiz[];
	writing?: UpdateQuiz[];
	speaking?: UpdateQuiz[];
}

// Record Interface

/**
 * Id là quizId
 * Từ quizId tìm ra bài quiz rồi so khớp answer để tính điểm
 * duration là thời gian làm bài
 */
export interface Reading {
	id: string;
	answer: string[];
	duration: number;
}

export interface Listening {
	id: string;
	answer: string[];
	duration: number;
}

export interface Writing {
	id: string;
	answer: string;
	duration: number;
}

export interface Speaking {
	id: string;
	answer: File;
	duration: number;
}

export interface MultipleChoiceAnswer {
	id: UUID;
	answer: string[][];
}

export interface FillingAnswer {
	id: UUID;
	answer: string[];
}

export interface AnswerQuiz {
	id: UUID;
	answer: string[] | string;
}
export interface AnswerGroup {
	id: UUID;
	quizzes: AnswerQuiz[];
}

export interface CreateAnswer {
	recordId: UUID;
	score: number;
	multipleChoiceQuizId: UUID;
	fillingQuizId: UUID;
	content: string[] | string;
}

export interface CreateRecord {
	testId: UUID;

	readingDuration: number;
	listeningDuration: number;
	writingDuration: number;
	speakingDuration: number;
	completeReading: boolean;
	completeListening: boolean;
	completeWriting: boolean;
	completeSpeaking: boolean;
	reading: AnswerGroup[];
	listening: AnswerGroup[];
	writing: AnswerGroup[];
	speaking: AnswerGroup[];
}

export interface GetRecord {
	testId: string;
	accountId: string;
}

export interface UpdateRecord {
	testId: UUID;
	readingDuration?: number;
	listeningDuration?: number;
	writingDuration?: number;
	speakingDuration?: number;
	completeReading?: boolean;
	completeListening?: boolean;
	completeWriting?: boolean;
	completeSpeaking?: boolean;
	reading?: AnswerGroup[];
	listening?: AnswerGroup[];
	writing?: AnswerGroup[];
	speaking?: AnswerGroup[];
}

export interface UpdateRecordConfig {
	readingAmount: number;
	listeningAmount: number;
	speakingAmount: number;
	writingAmount: number;
}

export interface InitRecord {
	testId: UUID;
	readingAmount: number;
	listeningAmount: number;
	speakingAmount: number;
	writingAmount: number;
}

// Tag interface
export interface CreateTag {
	value: string;
	splitType: SplitType;
}

export interface UpdateTag {
	value: string;
	splitType: SplitType;
}

//Flash card

export interface CreateFlashCard {
	word: string;
	definition: string;
}

export interface GetFlashCard {
	word?: string;
	definition?: string;
}

export interface UpdateFlashCard {
	word?: string;
	definition?: string;
}