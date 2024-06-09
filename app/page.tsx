"use client";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useState } from "react";
import Select from "@/components/Select/Select";
import Card from "./component/Card";
import { TestInfor } from "./component/interface";
import TestDescription from "./component/TestDescription";
import TestList from "./component/TestList";

export default function Home() {
	const [searchValue, setSearchValue] = useState<string>("");
	const [selectedValue, setSelectedValue] = useState<string>("All");
	const [currentTest, setCurrentTest] = useState<number>(-1);

	return (
		<div className="flex h-screen p-4 bg-gray-100">
			<div className="flex flex-col flex-1 w-full h-full gap-4">
				<div className="flex w-full gap-8 h-fit">
					<span className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">
						IELTS TEST MANAGEMENT
					</span>
				</div>

				<div className="flex flex-wrap w-full gap-8 h-fit">
					<div className="flex flex-wrap flex-1 gap-8 ">
						<Card
							numberOfTest={69}
							testType="Reading Test"
							path="management\reading"
						/>
						<Card
							numberOfTest={69}
							testType="Listening Test"
							path="management\listening"
						/>
					</div>
					<div className="flex flex-wrap flex-1 gap-8 ">
						<Card
							numberOfTest={69}
							testType="Speaking Test"
							path=""
						/>
						<Card
							numberOfTest={69}
							testType="Writing Test"
							path=""
						/>
					</div>
				</div>

				<div className="grid w-full h-fit grid-cols-12 gap-8">
					<div className="w-full h-full col-span-2">
						<Select
							input={selectedValue}
							onChangeInput={setSelectedValue}
							option={selectOption}
						/>
					</div>
					<div className="w-full h-full col-span-6 col-start-4">
						<SearchBar
							searchValue={searchValue}
							setSearchValue={setSearchValue}
						/>
					</div>
				</div>

				<div className="flex flex-row flex-1 w-full gap-8 overflow-auto">
					<div className="flex flex-col w-full h-full overflow-auto max-lg:w-full">
						<TestList
							currentTest={currentTest}
							setCurrentTest={setCurrentTest}
							testInfor={testInfor}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
const selectOption = [
	{ value: "All", label: "All" },
	{ value: "Reading Test", label: "Reading Test" },
	{ value: "Listening Test", label: "Listening Test" },
	{ value: "Speaking Test", label: "Speaking Test" },
	{ value: "Writing Test", label: "Writing Test" },
];

const data = [
	{ label: "RA =< 10", value: 30 },
	{ label: "10 < RA <= 20", value: 300 },
	{ label: "20 < RA <= 30", value: 350 },
	{ label: "30 < RA <= 40", value: 200 },
];

const wrongFreqData = [
	1, 5, 1, 3, 4, 6, 9, 4, 10, 20, 12, 17, 13, 7, 2, 3, 10, 18, 0, 1, 13, 16,
	15, 14, 13, 12, 7, 10, 9, 4, 16, 15, 19, 10, 12, 17, 20, 20, 41, 30,
];

const testInfor: TestInfor[] = [
	{
		testName: "Reading Test 1",
		testType: "Reading Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Listening Test 1",
		testType: "Listening Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Reading Test 2",
		testType: "Reading Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Writing Test 1",
		testType: "Writing Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Reading Test 3",
		testType: "Reading Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Reading Test 4",
		testType: "Reading Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Listening Test 2",
		testType: "Listening Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Listening Test 3",
		testType: "Listening Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Reading Test 5",
		testType: "Reading Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Writing Test 2",
		testType: "Writing Test",
		author: "Author 1",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 1`,
	},
	{
		testName: "Listening Test 4",
		testType: "Listening Test",
		author: "Author 2",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 2`,
	},
	{
		testName: "Listening Test 4",
		testType: "Listening Test",
		author: "Author 2",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 2`,
	},
	{
		testName: "Listening Test 4",
		testType: "Listening Test",
		author: "Author 2",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 2`,
	},
	{
		testName: "Listening Test 4",
		testType: "Listening Test",
		author: "Author 2",
		dateCreated: "2021-07-01",
		lastModified: "2021-07-01",
		description: `This is test 2`,
	},
];
