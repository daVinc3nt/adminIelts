import Select from "@/components/Select/Select";
import { useTest } from "../provider/TestDataProvider";

const option = [
	{ value: "", label: "Select field" },
	{ value: "name", label: "Test Name" },
];

export default function SelectSearchFieldButton() {
	const { searchPayload, setSearchPayload } = useTest();

	const onChangeField = (value: string) => {
		setSearchPayload({ ...searchPayload, searchField: value });
	};

	return (
		<div className="z-10 ml-auto w-36">
			<Select
				input={searchPayload.searchField}
				onChangeInput={onChangeField}
				option={option}
				placeholder="Select Field"
			/>
		</div>
	);
}
