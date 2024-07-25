"use client";
import {
	UserManagementProvider,
	useUserManagement,
} from "./provider/UserManagementProvider";
import UserList from "./components/UserList";
import SearchButton from "./components/SearchButton";
import UserInfor from "./components/UserInfor";
import SelectRoleButton from "./components/SelectRoleButton";
import SelectStatusButton from "./components/SelectStatusButton";
import SelectSearchFieldButton from "./components/SelectSearchFieldButton";
import Pagination from "@/components/Pagnitation/Pagnitation";

export default function Page() {
	return (
		<UserManagementProvider>
			<UserManagement />
		</UserManagementProvider>
	);
}

function UserManagement() {
	const { currentPage, handleChangePage } = useUserManagement();

	return (
		<main className="flex justify-center flex-1">
			<UserInfor />
			<div className="flex flex-col items-center w-11/12 h-full py-4 gap-6">
				<div className="w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						USER MANAGEMENT
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<SelectRoleButton />
					<SelectSearchFieldButton />
					<SearchButton />
				</div>

				<UserList />
				<Pagination
					numberOfPages={10}
					page={currentPage}
					handleChangePage={handleChangePage}
				/>
			</div>
		</main>
	);
}
