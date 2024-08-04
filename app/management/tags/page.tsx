"use client";
import AddTagButton from "./components/AddTagButton";
import PopupAddTag from "./components/PopupAddTag";
import PopupUpdateTag from "./components/PopupUpdateTag";
import SelectSkillTypeButton from "./components/SelectSkillType";
import SelectFetchTypeButton from "./components/SelectTagType";
import TagList from "./components/TagList";
import TagSearchBar from "./components/TagSearchBar";
import TagManagementProvider, {
	useTagManagement,
} from "./provider/TagManagementProvide";

export default function Page() {
	return (
		<TagManagementProvider>
			<TagManagement />
		</TagManagementProvider>
	);
}

function TagManagement() {
	const { isOpenAddTag, isOpenUpdateTag } = useTagManagement();

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
					<SelectFetchTypeButton />
					<SelectSkillTypeButton />

					<TagSearchBar />
				</div>
				<div className="w-full">
					<TagList />
				</div>
			</div>
		</main>
	);
}
