"use client";
import CK5Editor from "@/components/CK5Editor/CK5Editor";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";

export default function Page() {
	const [searchValue, setSearchValue] = useState<string>("");

	const [data, setData] = useState<string>("");

	return (
		<main className="flex justify-center flex-1">
			<div className="flex flex-col items-center w-10/12 h-full gap-4 py-4">
				<div className="flex flex-row items-center w-full h-fit">
					<span className="p-2 mr-auto text-3xl font-bold">
						IELTS TEST MANAGEMENT
					</span>

					<button className="flex items-center p-2 font-semibold text-white bg-red-500 rounded-md shadow-md w-fit h-fit">
						<span>Create test</span>
						<BsPlus size={25} />
					</button>
				</div>

				<div className="flex items-center justify-center w-full h-fit">
					<div className="w-1/2">
						<SearchBar
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							placeholder="Search for a test..."
						/>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center w-full h-fit"></div>
			</div>
		</main>
	);
}
