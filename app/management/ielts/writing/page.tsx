"use client";
import Pagination from "@/components/Pagnitation/Pagnitation";
import WritingManagementProvider, {
	useWritingManagement,
} from "./provider/WritingManagementProvider";
import WritingList from "./components/WritingList";

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
	const { currentPage, handleChangePage } = useWritingManagement();

	return (
		<main className="flex justify-center flex-1 main">
			<div className="flex flex-col items-center w-9/12 h-full gap-6 py-4">
				<div className="flex flex-row items-center gap-4 w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						Writing Records Management
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit"></div>
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
