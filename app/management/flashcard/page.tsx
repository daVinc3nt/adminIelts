"use client";
import AddFlashcardButton from "./components/AddFlashcardButton";
import FlashcardList from "./components/FlashcardList";
import FlashcardSearchBar from "./components/FlashcardSearchBar";
import PopupAddFlashcard from "./components/PopupAddFlashcard";
import PopupUpdateFlashcard from "./components/PopupUpdateFlashcard";
import FlashcardManagementProvider, {
	useFlashcardManagement,
} from "./provider/FlashcardManagementProvider";

export default function Page() {
	return (
		<FlashcardManagementProvider>
			<FlashcardManagement />
		</FlashcardManagementProvider>
	);
}

function FlashcardManagement() {
	const { isOpenAddFlashcard, isOpenUpdateFlashcard } =
		useFlashcardManagement();

	return (
		<main className="flex justify-center flex-1 main">
			{isOpenAddFlashcard && <PopupAddFlashcard />}
			{isOpenUpdateFlashcard && <PopupUpdateFlashcard />}
			<div className="flex flex-col items-center w-10/12 h-full gap-6 py-4">
				<div className="flex flex-row items-center justify-between w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						Flashcard Management
					</span>

					<AddFlashcardButton />
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<FlashcardSearchBar />
				</div>
				<div className="w-full">
					<FlashcardList />
				</div>
			</div>
		</main>
	);
}
