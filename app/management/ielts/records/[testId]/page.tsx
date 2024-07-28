"use client";
import { useEffect } from "react";
import RecordManagementProvider, {
	useRecordManagement,
} from "../provider/RecordManagementProvider";
import RecordList from "../components/RecordList";
import Pagination from "@/components/Pagnitation/Pagnitation";

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
	const { getTestByTestId, currentPage, handleChangePage } =
		useRecordManagement();

	useEffect(() => {
		getTestByTestId(testId);
	}, [testId]);

	return (
		<main className="flex justify-center flex-1 main">
			<div className="flex flex-col items-center w-10/12 h-full gap-6 py-4">
				<div className="flex flex-row items-center justify-between w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						RECORDS MANAGEMENT
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit"></div>
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
