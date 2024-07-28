import { SplitType } from "../lib/interfaces";

export interface Tag {
	id?: string;
	value: string;
	splitType: SplitType;
	createAt?: string;
	updateAt?: string;
}
