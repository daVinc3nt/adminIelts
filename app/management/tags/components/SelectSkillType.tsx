"use client";
import Select from "@/components/Select/Select";
import { useTagManagement } from "../provider/TagManagementProvide";
import { Skill } from "@/app/lib/interfaces";

const option = [
	{ value: "", label: "All skill" },
	{ value: Skill.READING, label: "Reading" },
	{ value: Skill.LISTENING, label: "Listening" },
	{ value: Skill.WRITING, label: "Writing" },
	{ value: Skill.SPEAKING, label: "Speaking" },
];

export default function SelectSkillTypeButton() {
	const { currentSkill, onChangeCurrentSkill } = useTagManagement();

	return (
		<div className="z-10 w-36">
			<Select
				input={currentSkill}
				onChangeInput={onChangeCurrentSkill}
				option={option}
				placeholder="All skill"
			/>
		</div>
	);
}
