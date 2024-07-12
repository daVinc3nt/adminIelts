import { UUID } from 'crypto';

export interface SignUpPayload {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
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
    operator: '~' | '!~' | '=' | '!=' | 'isSet' | 'isNotSet' | '<' | '<=' | '>' | '>=';
    value?: any;
}

export interface SearchAddition {
    sort?: [string, 'ASC' | 'DESC'][],
    page?: number,
    size?: number,
    group?: string[]
}

export interface SearchPayload {
    criteria: SearchCriteria[],
    addition: SearchAddition
}

export interface UpdateAccountPayload {
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    roles?: string; // Just ADMIN, SYS_ADMIN allowed
}

export interface UpdateAvatarPayload {
    avatar: File;
}

// Quiz Interface

export const QuizType = {
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    FILLING: 'FILLING'
}

export const Skill = {
  READING: 'READING',
  LISTENING: 'LISTENING',
  WRITING: 'WRITING',
  SPEAKING: 'SPEAKING'
};


export interface CreateFillingQuiz {
    type: typeof QuizType[keyof typeof QuizType];
    description: string[];
    answer: string[];
    explaination: string[];
    quizId: string;
}

export interface CreateMultipleChoiceQuiz {
    type: typeof QuizType[keyof typeof QuizType];
    options: any;
    description: string[];
    numberOfAnswer: number[];
    answer: string[][];
    explaination: string[];
    quizId: string;
}


/*    
    Trường quizes là array object, 
    mà mỗi phần tử object có kiểu là CreateMultipleChoiceQuiz hoặc CreateFillingQuiz

    Trường quizOrder ban đầu tạo không truyền vào (null), 
    BE sẽ căn cứ vào thứ tự trong mảng quizes để tạo quizOrder
    mỗi phần tử quizOrder là quizId
*/
export interface CreateQuiz {
    content: string;
    catagoryId: string;
    groupId: string;
    skill: typeof Skill[keyof typeof Skill];
    quizes: (CreateMultipleChoiceQuiz | CreateFillingQuiz)[];
    quizOrder?: string[]
}

export interface UpdateQuiz {
    content?: string;
    catagoryId?: string;
    groupId?: string;
    skill?: typeof Skill[keyof typeof Skill];
    quizes?: (CreateMultipleChoiceQuiz | CreateFillingQuiz)[];
    quizOrder?: string[]
}

// Test interface

/**
 * Mỗi phần tử là 1 quizId
*/
export interface CreateTest {
    reading?: string[];
    listening?: string[];
    writing?: string[];
    speaking?: string[];
}

export interface UpdateTest {
    reading?: string[];
    listening?: string[];
    writing?: string[];
    speaking?: string[];
}


// Record Interface

/**
 * Id là quizId
 * Từ quizId tìm ra bài quiz rồi so khớp answer để tính điểm
 * duration là thời gian làm bài
 */
export class Reading {
    id: string;
    answer: string[];
    duration: number;
}

export class Listening {
    id: string;
    answer: string[];
    duration: number;
}

export class Writing {
    id: string;
    answer: string;
    duration: number;
}

export class Speaking {
    id: string;
    answer: File;
    duration: number;
}

export interface CreateRecord {
    testId: string;
    userId: string;

    reading?: Reading[];
    listening?: Listening[];
    writing?: Writing[];
    speaking?: Speaking[];
}

export interface GetRecord {
    testId?: string;
    userId?: string;
}

export interface UpdateRecord {
    testId: string;
    userId: string;

    reading?: Reading[];
    listening?: Listening[];
    writing?: Writing[];
    speaking?: Speaking[];
}