"use client";
import Pagination from "@/components/Pagnitation/Pagnitation";
import TestList from "./components/TestList";
import AddButton from "./components/AddButton";
import TestManagementProvider, {
	useTestManagement,
} from "./provider/TestManagementProvider";
import Select from "@/components/Select/Select";
import { Skill } from "@/app/lib/interfaces";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Page() {
	return (
		<TestManagementProvider>
			<IELTSManagement />
		</TestManagementProvider>
	);
}

function IELTSManagement() {
	const {
		currentPage,
		fetchType,
		currentSkill,
		searchCriteria,
		numberOfPage,
		numberOfTest,
		numberOfPractice,
		onChangeSearchCriteria,
		handleChangePage,
		onChangeFetchType,
		onChangeCurrentSkill,
		search,
	} = useTestManagement();

	const onChangeField = (value: string) => {
		onChangeFetchType(value as "test" | "practice");
	};

	const onChangeSkill = (value: string) => {
		onChangeCurrentSkill(value as Skill);
	};

	const onChangeSearchValue = (value: string) => {
		onChangeSearchCriteria({
			...searchCriteria,
			value: value,
		});
	};

	return (
		<main className="flex justify-center flex-1 main">
			<div className="flex flex-col items-center w-10/12 h-full gap-4 py-4">
				<div className="flex flex-row items-center justify-between w-full h-fit">
					<div className="w-fit h-fit flex flex-col">
						<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
							IELTS Management
						</span>
						{fetchType == "test" ? (
							<span className="text-xl text-zinc-500 dark:text-zinc-400">
								{numberOfTest - numberOfPractice} tests
							</span>
						) : (
							<span className="text-xl text-zinc-500 dark:text-zinc-400">
								{numberOfPractice} practices
							</span>
						)}
					</div>
					<AddButton />
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<div className="z-10 w-36">
						<Select
							input={fetchType}
							onChangeInput={onChangeField}
							option={fetchOption}
							placeholder="Test"
						/>
					</div>
					{fetchType == "practice" && (
						<div className="z-10 w-36">
							<Select
								input={currentSkill}
								onChangeInput={onChangeSkill}
								option={skillOption}
								placeholder="All skill"
							/>
						</div>
					)}
					<span className="ml-auto" />
					<SearchBar
						searchValue={searchCriteria.value}
						onChangeSearchValue={onChangeSearchValue}
						search={search}
						placeholder="Search using test name"
					/>
				</div>
				<div className="w-full">
					<TestList />
				</div>

				<Pagination
					numberOfPages={numberOfPage}
					page={currentPage}
					handleChangePage={handleChangePage}
				/>
			</div>
		</main>
	);
}

const fetchOption = [
	{ value: "test", label: "Test" },
	{ value: "practice", label: "Practice" },
];

const skillOption = [
	{ value: "", label: "All skill" },
	{ value: Skill.READING, label: "Reading" },
	{ value: Skill.LISTENING, label: "Listening" },
	{ value: Skill.WRITING, label: "Writing" },
];
