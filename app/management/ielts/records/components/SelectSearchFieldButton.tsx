import Select from "@/components/Select/Select";
import { useRecordManagement } from "../provider/RecordManagementProvider";

const option = [
	{ value: "username", label: "Username" },
	{ value: "firstName", label: "First name" },
	{ value: "lastName", label: "Last name" },
];

export default function SelectSearchFieldButton() {
	const { searchCriteria, onChangeSearchCriteria } = useRecordManagement();

	const onChangeField = (value: string) => {
		onChangeSearchCriteria({ ...searchCriteria, field: value });
	};

	return (
		<div className="z-10 ml-auto w-36">
			<Select
				input={searchCriteria.field}
				onChangeInput={onChangeField}
				option={option}
				placeholder="Select Field"
			/>
		</div>
	);
}
