"use client";
import { FaXmark } from "react-icons/fa6";
import { useTagManagement } from "../provider/TagManagementProvide";

export default function TagInfor() {
	const { currentTag, onSelectTag } = useTagManagement();

	if (!currentTag) return null;

	return (
		<div className="fixed w-full h-full bg-black bg-opacity-20 flex pt-48 justify-center z-50">
			<div className="w-80 h-40 rounded-md bg-white dark:bg-pot-black flex flex-col overflow-hidden">
				<div className="w-full h-fit bg-foreground-blue dark:bg-foreground-red p-2 flex flex-row justify-between items-center">
					<span className="text-2xl font-bold text-white dark:text-gray-200">
						Tag Information
					</span>

					<FaXmark
						onClick={() => onSelectTag(null)}
						className="size-6 text-white dark:text-gray-200 cursor-pointer"
					/>
				</div>

				<div className="w-full h-fit flex flex-row p-2">
					<span>Tag id:</span>
				</div>
			</div>
		</div>
	);
}
