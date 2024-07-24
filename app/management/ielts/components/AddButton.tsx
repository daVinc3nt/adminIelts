import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { useTest } from "../provider/TestDataProvider";

export default function AddButton() {
	const { createTest } = useTest();

	const addButtonRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				addButtonRef.current &&
				!addButtonRef.current.contains(event.target as Node)
			) {
				addButtonRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<details ref={addButtonRef} className="relative cursor-pointer">
			<summary className="list-none">
				<div className="w-fit px-3 py-[6px] bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200 rounded-md font-bold flex flex-row gap-2 items-center justify-center">
					Add new
					<FaPlus className="size-4" />
				</div>
			</summary>
			<div className="w-44 h-fit p-2 flex flex-col absolute bg-white shadow-md dark:bg-gray-22 top-10 rounded-md">
				<button
					onClick={() => createTest()}
					className="p-2 hover:bg-gray-100 rounded-md dark:hover:bg-pot-black text-black dark:text-gray-200">
					Add new test
				</button>
				<Link
					href={"/management/ielts/passages"}
					className="p-2 hover:bg-gray-100 rounded-md dark:hover:bg-pot-black text-black dark:text-gray-200">
					Add new passages
				</Link>
			</div>
		</details>
	);
}
