"use client";
import Pagination from "@/components/Pagnitation/Pagnitation";
import WritingManagementProvider, {
	useWritingManagement,
} from "./provider/WritingManagementProvider";
import WritingList from "./components/WritingList";
import SearchBar from "@/components/SearchBar/SearchBar";
import Select from "@/components/Select/Select";
import { MdError } from "react-icons/md";

export default function Page() {
	return (
		<div>
			<WritingManagementProvider>
				<WritingManagement />
			</WritingManagementProvider>
		</div>
	);
}

function WritingManagement() {
	const {
		currentPage,
		searchCriteria,
		numberOfPages,
		numberOfWriting,
		isLoading,
		hasPrivilege,

		search,
		handleChangePage,
		onChangeSearchCriteria,
	} = useWritingManagement();

	const onChangeFetchType = (value: string) => {
		onChangeSearchCriteria({ ...searchCriteria, field: value });
	};

	const onChangeSearchValue = (value: string) => {
		onChangeSearchCriteria({ ...searchCriteria, value: value });
	};

	if (!isLoading && !hasPrivilege) {
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

	return (
		<main className="flex justify-center flex-1 main">
			<div className="flex flex-col items-center w-9/12 h-full gap-4 py-4">
				<div className="flex flex-col w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						Writing grading request management
					</span>
					<span className="text-xl text-zinc-500 dark:text-zinc-400">
						{numberOfWriting} writing grading requests
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<span className="ml-auto" />
					<div className="z-10 w-36">
						<Select
							option={fetchTypeOption}
							placeholder="Select Type"
							input={searchCriteria.field}
							onChangeInput={onChangeFetchType}
						/>
					</div>
					<SearchBar
						searchValue={searchCriteria.value}
						onChangeSearchValue={onChangeSearchValue}
						search={search}
					/>
				</div>
				<div className="w-full">
					<WritingList />
				</div>
				<Pagination
					numberOfPages={numberOfPages}
					page={currentPage}
					handleChangePage={handleChangePage}
				/>
			</div>
		</main>
	);
}

const fetchTypeOption = [
	{ value: "", label: "Select Type" },
	{ value: "account.username", label: "Username" },
	{ value: "account.firstName", label: "First Name" },
	{ value: "account.lastName", label: "Last Name" },
];