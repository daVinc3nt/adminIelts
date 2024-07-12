import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
	searchValue: string;
	setSearchValue: (value: any) => void;
	placeholder?: string;
	onSearch: any;
}

export default function SearchBar({
	searchValue,
	setSearchValue,
	placeholder,
	onSearch,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div
			tabIndex={1}
			onFocus={() => inputRef.current?.focus()}
			className="flex flex-row items-center w-full px-3 py-2 shadow-sm bg-white dark:bg-pot-black border-gray-500 rounded-md has-[:focus]:border-foreground-blue has-[:focus]:ring-2 has-[:focus]:ring-foreground-blue hover:shadow-sm hover:shadow-zinc-400 dark:hover:shadow-zinc-800 dark:has-[:focus]:border-foreground-red  dark:has-[:focus]:ring-foreground-red gap-2 duration-200">
			<input
				ref={inputRef}
				value={searchValue}
				type="search"
				onChange={(e) => setSearchValue(e.target.value)}
				placeholder={placeholder}
				className="w-full h-full p-px text-base border-0 outline-none bg-inherit ring-0 group"
			/>
			<motion.span onClick={() => onSearch()} whileHover={{ scale: 1.1 }}>
				<FaSearch size={20} />
			</motion.span>
		</div>
	);
}
