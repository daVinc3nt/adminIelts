import { FaXmark } from "react-icons/fa6";
import { useUserManagement } from "../provider/UserManagementProvider";

const fieldLabels = [
	{ label: "First name", value: "firstName" },
	{ label: "Last name", value: "lastName" },
	{ label: "Username", value: "username" },
	{ label: "Email", value: "email" },
	{ label: "Role", value: "role" },
];

const operatorLabels = [
	{ label: "contain", value: "~" },
	{ label: "not contain", value: "!~" },
	{ label: "equal", value: "=" },
	{ label: "not equal", value: "!=" },
	{ label: "is set", value: "isSet" },
	{ label: "is not set", value: "isNotSet" },
	{ label: "smaller than", value: "<" },
	{ label: "smaller or equal to", value: "<=" },
	{ label: "larger than", value: ">" },
	{ label: "larger or equal to", value: ">=" },
];

export default function FilterList() {
	const { searchCiterias, setSearchCiterias } = useUserManagement();

	const removeSearchCriteria = (index: number) => {
		const newSearchCiterias = searchCiterias.filter((_, i) => i !== index);
		setSearchCiterias(newSearchCiterias);
	};

	return (
		<div className="flex flex-wrap w-full gap-2 h-fit">
			<span className="p-1 font-bold text-gray-400 border border-transparent">
				Filter:
			</span>
			{searchCiterias.map((criteria, index) => {
				return (
					<div
						key={index}
						className="flex flex-row items-center justify-center gap-2 px-2 py-1 text-gray-600 rounded-md shadow-sm cursor-default bg-mecury-gray dark:bg-gray-22 w-fit h-fit dark:text-gray-400">
						{
							fieldLabels.find(
								(field) => field.value === criteria.field
							)?.label
						}{" "}
						{
							operatorLabels.find(
								(operator) =>
									operator.value === criteria.operator
							)?.label
						}{" "}
						{`"${criteria.value}"`}
						<div onClick={() => removeSearchCriteria(index)}>
							<FaXmark className="cursor-pointer size-4" />
						</div>
					</div>
				);
			})}
		</div>
	);
}
