"use client";
import Pagination from "@/components/Pagnitation/Pagnitation";
import AddFlashcardButton from "./components/AddFlashcardButton";
import FlashcardList from "./components/FlashcardList";
import PopupAddFlashcard from "./components/PopupAddFlashcard";
import PopupUpdateFlashcard from "./components/PopupUpdateFlashcard";
import FlashcardManagementProvider, {
	useFlashcardManagement,
} from "./provider/FlashcardManagementProvider";
import Select from "@/components/Select/Select";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Page() {
	return (
		<FlashcardManagementProvider>
			<FlashcardManagement />
		</FlashcardManagementProvider>
	);
}

function FlashcardManagement() {
	const {
		isOpenAddFlashcard,
		isOpenUpdateFlashcard,
		currentPage,
		numberOfPages,
		currentTag,
		fTagList,
		searchCriteria,
		onChangeCurrentTag,
		onChangePage,
		onChangeSearchCritera,
		fetchFlashcardList,
	} = useFlashcardManagement();

	const ftagOption = [{ label: "All tag", value: "" }];
	ftagOption.push(
		...fTagList.map((ftag) => {
			return {
				label: ftag.value,
				value: ftag.value,
			};
		})
	);

	const onChangeSearchValue = (value: string) => {
		onChangeSearchCritera({ ...searchCriteria, value });
	};

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
					<div className="w-44 z-20">
						<Select
							option={ftagOption}
							onChangeInput={onChangeCurrentTag}
							input={currentTag}
							placeholder="All tag"
						/>
					</div>
					<span className="ml-auto" />
					<SearchBar
						searchValue={searchCriteria.value}
						onChangeSearchValue={onChangeSearchValue}
						search={fetchFlashcardList}
					/>
				</div>
				<div className="w-full">
					<FlashcardList />
				</div>
				<Pagination
					page={currentPage}
					numberOfPages={numberOfPages}
					handleChangePage={onChangePage}
				/>
			</div>
		</main>
	);
}
