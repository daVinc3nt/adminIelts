import { UserRole } from "@/app/lib/interfaces";
import { RoleInfor } from "../user/user";

export interface PrivilegeConfig {
	account: {
		search: string[];
		updateUsers: string[];
		updateAvatar: string[];
		updatePersonal: string[];
		getAvatar: string[];
		count: string[];
		resetPassword: string[];
		verifyOtp: string[];
	};
	test: {
		createFromQuiz: string[];
		create: string[];
		search: string[];
		findOne: string[];
		update: string[];
		delete: string[];
	};
	practice: {
		search: string[];
		create: string[];
	};
	record: {
		init: string[];
		search: string[];
		findOne: string[];
		update: string[];
		updateConfig: string[];
		delete: string[];
	};
	quiz: {
		create: string[];
		search: string[];
		findOne: string[];
		update: string[];
		delete: string[];
	};
	ftag: {
		createPublic: string[];
		createPrivate: string[];
		search: string[];
		findOne: string[];
		update: string[];
		updatePublic: string[];
		delete: string[];
		deletePublic: string[];
	};
	tag: {
		createPublic: string[];
		createPrivate: string[];
		search: string[];
		findOne: string[];
		update: string[];
		updatePublic: string[];
		delete: string[];
		deletePublic: string[];
	};
	flashcard: {
		createPublic: string[];
		createPrivate: string[];
		search: string[];
		findOne: string[];
		update: string[];
		updatePublic: string[];
		delete: string[];
		deletePublic: string[];
	};
	remarkRequest: {
		search: string[];
		delete: string[];
	};
}

export const initPrivilegeConfig: PrivilegeConfig = {
	account: {
		search: ["ADMIN", "SYS_ADMIN"],
		updatePersonal: [],
		updateUsers: ["ADMIN", "SYS_ADMIN"],
		updateAvatar: [],
		getAvatar: [],
		count: ["ADMIN", "SYS_ADMIN"],
		resetPassword: [],
		verifyOtp: [],
	},
	test: {
		createFromQuiz: ["ADMIN", "EXAM_ADMIN"],
		create: ["ADMIN", "EXAM_ADMIN"],
		search: [],
		findOne: [],
		update: ["ADMIN", "EXAM_ADMIN"],
		delete: ["ADMIN", "EXAM_ADMIN"],
	},
	practice: {
		search: [],
		create: ["ADMIN", "EXAM_ADMIN"],
	},
	record: {
		init: [],
		search: [],
		findOne: [],
		update: [],
		updateConfig: [],
		delete: ["ADMIN", "EXAM_ADMIN"],
	},
	quiz: {
		create: ["ADMIN", "EXAM_ADMIN"],
		search: [],
		findOne: [],
		update: ["ADMIN", "EXAM_ADMIN"],
		delete: ["ADMIN", "EXAM_ADMIN"],
	},
	ftag: {
		createPublic: ["ADMIN", "EXAM_ADMIN", "SYS_ADMIN"],
		createPrivate: [],
		search: [],
		findOne: [],
		update: [],
		updatePublic: ["ADMIN", "EXAM_ADMIN", "SYS_ADMIN"],
		delete: [],
		deletePublic: ["ADMIN", "EXAM_ADMIN", "SYS_ADMIN"],
	},
	tag: {
		createPublic: ["ADMIN", "EXAM_ADMIN", "SYS_ADMIN"],
		createPrivate: [],
		search: [],
		findOne: [],
		update: [],
		updatePublic: ["ADMIN", "EXAM_ADMIN", "SYS_ADMIN"],
		delete: [],
		deletePublic: ["ADMIN", "EXAM_ADMIN", "SYS_ADMIN"],
	},
	flashcard: {
		createPublic: ["ADMIN", "EXAM_ADMIN", "SYS_ADMIN"],
		createPrivate: [],
		search: [],
		findOne: [],
		update: [],
		updatePublic: ["ADMIN", "EXAM_ADMIN", "SYS_ADMIN"],
		delete: [],
		deletePublic: ["ADMIN", "EXAM_ADMIN", "SYS_ADMIN"],
	},
	remarkRequest: {
		search: ["ADMIN", "EXAM_ADMIN"],
		delete: ["ADMIN", "EXAM_ADMIN"],
	},
};

export const getRoleFromRoleInfor = (roles: RoleInfor[]) => {
	if (!roles) return [];

	return roles.map((role) => {
		return role.role;
	});
};

export const getRole = (role: UserRole) => {
	switch (role) {
		case UserRole.ADMIN:
			return "ADMIN";
		case UserRole.SYS_ADMIN:
			return "SYS_ADMIN";
		case UserRole.EXAM_ADMIN:
			return "EXAM_ADMIN";
		case UserRole.STUDENT:
			return "STUDENT";
		case UserRole.PAID_USER:
			return "PAID_USER";
		default:
			return "NONPAID_USER";
	}
};

export const getAccountPrivilege = (
	roles: UserRole[],
	action:
		| "search"
		| "updateUsers"
		| "updatePersonal"
		| "updateAvatar"
		| "getAvatar"
		| "count"
		| "resetPassword"
		| "verifyOtp",
	privilege: PrivilegeConfig
) => {
	const privilegeConfig = privilege.account[action];
	if (!privilegeConfig) {
		return false;
	}
	for (let i = 0; i < roles.length; i++) {
		if (privilegeConfig.includes(getRole(roles[i]))) {
			return true;
		}
	}
	return false;
};

export const getTestPrivilege = (
	roles: UserRole[],
	action:
		| "createFromQuiz"
		| "create"
		| "search"
		| "findOne"
		| "update"
		| "delete",
	privilege: PrivilegeConfig
) => {
	const privilegeConfig = privilege.test[action];
	if (!privilegeConfig) {
		return false;
	}
	for (let i = 0; i < roles.length; i++) {
		if (privilegeConfig.includes(getRole(roles[i]))) {
			return true;
		}
	}
	return false;
};

export const getPracticePrivilege = (
	roles: UserRole[],
	action: "search" | "create",
	privilege: PrivilegeConfig
) => {
	const privilegeConfig = privilege.practice[action];
	if (!privilegeConfig) {
		return false;
	}
	for (let i = 0; i < roles.length; i++) {
		if (privilegeConfig.includes(getRole(roles[i]))) {
			return true;
		}
	}
	return false;
};

export const getRecordPrivilege = (
	roles: UserRole[],
	action:
		| "init"
		| "search"
		| "findOne"
		| "update"
		| "updateConfig"
		| "delete",
	privilege: PrivilegeConfig
) => {
	const privilegeConfig = privilege.record[action];
	if (!privilegeConfig) {
		return false;
	}
	for (let i = 0; i < roles.length; i++) {
		if (privilegeConfig.includes(getRole(roles[i]))) {
			return true;
		}
	}
	return false;
};

export const getQuizPrivilege = (
	roles: UserRole[],
	action: "create" | "search" | "findOne" | "update" | "delete",
	privilege: PrivilegeConfig
) => {
	const privilegeConfig = privilege.quiz[action];
	if (!privilegeConfig) {
		return false;
	}
	for (let i = 0; i < roles.length; i++) {
		if (privilegeConfig.includes(getRole(roles[i]))) {
			return true;
		}
	}
	return false;
};

export const getFtagPrivilege = (
	roles: UserRole[],
	action:
		| "createPublic"
		| "createPrivate"
		| "search"
		| "findOne"
		| "update"
		| "updatePublic"
		| "delete"
		| "deletePublic",
	privilege: PrivilegeConfig
) => {
	const privilegeConfig = privilege.ftag[action];
	if (!privilegeConfig) {
		return false;
	}
	for (let i = 0; i < roles.length; i++) {
		if (privilegeConfig.includes(getRole(roles[i]))) {
			return true;
		}
	}
	return false;
};

export const getTagPrivilege = (
	roles: UserRole[],
	action:
		| "createPublic"
		| "createPrivate"
		| "search"
		| "findOne"
		| "update"
		| "updatePublic"
		| "delete"
		| "deletePublic",
	privilege: PrivilegeConfig
) => {
	const privilegeConfig = privilege.tag[action];
	if (!privilegeConfig) {
		return false;
	}
	for (let i = 0; i < roles.length; i++) {
		if (privilegeConfig.includes(getRole(roles[i]))) {
			return true;
		}
	}
	return false;
};

export const getFlashcardPrivilege = (
	roles: UserRole[],
	action:
		| "createPublic"
		| "createPrivate"
		| "search"
		| "findOne"
		| "update"
		| "updatePublic"
		| "delete"
		| "deletePublic",
	privilege: PrivilegeConfig
) => {
	const privilegeConfig = privilege.flashcard[action];
	if (!privilegeConfig) {
		return false;
	}
	for (let i = 0; i < roles.length; i++) {
		if (privilegeConfig.includes(getRole(roles[i]))) {
			return true;
		}
	}
	return false;
};

export const getRemarkRequestPrivilege = (
	roles: UserRole[],
	action: "search" | "delete",
	privilege: PrivilegeConfig
) => {
	const privilegeConfig = privilege.remarkRequest[action];
	if (!privilegeConfig) {
		return false;
	}
	for (let i = 0; i < roles.length; i++) {
		if (privilegeConfig.includes(getRole(roles[i]))) {
			return true;
		}
	}
	return false;
};

export const isAdmin = (roles: UserRole[]) => {
	return (
		roles.includes(UserRole.ADMIN) ||
		roles.includes(UserRole.SYS_ADMIN) ||
		roles.includes(UserRole.EXAM_ADMIN)
	);
};
