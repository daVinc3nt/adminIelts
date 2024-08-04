import Select from "@/components/Select/Select";
import { useTestManagement } from "../provider/TestManagementProvider";

const option = [
	{ value: "test", label: "Test" },
	{ value: "practice", label: "Practice" },
];

export default function SelectFetchTypeButton() {
	const { fetchType, onChangeFetchType } = useTestManagement();

	const onChangeField = (value: string) => {
		onChangeFetchType(value as "test" | "practice");
	};

	return (
		<div className="z-10 w-36">
			<Select
				input={fetchType}
				onChangeInput={onChangeField}
				option={option}
				placeholder="Test"
			/>
		</div>
	);
}
