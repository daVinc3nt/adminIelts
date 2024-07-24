import Select from "@/components/Select/Select";
import { useTestManagement } from "../provider/TestManagementProvider";

const option = [
	{ value: "", label: "All skill" },
	{ value: "READING", label: "Reading" },
	{ value: "LISTENING", label: "Listening" },
	{ value: "WRITING", label: "Writing" },
	{ value: "SPEAKING", label: "Speaking" },
];

export default function SelectSkillButton() {
	const { skillType, setSkillType } = useTestManagement();

	const onChangeSkillType = (value: string) => {
		setSkillType(value);
	};

	return (
		<div className="z-10 w-36">
			<Select
				input={skillType}
				onChangeInput={onChangeSkillType}
				option={option}
				placeholder="All skill"
			/>
		</div>
	);
}
