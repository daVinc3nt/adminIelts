"use client";
import { UserDataProvider } from "./provider/UserDataProvider";
import FilterButton from "./components/FilterButton";
import FilterList from "./components/FilterList";
import UserList from "./components/UserList";
import SearchButton from "./components/SearchButton";
import UserInfor from "./components/UserInfor";
import SelectRoleButton from "./components/SelectRoleButton";
import SelectStatusButton from "./components/SelectStatusButton";
import SelectSearchFieldButton from "./components/SelectSearchFieldButton";

export default function Page() {
	return (
		<UserDataProvider>
			<UserManagement />
		</UserDataProvider>
	);
}

function UserManagement() {
	return (
		<main className="flex justify-center flex-1">
			<UserInfor />
			<div className="flex flex-col items-center w-11/12 h-full py-4">
				<div className="w-full mb-4 h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						User Management
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-4 h-fit">
					<SelectRoleButton />
					<SelectStatusButton />
					<SelectSearchFieldButton />
					<SearchButton />
				</div>
				<div className="flex flex-row w-full gap-2 py-2">
					<FilterList />
				</div>

				<UserList />
			</div>
		</main>
	);
}
