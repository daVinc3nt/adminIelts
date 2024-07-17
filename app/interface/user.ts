import { UUID } from "crypto";

export interface UserInformation {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	avatar: File;
	active: boolean;
	roles: RoleInfor[];
	createdAt: Date;
	updatedAt: Date;
}

export interface RoleInfor {
	accountId: UUID;
	createdAt: string;
	updateAt: string;
	id: number;
	role: string;
}
