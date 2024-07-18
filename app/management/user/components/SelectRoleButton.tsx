import Select from "@/components/Select/Select";
import { useUserData } from "../provider/UserDataProvider";

const option = [
	{ value: "", label: "All Role" },
	{ value: "1", label: "Unpaid user" },
	{ value: "2", label: "Paid user" },
	{ value: "3", label: "Teacher" },
	{ value: "3", label: "System Admin" },
];

export default function SelectRoleButton() {
	const { role, setRole } = useUserData();

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
