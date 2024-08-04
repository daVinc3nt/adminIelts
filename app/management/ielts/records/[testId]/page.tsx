"use client";
import { useEffect } from "react";
import RecordManagementProvider, {
	useRecordManagement,
} from "../provider/RecordManagementProvider";
import RecordList from "../components/RecordList";
import Pagination from "@/components/Pagnitation/Pagnitation";
import SearchBar from "../components/SearchBar";
import SelectSearchFieldButton from "../components/SelectSearchFieldButton";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

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
	const { getTestByTestId, currentPage, handleChangePage, test, isLoading } =
		useRecordManagement();

	useEffect(() => {
		getTestByTestId(testId);
	}, [testId]);

	if (isLoading) {
		return (
			<main className="flex items-center justify-center flex-1">
				<LoadingSpinner />
			</main>
		);
	}

	if (!test) {
		return (
			<main className="flex items-center justify-center flex-1">
				<span className="text-4xl font-bold text-black dark:text-gray-200">
					Record not found
				</span>
			</main>
		);
	}

	return (
		<main className="flex justify-center flex-1 main">
			<div className="flex flex-col items-center w-10/12 h-full gap-6 py-4">
				<div className="flex flex-row items-center gap-4 w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						"{test.name}" Records Management
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<SelectSearchFieldButton />
					<SearchBar />
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
