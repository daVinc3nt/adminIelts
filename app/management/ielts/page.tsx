"use client";

import Pagination from "@/components/Pagnitation/Pagnitation";
import TestDataProvider, { useTest } from "./provider/TestDataProvider";
import SelectFetchTypeButton from "./components/SelectFetchTypeButton";
import SelectSkillButton from "./components/SelectSkillButton";
import SelectSearchFieldButton from "./components/SelectSearchFieldButton";
import SearchButton from "./components/SearchButton";
import { useEffect } from "react";
import { TestOperation } from "@/app/interface/main";
import { FetchingType, SearchPayload, Skill } from "@/app/interface/interfaces";

export default function Page() {
	return (
		<TestDataProvider>
			<IELTSManagement />
		</TestDataProvider>
	);
}

function IELTSManagement() {
	const { currentPage, handleChangePage, setTestList } = useTest();

	useEffect(() => {
		const newTestOperation = new TestOperation();
		newTestOperation
			.search(
				FetchingType.AUTO,
				Skill.SPEAKING,
				{
					criteria: [],
					addition: {
						sort: [],
						page: currentPage,
						size: 6,
						group: null,
					},
				} as SearchPayload,
				testToken
			)
			.then((response) => {
				console.log(response);
			});
	});

	return (
		<main className="flex justify-center flex-1">
			<div className="flex flex-col items-center w-11/12 h-full py-4 gap-6">
				<div className="w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						IELTS MANAGEMENT
					</span>
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<SelectFetchTypeButton />
					<SelectSkillButton />

					<SelectSearchFieldButton />
					<SearchButton />
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

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
