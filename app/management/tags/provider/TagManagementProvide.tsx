"use client";
import { Tag } from "@/app/interface/tag/tag";
import { TagOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { UUID } from "crypto";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface TagContextType {
	tagList: Tag[];
	currentTag: Tag;
	fetchType: string;
	searchValue: string;
	isOpenAddTag: boolean;
	tagIndex: number;
	isOpenUpdateTag: boolean;
	currentSkill: string;
	isLoading: boolean;

	addTag: (tag: Tag) => Promise<boolean>;
	updateTag: (tag: Tag, noNotificate?: boolean) => Promise<boolean>;
	deleteTag: (id: string) => void;
	onSelectTag: (tag: Tag) => void;
	onChangeFetchType: (value: string) => void;
	onChangeSearchValue: (value: string) => void;
	onChangeIsOpenAddTag: (value: boolean) => void;
	onChangeTagIndex: (index: number) => void;
	onChangeIsOpenUpdateTag: (value: boolean) => void;
	onChangeCurrentSkill: (skill: string) => void;
}

const TagContext = createContext<TagContextType | null>(null);

export const useTagManagement = () => {
	const context = useContext(TagContext);
	if (!context) {
		throw new Error("useTagManagement must be used within a TagProvider");
	}
	return context;
};

export default function TagManagementProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { sid } = useAuth();
	const { setError, setSuccess } = useUtility();

	const [tagList, setTagList] = useState<Tag[]>([]);
	const [currentTag, setCurrentTag] = useState<Tag>(null);
	const [fetchType, setFetchType] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");
	const [isOpenAddTag, setIsOpenAddTag] = useState<boolean>(false);
	const [isOpenUpdateTag, setIsOpenUpdateTag] = useState<boolean>(false);
	const [tagIndex, setTagIndex] = useState<number>(0);
	const [currentSkill, setCurrentSkill] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTagList = () => {
			const newTagOperation = new TagOperation();
			newTagOperation
				.search(
					{
						criteria: [],
						addition: {
							sort: [],
							page: 1,
							size: 1000,
							group: [],
						},
					},
					sid
				)
				.then((res) => {
					if (res.success) {
						setTagList(res.data);
					} else {
						setError(res.message);
						console.error(res.message);
					}
					setIsLoading(false);
				});
		};

		fetchTagList();
	}, []);

	const onChangeCurrentSkill = (skill: string) => {
		setCurrentSkill(skill);
	};

	const addTag = async (tag: Tag) => {
		const newTagOperation = new TagOperation();
		const res = await newTagOperation.create(tag as any, sid);
		if (res.success) {
			setTagList([...tagList, res.data]);
			setSuccess("Add tag successfully");
			return true;
		}
		setError(res.message);
		console.error(res.message);
		return false;
	};

	const updateTag = async (tag: Tag, noNotificate?: boolean) => {
		const newTagOperation = new TagOperation();
		console.log(tag);
		if (tag.id) {
			const res = await newTagOperation.update(
				tag.id as UUID,
				tag as any,
				sid
			);
			if (res.success) {
				console.log(res.data);
				const newTagList = tagList.map((item) =>
					item.id === tag.id ? res.data : item
				);
				setTagList(newTagList);
				if (!noNotificate) {
					setSuccess("Update tag successfully");
				}
				return true;
			}
			setError(res.message);
			console.error(res.message);
			return false;
		}
	};

	const deleteTag = (id: string) => {
		const newTagOperation = new TagOperation();
		newTagOperation.delete(id as UUID, sid).then((res) => {
			if (res.success) {
				const newTagList = tagList.filter((item) => item.id !== id);
				setTagList(newTagList);
				setSuccess("Delete tag successfully");
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const onSelectTag = (tag: Tag) => {
		setCurrentTag(tag);
	};

	const onChangeTagIndex = (index: number) => {
		setTagIndex(index);
	};

	const onChangeFetchType = (value: string) => {
		setFetchType(value);
	};

	const onChangeSearchValue = (value: string) => {
		setSearchValue(value);
	};

	const onChangeIsOpenAddTag = (value: boolean) => {
		setIsOpenAddTag(value);
	};

	const onChangeIsOpenUpdateTag = (value: boolean) => {
		setIsOpenUpdateTag(value);
	};

	return (
		<TagContext.Provider
			value={{
				tagList,
				currentTag,
				fetchType,
				searchValue,
				isOpenAddTag,
				tagIndex,
				isOpenUpdateTag,
				currentSkill,
				isLoading,

				addTag,
				updateTag,
				deleteTag,
				onSelectTag,
				onChangeFetchType,
				onChangeSearchValue,
				onChangeIsOpenAddTag,
				onChangeTagIndex,
				onChangeIsOpenUpdateTag,
				onChangeCurrentSkill,
			}}>
			{children}
		</TagContext.Provider>
	);
}
