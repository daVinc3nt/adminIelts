export interface Tag {
	id?: string;
	value: string;
	forQuiz: boolean;
	createAt?: string;
	updateAt?: string;
}

export interface FTag {
	id?: string;
	isPublic: boolean;
	accountId: string;
	value: string;
	createdAt?: string;
	updatedAt?: string;
}
