"use client";
import Select from "@/components/Select/Select";
import { useTagManagement } from "../provider/TagManagementProvide";

const option = [
	{ value: "", label: "All tags" },
	{ value: "true", label: "Quizs tags" },
	{ value: "false", label: "Groups tags" },
];

export default function SelectFetchTypeButton() {
	const { fetchType, onChangeFetchType } = useTagManagement();

	return (
		<div className="z-10 w-36">
			<Select
				input={fetchType}
				onChangeInput={onChangeFetchType}
				option={option}
				placeholder="All tags"
			/>
		</div>
	);
}
