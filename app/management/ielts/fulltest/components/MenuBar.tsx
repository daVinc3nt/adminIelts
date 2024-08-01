import { setStartFrom } from "@/app/interface/test/test";
import { useTest } from "../provider/TestProvider";

export default function MenuBar() {
	const { onSave, urlList, test } = useTest();

	const print = () => {
		console.log(setStartFrom(test));
	};

	return (
		<div className="flex flex-row gap-2 cursor-pointer">
			<span
				onClick={() => onSave()}
				className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				Save & exit
			</span>
			<span
				onClick={() => onSave()}
				className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				Save
			</span>
			<span
				onClick={() => print()}
				className="px-1 ml-auto rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				print test
			</span>
		</div>
	);
}
