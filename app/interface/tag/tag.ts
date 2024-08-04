import { Skill } from "@/app/lib/interfaces";

export interface Tag {
	id?: string;
	value: string;
	forQuiz: boolean;
	skill: Skill;
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
