import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
	searchValue: string;
	setSearchValue: (value: any) => void;
}

export default function SearchBar({ searchValue, setSearchValue }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div
			tabIndex={1}
			onFocus={() => inputRef.current?.focus()}
			className="flex flex-row items-center w-full h-full px-3 py-2 shadow-sm border rounded-lg has-[:focus]:border-red-500 has-[:focus]:ring-1 has-[:focus]:ring-red-500 bg-white">
			<input
				ref={inputRef}
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				placeholder="Search for test . . ."
				className="w-full h-full text-base border-0 outline-none ring-0 group"
			/>
			<motion.span
				onClick={() => console.log(searchValue)}
				whileHover={{ scale: 1.1 }}>
				<FaSearch size={20} />
			</motion.span>
		</div>
	);
}
