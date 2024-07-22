import { FaSearch } from "react-icons/fa";
import { useTest } from "../provider/TestDataProvider";

export default function SearchButton() {
	const { searchPayload, setSearchPayload, search } = useTest();

	const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchPayload({
			...searchPayload,
			searchValue: e.target.value ? e.target.value : "",
		});
	};

	return (
		<div className="flex flex-row items-center justify-center overflow-hidden border-2 rounded-md border-foreground-blue dark:border-foreground-red has-[:focus]:border-foreground-blue has-[:focus]:ring-1 has-[:focus]:ring-foreground-blue dark:has-[:focus]:ring-foreground-red ">
			<input
				type="search"
				value={searchPayload.searchValue}
				onChange={onChangeSearchValue}
				placeholder="Search using test name"
				className="w-80 text-base px-2 py-[4px] focus:outline-none bg-white dark:bg-black-night rounded-md"
			/>
			<div
				tabIndex={1}
				onClick={() => search()}
				className="flex flex-row items-center justify-center h-full gap-2 px-4 py-[4px] font-bold text-white duration-200 cursor-pointer dark:text-gray-200 w-fit borde-0 whitespace-nowrap bg-foreground-blue dark:bg-foreground-red">
				Search
				<FaSearch strokeWidth="3" size={20} />
			</div>
		</div>
	);
}
