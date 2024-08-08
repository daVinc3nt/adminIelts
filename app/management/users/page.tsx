"use client";
import {
	UserManagementProvider,
	useUserManagement,
} from "./provider/UserManagementProvider";
import UserList from "./components/UserList";
import Pagination from "@/components/Pagnitation/Pagnitation";
import PopupUpdateUser from "./components/PopupUpdateUser";
import PopupUserInfor from "./components/PopupUserInfor";
import { UserRole } from "@/app/lib/interfaces";
import Select from "@/components/Select/Select";
import SearchBar from "@/components/SearchBar/SearchBar";

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
		isOpenUpdateInfor,
		isOpenUserInfor,
		searchCriteria,
		numberOfPage,
		numberOfUser,
		onChangeRole,
		handleChangePage,
		search,
		onChangeSearchCriteria,
		role,
	} = useUserManagement();

	const onChangeField = (value: string) => {
		onChangeSearchCriteria({ ...searchCriteria, field: value });
	};

	const onChangeSearchValue = (value: string) => {
		onChangeSearchCriteria({ ...searchCriteria, value: value });
	};

	return (
		<main className="flex justify-center flex-1">
			{isOpenUserInfor && <PopupUserInfor />}
			{isOpenUpdateInfor && <PopupUpdateUser />}
			<div className="flex flex-col items-center w-10/12 h-full gap-6 py-4">
				<div className="w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						User Management
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<div className="z-10 w-40">
						<Select
							input={role}
							onChangeInput={onChangeRole}
							option={roleOption}
							placeholder="All Role"
						/>
					</div>
					<div className="z-10 ml-auto w-36">
						<Select
							input={searchCriteria.field}
							onChangeInput={onChangeField}
							option={searchFieldOption}
							placeholder="Select Field"
						/>
					</div>
					<SearchBar
						search={search}
						searchValue={searchCriteria.value}
						onChangeSearchValue={onChangeSearchValue}
					/>
				</div>

				<UserList />
				<Pagination
					numberOfPages={numberOfPage}
					page={currentPage}
					handleChangePage={handleChangePage}
				/>
			</div>
		</main>
	);
}

const roleOption = [
	{ value: "", label: "All Role" },
	{ value: UserRole.NONPAID_USER, label: "Non-paid user" },
	{ value: UserRole.PAID_USER, label: "Paid user" },
	{ value: UserRole.STUDENT, label: "Student" },
	{ value: UserRole.ADMIN, label: "Admin" },
	{ value: UserRole.EXAM_ADMIN, label: "Exam admin" },
	{ value: UserRole.SYS_ADMIN, label: "System admin" },
];

const searchFieldOption = [
	{ value: "firstName", label: "First name" },
	{ value: "lastName", label: "Last name" },
	{ value: "email", label: "Email" },
];