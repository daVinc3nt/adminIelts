"use client";
import Pagination from "@/components/Pagnitation/Pagnitation";
import SearchBar from "./components/SearchBar";
import TestList from "./components/TestList";
import AddButton from "./components/AddButton";
import TestManagementProvider, {
	useTestManagement,
} from "./provider/TestManagementProvider";

export default function Page() {
	return (
		<TestManagementProvider>
			<IELTSManagement />
		</TestManagementProvider>
	);
}

function IELTSManagement() {
	const { currentPage, handleChangePage } = useTestManagement();

	return (
		<main className="flex justify-center flex-1 main">
			<div className="flex flex-col items-center w-10/12 h-full gap-6 py-4">
				<div className="flex flex-row items-center justify-between w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						IELTS MANAGEMENT
					</span>
					<AddButton />
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<SearchBar />
				</div>
				<div className="w-full">
					<TestList />
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
