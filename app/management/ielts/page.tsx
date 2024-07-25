"use client";
import Pagination from "@/components/Pagnitation/Pagnitation";
import SelectFetchTypeButton from "./components/SelectFetchTypeButton";
import SelectSkillButton from "./components/SelectSkillButton";
import SearchButton from "./components/SearchButton";
import { useEffect } from "react";
import { TestOperation } from "@/app/lib/main";
import { FetchingType, SearchPayload, Skill } from "@/app/lib/interfaces";
import TestList from "./components/TestList";
import { TestInfor } from "@/app/interface/quiz";
import AddButton from "./components/AddButton";
import TestManagementProvider, {
	useTestManagement,
} from "./provider/TestManagementProvider";
import { useAuth } from "@/app/provider/AuthProvider";

export default function Page() {
	return (
		<TestManagementProvider>
			<IELTSManagement />
		</TestManagementProvider>
	);
}

function IELTSManagement() {
	const { sid } = useAuth();

	const { currentPage, handleChangePage, setTestList } = useTestManagement();

	useEffect(() => {
		const newTestOperation = new TestOperation();
		newTestOperation
			.search(
				FetchingType.FULL,
				null,
				{
					criteria: [],
					addition: {
						sort: [],
						page: currentPage,
						size: 6,
						group: null,
					},
				} as SearchPayload,
				sid
			)
			.then((response) => {
				console.log(response);
				setTestList(response.data as TestInfor[]);
			});
	}, []);

	return (
		<main className="main flex justify-center flex-1">
			<div className="flex flex-col items-center w-10/12 h-full py-4 gap-6">
				<div className="w-full h-fit flex flex-row justify-between items-center">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						IELTS MANAGEMENT
					</span>
					<AddButton />
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<SelectFetchTypeButton />
					<SelectSkillButton />

					<SearchButton />
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
