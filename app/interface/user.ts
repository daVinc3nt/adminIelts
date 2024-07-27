import { UserRole } from "../lib/interfaces";

export const roleLabel = [
	{ value: UserRole.NONPAID_USER, label: "Non-paid user" },
	{ value: UserRole.PAID_USER, label: "Paid user" },
	{ value: UserRole.STUDENT, label: "Student" },
	{ value: UserRole.ADMIN, label: "Admin" },
	{ value: UserRole.EXAM_ADMIN, label: "Exam admin" },
	{ value: UserRole.SYS_ADMIN, label: "System admin" },
];

export interface UserInformation {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	avatar: File;
	active: boolean;
	dateOfBirth: string;
	phoneNumber: string;
	roles: RoleInfor[];
	createdAt: Date;
	updatedAt: Date;
}

export interface RoleInfor {
	accountId?: string;
	createdAt?: string;
	updateAt?: string;
	id?: number;
	role: UserRole;
}

export const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
