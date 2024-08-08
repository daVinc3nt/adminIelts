"use client";
import { Skill } from "@/app/lib/interfaces";
import AddTagButton from "./components/AddTagButton";
import PopupAddTag from "./components/PopupAddTag";
import PopupUpdateTag from "./components/PopupUpdateTag";
import TagList from "./components/TagList";
import TagManagementProvider, {
	useTagManagement,
} from "./provider/TagManagementProvide";
import Select from "@/components/Select/Select";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Page() {
	return (
		<TagManagementProvider>
			<TagManagement />
		</TagManagementProvider>
	);
}

function TagManagement() {
	const {
		isOpenAddTag,
		isOpenUpdateTag,
		currentSkill,
		fetchType,
		searchValue,
		onChangeCurrentSkill,
		onChangeFetchType,
		onChangeSearchValue,
	} = useTagManagement();

	return (
		<main className="flex justify-center flex-1 main">
			{isOpenAddTag && <PopupAddTag />}
			{isOpenUpdateTag && <PopupUpdateTag />}
			<div className="flex flex-col items-center w-10/12 h-full gap-6 py-4">
				<div className="flex flex-row items-center justify-between w-full h-fit">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						Tags Management
					</span>

					<AddTagButton />
				</div>
				<div className="flex flex-row w-full gap-2 pt-6 h-fit">
					<div className="z-10 w-36">
						<Select
							input={fetchType}
							onChangeInput={onChangeFetchType}
							option={typeOption}
							placeholder="All tags"
						/>
					</div>
					<div className="z-10 w-36">
						<Select
							input={currentSkill}
							onChangeInput={onChangeCurrentSkill}
							option={skillOption}
							placeholder="All skill"
						/>
					</div>

					<span className="ml-auto" />
					<SearchBar
						searchValue={searchValue}
						onChangeSearchValue={onChangeSearchValue}
						search={() => {}}
					/>
				</div>
				<div className="w-full">
					<TagList />
				</div>
			</div>
		</main>
	);
}

const typeOption = [
	{ value: "", label: "All tags" },
	{ value: "true", label: "Quizs tags" },
	{ value: "false", label: "Groups tags" },
];

const skillOption = [
	{ value: "", label: "All skill" },
	{ value: Skill.READING, label: "Reading" },
	{ value: Skill.LISTENING, label: "Listening" },
	{ value: Skill.WRITING, label: "Writing" },
	{ value: Skill.SPEAKING, label: "Speaking" },
];
