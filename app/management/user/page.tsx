"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import { UserProvider, useUserData } from "./context/UserProvider";
import AddUserButton from "./components/AddUserButton";
import FilterButton from "./components/FilterButton";
import FilterList from "./components/FilterList";
import UserList from "./components/UserList";
import SearchAdditionButton from "./components/SearchAdditionButton";
import SearchAdditionList from "./components/SearchAdditionList";
import { AccountOperation } from "@/app/interface/main";
import { SearchPayload } from "@/app/interface/interfaces";

export default function Page() {
	return (
		<UserProvider>
			<StudentManagement />
		</UserProvider>
	);
}

function StudentManagement() {
	const [searchValue, setSearchValue] = useState<string>("");

	const { searchAddition, searchCiterias } = useUserData();

	const onSearch = async () => {
		const accoutOperation = new AccountOperation();
		await accoutOperation
			.search(
				{
					criteria: searchCiterias,
					addition: searchAddition,
				} as SearchPayload,
				""
			)
			.then((response) => {
				console.log(response);
			});
	};

	return (
		<main className="flex justify-center flex-1">
			<div className="flex flex-col items-center w-10/12 h-full py-4">
				<div className="w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						User Management
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-4">
					<FilterButton />
					<SearchAdditionButton />
					<SearchBar
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						onSearch={onSearch}
						placeholder="Search for students by name, email, or username"
					/>
					<AddUserButton />
				</div>
				<div className="flex flex-col w-full gap-2 py-2">
					<SearchAdditionList />
					<FilterList />
				</div>

				<UserList />
			</div>
		</main>
	);
}
