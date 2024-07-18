import Select from "@/components/Select/Select";
import { useUserData } from "../provider/UserDataProvider";

const option = [
	{ value: "", label: "All Status" },
	{ value: "1", label: "Active" },
	{ value: "2", label: "Non active" },
];

export default function SelectStatusButton() {
	const { status, setStatus } = useUserData();

	const onChangeStatus = (value: string) => {
		setStatus(value);
	};

	return (
		<div className="z-10 w-36">
			<Select
				input={status}
				onChangeInput={onChangeStatus}
				option={option}
				placeholder="All Status"
			/>
		</div>
	);
}
