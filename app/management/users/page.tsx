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
import { useEffect } from "react";
import { useAuth } from "@/app/provider/AuthProvider";
import {
	getAccountPrivilege,
	getRoleFromRoleInfor,
} from "@/app/interface/privilegeconfig/privilegeconfig";
import { get } from "http";
import { MdError } from "react-icons/md";

export default function Page() {
	return (
		<UserManagementProvider>
			<UserManagement />
		</UserManagementProvider>
	);
}

function UserManagement() {
	const { userInformation, privilage } = useAuth();
	const {
		currentPage,
		isOpenUpdateInfor,
		isOpenUserInfor,
		searchCriteria,
		numberOfPage,
		numberOfUser,
		role,
		isLoading,
		onChangeRole,
		handleChangePage,
		search,
		onChangeSearchCriteria,
	} = useUserManagement();

	useEffect(() => {
		if (!isLoading) {
		}
	});

	const onChangeField = (value: string) => {
		onChangeSearchCriteria({ ...searchCriteria, field: value });
	};

	const onChangeSearchValue = (value: string) => {
		onChangeSearchCriteria({ ...searchCriteria, value: value });
	};

	if (!isLoading) {
		const userRoles = getRoleFromRoleInfor(userInformation.roles);
		if (!getAccountPrivilege(userRoles, "search", privilage)) {
			return (
				<div className="w-full h-screen -mt-14 flex items-center justify-center flex-col gap-2">
					<MdError className="size-40 text-red-500" />
					<h1 className="text-3xl font-semibold">
						You are not allowed to access this page.
					</h1>
					<div className="w-fit flex flew-row gap-2 items-center justify-center"></div>
				</div>
			);
		}
	}

	return (
		<main className="flex justify-center flex-1">
			{isOpenUserInfor && <PopupUserInfor />}
			{isOpenUpdateInfor && <PopupUpdateUser />}
			<div className="flex flex-col items-center w-10/12 h-full gap-4 py-4">
				<div className="w-full h-fit flex flex-col">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						User Management
					</span>
					<span className="text-xl text-zinc-500 dark:text-zinc-400">
						{numberOfUser} users
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