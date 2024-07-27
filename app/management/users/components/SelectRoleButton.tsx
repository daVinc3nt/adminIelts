import Select from "@/components/Select/Select";
import { useUserManagement } from "../provider/UserManagementProvider";
import { UserRole } from "@/app/lib/interfaces";

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
	const { role, onChangeRole } = useUserManagement();

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
