import Select from "@/components/Select/Select";
import { useUserManagement } from "../provider/UserManagementProvider";

enum UserRole {
	ADMIN = "Quản trị viên",
	SYS_ADMIN = "Quản trị viên hệ thống",
	EXAM_ADMIN = "Quản trị viên đề thi",
	STUDENT = "Học viên",
	PAID_USER = "Người dùng có trả phí",
	NONPAID_USER = "Người dùng không trả phí",
}

const option = [
	{ value: "", label: "All Role" },
	{ value: UserRole.NONPAID_USER, label: "Non-paid user" },
	{ value: UserRole.PAID_USER, label: "Paid user" },
	{ value: UserRole.STUDENT, label: "Student" },
	{ value: UserRole.ADMIN, label: "Admin" },
	{ value: UserRole.EXAM_ADMIN, label: "Exam admin" },
	{ value: UserRole.SYS_ADMIN, label: "System admin" },
];

export default function SelectRoleButton() {
	const { role, setRole } = useUserManagement();

	const onChangeRole = (value: string) => {
		setRole(value);
	};

	return (
		<div className="z-10 w-40">
			<Select
				input={role}
				onChangeInput={onChangeRole}
				option={option}
				placeholder="All Role"
			/>
		</div>
	);
}
