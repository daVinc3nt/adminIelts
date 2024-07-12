export interface UserInformation {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	avatar: File;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}
