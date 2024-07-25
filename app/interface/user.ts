export enum UserRole {
	ADMIN = "Quản trị viên",
	SYS_ADMIN = "Quản trị viên hệ thống",
	EXAM_ADMIN = "Quản trị viên đề thi",
	STUDENT = "Học viên",
	PAID_USER = "Người dùng có trả phí",
	NONPAID_USER = "Người dùng không trả phí",
}

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
	accountId: string;
	createdAt: string;
	updateAt: string;
	id: number;
	role: UserRole;
}

export const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
