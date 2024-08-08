interface WritingAnswerInfor {
	id?: string;
	writingAnswerId?: string;
	accountId?: string;
	account?: {
		active?: boolean;
		avatar?: File;
		createdAt?: string;
		dateOfBirth?: string;
		email?: string;
		firstName?: string;
		id?: string;
		lastName?: string;
		phoneNumber?: string;
		username?: string;
	};
	createdAt?: string;
	updatedAt?: string;
}

interface WritingAnswer {
	id?: string;
	content?: string;
	filePath?: string | null;
	remark?: string;
	firstCriterion?: string;
	secondCriterion?: string;
	thirdCriterion?: string;
	fourthCriterion?: string;
	score?: number;
	recordId?: string;
	quizId?: string;
	createdAt?: string;
	updatedAt?: string;
	record?: {
		id?: string;
		accountId?: string;
		testId?: string;
		readingDuration?: number;
		listeningDuration?: number;
		writingDuration?: number;
		speakingDuration?: number;
		readingAmount?: number;
		listeningAmount?: number;
		writingAmount?: number;
		speakingAmount?: number;
		completeReading?: boolean;
		completeListening?: boolean;
		completeWriting?: boolean;
		completeSpeaking?: boolean;
		score?: number;
		createdAt?: string;
		updatedAt?: string;
		account?: {
			id?: string;
			username?: string;
			email?: string;
			firstName?: string;
			lastName?: string;
			phoneNumber?: string | null;
			dateOfBirth?: string | null;
			avatar?: string | null;
			active?: boolean;
			createdAt?: string;
			updatedAt?: string;
		};
	};
	quiz?: any;
}
