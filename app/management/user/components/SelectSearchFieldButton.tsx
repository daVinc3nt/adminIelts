import Select from "@/components/Select/Select";
import { useUserData } from "../provider/UserDataProvider";

const option = [
	{ value: "", label: "Select field" },
	{ value: "firstName", label: "First name" },
	{ value: "lastName", label: "Last name" },
	{ value: "emial", label: "Email" },
];

export default function SelectSearchFieldButton() {
	const { searchField, setSearchField } = useUserData();

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
