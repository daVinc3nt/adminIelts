"use client";
import { BsFillFilePlusFill } from "react-icons/bs";
import { useFlashcardManagement } from "../provider/FlashcardManagementProvider";

export default function AddFlashcardButton() {
	const { onChangeIsOpenAddFlashcard } = useFlashcardManagement();

	return (
		<div
			onClick={() => onChangeIsOpenAddFlashcard(true)}
			className="w-fit px-3 py-[6px] bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200 rounded-md font-bold flex flex-row gap-2 items-center justify-center cursor-pointer">
			Add new flashcard
			<BsFillFilePlusFill className="size-4" />
		</div>
	);
}
