import { FaSearch } from "react-icons/fa";
import { useUserData } from "../provider/UserDataProvider";

export default function SearchButton() {
	const { search } = useUserData();

	return (
		<div
			tabIndex={1}
			onClick={() => search()}
			className="flex flex-row items-center justify-center h-full gap-2 px-4 py-[5.5px] font-bold text-white duration-200 rounded-md cursor-pointer dark:text-gray-200 w-fit borde-0 whitespace-nowrap bg-foreground-blue dark:bg-foreground-red">
			Search
			<FaSearch strokeWidth="3" size={20} />
		</div>
	);
}