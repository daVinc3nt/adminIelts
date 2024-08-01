"use client";
import { FaPlus } from "react-icons/fa";
import { useTestManagement } from "../provider/TestManagementProvider";
import { useState } from "react";

export default function AddButton() {
	const { createTest } = useTestManagement();
	const [isDisabled, setIsDisabled] = useState(false);

	const onClick = () => {
		setIsDisabled(true);
		createTest().then((res) => {
			if (!res) {
				setIsDisabled(false);
			}
		});
	};

	return (
		<button
			onClick={() => onClick()}
			disabled={isDisabled}
			className="w-fit px-3 py-[6px] bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200 rounded-md font-bold flex flex-row gap-2 items-center justify-center cursor-pointer">
			Add new test
			<FaPlus className="size-4" />
		</button>
	);
}
