import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
	search: () => void;
	searchValue: string;
	onChangeSearchValue: (value: string) => void;
	placeholder?: string;
}

export default function SearchBar({
	search,
	searchValue,
	onChangeSearchValue,
	placeholder,
}: SearchBarProps) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				search();
			}}
			className="flex flex-row items-center justify-center overflow-hidden border-2 rounded-md border-foreground-blue dark:border-foreground-red has-[:focus]:border-foreground-blue has-[:focus]:ring-1 has-[:focus]:ring-foreground-blue dark:has-[:focus]:ring-foreground-red">
			<input
				type="search"
				value={searchValue || ""}
				onChange={(e) => onChangeSearchValue(e.target.value)}
				placeholder={placeholder || "Search"}
				className="w-80 text-base px-2 py-[4px] focus:outline-none bg-white dark:bg-black-night rounded-md"
			/>
			<button
				tabIndex={1}
				type="submit"
				className="flex flex-row items-center justify-center h-full gap-2 px-4 py-[4px] font-bold text-white  cursor-pointer dark:text-gray-200 w-fit borde-0 whitespace-nowrap bg-foreground-blue dark:bg-foreground-red">
				Search
				<FaSearch strokeWidth="3" size={20} />
			</button>
		</form>
	);
}
