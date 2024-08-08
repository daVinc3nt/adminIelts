"use client";
import Pagination from "@/components/Pagnitation/Pagnitation";
import WritingManagementProvider, {
	useWritingManagement,
} from "./provider/WritingManagementProvider";
import WritingList from "./components/WritingList";
import SearchBar from "@/components/SearchBar/SearchBar";
import Select from "@/components/Select/Select";

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

	return (
		<main className="flex justify-center flex-1 main">
			<div className="flex flex-col items-center w-9/12 h-full gap-6 py-4">
				<div className="flex flex-row items-center w-full gap-4 h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						Writing Records Management
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
					numberOfPages={10}
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