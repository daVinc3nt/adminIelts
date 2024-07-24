import Select from "@/components/Select/Select";
import { useTestManagement } from "../provider/TestManagementProvider";

const option = [
	{ value: "fulltests", label: "Full test" },
	{ value: "passages", label: "Passages" },
];

export default function SelectFetchTypeButton() {
	const { fetchType, setFetchType } = useTestManagement();

	const onChangeFetchType = (value: string) => {
		setFetchType(value);
	};

	return (
		<div className="z-10 w-36">
			<Select
				input={fetchType}
				onChangeInput={onChangeFetchType}
				option={option}
				placeholder="Select Type"
			/>
		</div>
	);
}
