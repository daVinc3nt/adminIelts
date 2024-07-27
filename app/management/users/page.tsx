"use client";
import {
	UserManagementProvider,
	useUserManagement,
} from "./provider/UserManagementProvider";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";
import SelectRoleButton from "./components/SelectRoleButton";
import SelectSearchFieldButton from "./components/SelectSearchFieldButton";
import Pagination from "@/components/Pagnitation/Pagnitation";
import PopupUpdateUser from "./components/PopupUpdateUser";
import PopupUserInfor from "./components/PopupUserInfor";

export default function Page() {
	return (
		<UserManagementProvider>
			<UserManagement />
		</UserManagementProvider>
	);
}

function UserManagement() {
	const {
		currentPage,
		handleChangePage,
		isOpenUpdateInfor,
		isOpenUserInfor,
	} = useUserManagement();

	return (
		<main className="flex justify-center flex-1">
			{isOpenUserInfor && <PopupUserInfor />}
			{isOpenUpdateInfor && <PopupUpdateUser />}
			<div className="flex flex-col items-center w-10/12 h-full gap-6 py-4">
				<div className="w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						USER MANAGEMENT
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<SelectRoleButton />
					<SelectSearchFieldButton />
					<SearchBar />
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
