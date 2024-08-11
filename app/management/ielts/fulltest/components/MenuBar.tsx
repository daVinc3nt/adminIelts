"use client";
import Switch from "react-switch";
import { useTest } from "../provider/TestProvider";

export default function MenuBar() {
	const { onSave, check, test, onChangeTest } = useTest();

	const onCheck = () => {
		if (test.hasPublished) {
			onChangeTest({
				...test,
				hasPublished: !test.hasPublished,
			});
		} else {
			check();
		}
	};

	return (
		<div className="flex flex-row gap-2 cursor-pointer items-center">
			<span
				onClick={() => onSave()}
				className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				Save & exit
			</span>
			<span
				onClick={() => onSave()}
				className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue mr-auto">
				Save
			</span>
			<span className="px-1 rounded-md">Publish</span>
			<Switch
				height={20}
				width={44}
				handleDiameter={18}
				checked={test.hasPublished}
				onChange={() => onCheck()}
			/>
		</div>
	);
}
