import Select from "@/components/Select/Select";
import { useTestManagement } from "../provider/TestManagementProvider";
import { Skill } from "@/app/lib/interfaces";

const option = [
	{ value: "", label: "All skill" },
	{ value: Skill.READING, label: "Reading" },
	{ value: Skill.LISTENING, label: "Listening" },
	{ value: Skill.WRITING, label: "Writing" },
	{ value: Skill.SPEAKING, label: "Speaking" },
];

export default function SelectSkillButton() {
	const { currentSkill, onChangeCurrentSkill } = useTestManagement();

	const onChangeField = (value: string) => {
		onChangeCurrentSkill(value as Skill);
	};

	return (
		<div className="z-10 w-36">
			<Select
				input={currentSkill}
				onChangeInput={onChangeField}
				option={option}
				placeholder="All skill"
			/>
		</div>
	);
}
