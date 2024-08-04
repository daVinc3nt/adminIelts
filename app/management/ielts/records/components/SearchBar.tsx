import { FaSearch } from "react-icons/fa";
import { useRecordManagement } from "../provider/RecordManagementProvider";

export default function SearchBar() {
	const { search, searchCriteria, onChangeSearchCriteria } =
		useRecordManagement();

	const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeSearchCriteria({
			...searchCriteria,
			value: e.target.value,
		});
	};

	return (
		<div className="flex flex-row items-center justify-center overflow-hidden border-2 rounded-md border-foreground-blue dark:border-foreground-red has-[:focus]:border-foreground-blue has-[:focus]:ring-1 has-[:focus]:ring-foreground-blue dark:has-[:focus]:ring-foreground-red">
			<input
				type="search"
				value={searchCriteria.value}
				onChange={onChangeSearchValue}
				placeholder="Search"
				className="w-80 text-base px-2 py-[4px] focus:outline-none bg-white dark:bg-black-night rounded-md"
			/>
			<div
				tabIndex={1}
				onClick={() => search()}
				className="flex flex-row items-center justify-center h-full gap-2 px-4 py-[4px] font-bold text-white  cursor-pointer dark:text-gray-200 w-fit borde-0 whitespace-nowrap bg-foreground-blue dark:bg-foreground-red">
				Search
				<FaSearch strokeWidth="3" size={20} />
			</div>
		</div>
	);
}
