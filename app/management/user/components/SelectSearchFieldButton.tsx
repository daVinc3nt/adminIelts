import Select from "@/components/Select/Select";
import { useUserData } from "../provider/UserDataProvider";

const option = [
	{ value: "", label: "Select field" },
	{ value: "1", label: "First name" },
	{ value: "2", label: "Last name" },
	{ value: "3", label: "Email" },
];

export default function SelectSearchFieldButton() {
	const { searchField, setSearchField } = useUserData();

	const onChangeField = (value: string) => {
		setSearchField(value);
	};

	return (
		<div className="z-10 w-36">
			<Select
				input={searchField}
				onChangeInput={onChangeField}
				option={option}
				placeholder="Select Field"
			/>
		</div>
	);
}
