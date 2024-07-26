import { FaPlus } from "react-icons/fa";
import { useTestManagement } from "../provider/TestManagementProvider";

export default function AddButton() {
	const { createTest } = useTestManagement();

	return (
		<div
			onClick={() => createTest()}
			className="w-fit px-3 py-[6px] bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200 rounded-md font-bold flex flex-row gap-2 items-center justify-center">
			Add new test
			<FaPlus className="size-4" />
		</div>
	);
}
