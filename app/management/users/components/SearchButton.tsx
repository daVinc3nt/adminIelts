import { FaSearch } from "react-icons/fa";
import { useUserManagement } from "../provider/UserManagementProvider";

export default function SearchButton() {
	const { search, searchValue, setSearchValue } = useUserManagement();

	const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value ? e.target.value : "");
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				search();
			}}
			className="flex flex-row items-center justify-center overflow-hidden border-2 rounded-md border-foreground-blue dark:border-foreground-red has-[:focus]:border-foreground-blue has-[:focus]:ring-1 has-[:focus]:ring-foreground-blue dark:has-[:focus]:ring-foreground-red ">
			<input
				type="search"
				value={searchValue}
				onChange={onChangeSearchValue}
				placeholder="Search using name or email"
				className="w-80 text-base px-2 py-[4px] focus:outline-none bg-white dark:bg-black-night rounded-md"
			/>
			<button
				type="submit"
				tabIndex={1}
				className="flex flex-row items-center justify-center h-full gap-2 px-4 py-[4px] font-bold text-white duration-200 cursor-pointer dark:text-gray-200 w-fit borde-0 whitespace-nowrap bg-foreground-blue dark:bg-foreground-red">
				Search
				<FaSearch strokeWidth="3" size={20} />
			</button>
		</form>
	);
}