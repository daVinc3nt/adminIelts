import Select from "@/components/Select/Select";
import { useUserManagement } from "../provider/UserManagementProvider";

const option = [
	{ value: "firstName", label: "First name" },
	{ value: "lastName", label: "Last name" },
	{ value: "email", label: "Email" },
];

export default function SelectSearchFieldButton() {
	const { searchField, setSearchField } = useUserManagement();

	const onChangeField = (value: string) => {
		setSearchField(value);
	};

	return (
		<div className="z-10 ml-auto w-36">
			<Select
				input={searchField}
				onChangeInput={onChangeField}
				option={option}
				placeholder="Select Field"
			/>
		</div>
	);
}
