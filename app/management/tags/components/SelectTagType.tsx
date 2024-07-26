"use client";
import Select from "@/components/Select/Select";
import { useTagManagement } from "../provider/TagManagementProvide";
import { SplitType } from "@/app/lib/interfaces";

const option = [
	{ value: "", label: "All tags" },
	{ value: SplitType.QUIZ_LEVEL, label: "Quizs tags" },
	{ value: SplitType.GROUP_LEVEL, label: "Groups tags" },
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
