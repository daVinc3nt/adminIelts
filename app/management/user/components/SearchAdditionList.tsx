import { useUserData } from "../context/UserProvider";

const fieldLabels = [
	{ label: "First name", value: "firstName" },
	{ label: "Last name", value: "lastName" },
	{ label: "Username", value: "username" },
	{ label: "Email", value: "email" },
	{ label: "Role", value: "role" },
];

const orderLabels = [
	{ label: "ascending", value: "ASC" },
	{ label: "descending", value: "DESC" },
];

export default function SearchAdditionList() {
	const { searchAddition } = useUserData();

	return (
		<div className="flex flex-wrap w-full gap-2 h-fit">
			<span className="p-1 font-bold text-gray-400 border border-transparent">
				Search addition:
			</span>
			{searchAddition.sort?.map((sort, index) => {
				if (!searchAddition.sort) return;
				return (
					<div
						key={index}
						className="flex flex-row items-center justify-center gap-2 px-2 py-1 text-gray-600 rounded-md shadow-sm cursor-default bg-mecury-gray dark:bg-gray-22 w-fit h-fit dark:text-gray-400">
						{`${
							fieldLabels.find((field) => field.value === sort[0])
								?.label
						}
						 ${orderLabels.find((order) => order.value === sort[1])?.label}`}
					</div>
				);
			})}
			<div className="flex flex-row items-center justify-center gap-2 px-2 py-1 text-gray-600 rounded-md shadow-sm cursor-default bg-mecury-gray dark:bg-gray-22 w-fit h-fit dark:text-gray-400">
				{`${searchAddition.page} pages`}
			</div>
			<div className="flex flex-row items-center justify-center gap-2 px-2 py-1 text-gray-600 rounded-md shadow-sm cursor-default bg-mecury-gray dark:bg-gray-22 w-fit h-fit dark:text-gray-400">
				{`${searchAddition.size} users per page`}
			</div>
			<div className="flex flex-row items-center justify-center gap-2 px-2 py-1 text-gray-600 rounded-md shadow-sm cursor-default bg-mecury-gray dark:bg-gray-22 w-fit h-fit dark:text-gray-400">
				{`${searchAddition.group ? searchAddition.group : "Group none"}`}
			</div>
		</div>
	);
}
