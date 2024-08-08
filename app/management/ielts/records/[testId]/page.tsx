"use client";
import { useEffect } from "react";
import RecordManagementProvider, {
	useRecordManagement,
} from "../provider/RecordManagementProvider";
import RecordList from "../components/RecordList";
import Pagination from "@/components/Pagnitation/Pagnitation";
import SearchBar from "@/components/SearchBar/SearchBar";
import Select from "@/components/Select/Select";
import NotFoundPage from "@/components/Page/NotFoundPage";

export default function Page({ params }: { params: { testId: string } }) {
	return (
		<RecordManagementProvider>
			<RecordManagement testId={params.testId} />
		</RecordManagementProvider>
	);
}

interface RecordManagementProps {
	testId: string;
}

function RecordManagement({ testId }: RecordManagementProps) {
	const {
		test,
		currentPage,
		searchCriteria,

		getTestByTestId,
		handleChangePage,
		search,
		onChangeSearchCriteria,
	} = useRecordManagement();

	useEffect(() => {
		getTestByTestId(testId);
	}, [testId]);

	const onChangeSearchValue = (value: string) => {
		onChangeSearchCriteria({
			...searchCriteria,
			value: value,
		});
	};

	const onChangeField = (value: string) => {
		onChangeSearchCriteria({ ...searchCriteria, field: value });
	};

	if (!test) {
		return (
			<NotFoundPage
				message="Test not found"
				subMessage={`There are no test with id: ${testId}`}
				backto="Back to ielts management"
				backtoLink="/management/ielts"
			/>
		);
	}

	return (
		<main className="flex justify-center flex-1 main">
			<div className="flex flex-col items-center w-9/12 h-full gap-6 py-4">
				<div className="flex flex-row items-center w-full gap-4 h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						{test ? test.name : ""} Records Management
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<div className="z-40 w-40 ml-auto">
						<Select
							option={searchFieldOption}
							input={searchCriteria.field}
							onChangeInput={onChangeField}
							placeholder="Select field"
						/>
					</div>
					<SearchBar
						searchValue={searchCriteria.value}
						onChangeSearchValue={onChangeSearchValue}
						search={search}
						placeholder="Search record"
					/>
				</div>
				<div className="w-full">
					<RecordList />
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

const searchFieldOption = [
	{ value: "", label: "SelectField" },
	{ value: "account.username", label: "Username" },
	{ value: "account.firstName", label: "First name" },
	{ value: "account.lastName", label: "Last name" },
];