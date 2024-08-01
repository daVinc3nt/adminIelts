"use client";
import { BsFillFilePostFill } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { useFlashcardManagement } from "../provider/FlashcardManagementProvider";
import { Flashcard } from "@/app/interface/flashcard/flashcard";
import { useUtility } from "@/app/provider/UtilityProvider";

export default function FlashcardList() {
	const { flashcardList } = useFlashcardManagement();

	return (
		<div className="flex w-full p-4 duration-200 bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[450px] dark:bg-pot-black">
			<div className="flex flex-row flex-wrap w-full gap-4 h-fit">
				{flashcardList.map((flashcard, index) => {
					return (
						<div
							key={index}
							className="flex items-center justify-between gap-3 px-3 py-2 text-black bg-gray-100 rounded-md cursor-default w-fit h-fit dark:bg-gray-22 group dark:text-gray-200">
							<BsFillFilePostFill className="size-5" />
							<div className="flex flex-col">
								<span className="font-bold text-xs">
									{flashcard.word}
								</span>
							</div>
							<OptionButton
								flashcard={flashcard}
								flashcardIndex={index}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

interface OptionButtonProps {
	flashcard: Flashcard;
	flashcardIndex: number;
}

function OptionButton({ flashcard, flashcardIndex }: OptionButtonProps) {
	const { onSetConfirmation } = useUtility();

	const {
		onSelectFlashcard,
		onChangeFlashCardIndex,
		deleteFlashcard,
		onChangeIsOpenUpdateFlashcard,
	} = useFlashcardManagement();

	const inforRef = useClickOutsideDetails();

	const onSelect = () => {
		onChangeFlashCardIndex(flashcardIndex);
		onSelectFlashcard(flashcard);
		onChangeIsOpenUpdateFlashcard(true);
		inforRef.current.open = false;
	};

	const onDeleteFlashcard = () => {
		const del = () => {
			deleteFlashcard(flashcard.id);
			inforRef.current.open = false;
		};

		onSetConfirmation(
			`Do you want to delete "${flashcard.word}" flashcard?`,
			del,
			"delete"
		);
	};

	return (
		<details
			tabIndex={-1}
			ref={inforRef}
			className="relative z-20 h-full duration-200 cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="p-1 duration-200 opacity-0 cursor-pointer text-pot-black dark:text-gray-200 group-hover:opacity-100">
					<BsThreeDots className="size-4" />
				</div>
			</summary>
			<div className="absolute top-0 flex flex-col w-32 gap-1 p-2 bg-white rounded-md shadow-lg h-fit dark:bg-gray-22 left-7">
				<div
					onClick={() => onSelect()}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						Update
					</span>
					<FiEdit className="size-4" />
				</div>
				<div
					onClick={() => onDeleteFlashcard()}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-red-500 text-xs">Delete</span>
					<FaRegTrashCan className="text-red-500 size-4" />
				</div>
			</div>
		</details>
	);
}
