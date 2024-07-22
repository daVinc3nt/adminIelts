import Select from "@/components/Select/Select";
import { useUserData } from "../provider/UserDataProvider";

const option = [
	{ value: "", label: "All Status" },
	{ value: true, label: "Active" },
	{ value: false, label: "Non active" },
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
