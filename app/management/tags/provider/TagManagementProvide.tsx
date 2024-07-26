"use client";
import { Tag } from "@/app/interface/tag";
import { TagOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
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
	addTag: (tag: Tag) => Promise<boolean>;
	updateTag: (tag: Tag) => Promise<boolean>;
	deleteTag: (id: string) => void;
	onSelectTag: (tag: Tag) => void;
	onChangeFetchType: (value: string) => void;
	onChangeSearchValue: (value: string) => void;
	onChangeIsOpenAddTag: (value: boolean) => void;
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
	const [tagList, setTagList] = useState<Tag[]>([]);
	const [currentTag, setCurrentTag] = useState<Tag>(null);
	const [fetchType, setFetchType] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");
	const [isOpenAddTag, setIsOpenAddTag] = useState<boolean>(false);

	useEffect(() => {
		const fetchTagList = () => {
			const newTagOperation = new TagOperation();
			newTagOperation.search(sid).then((res) => {
				if (res.success) {
					setTagList(res.data);
				} else {
					alert(res.message);
				}
			});
		};

		fetchTagList();
	}, []);

	const addTag = async (tag: Tag) => {
		const newTagOperation = new TagOperation();
		const res = await newTagOperation.create(tag, sid);
		if (res.success) {
			setTagList([...tagList, res.data]);
			alert("Add tag successfully");
			return true;
		}
		alert(res.message);
		return false;
	};

	const updateTag = async (tag: Tag) => {
		const newTagOperation = new TagOperation();
		if (tag.id) {
			const res = await newTagOperation.update(tag.id as UUID, tag, sid);
			if (res.success) {
				const newTagList = tagList.map((item) =>
					item.id === tag.id ? tag : item
				);
				setTagList(newTagList);
				alert("Update tag successfully");
				return true;
			}
			alert(res.message);
			return false;
		}
	};

	const deleteTag = (id: string) => {
		const newTagOperation = new TagOperation();
		newTagOperation.delete(id as UUID, sid).then((res) => {
			if (res.success) {
				const newTagList = tagList.filter((item) => item.id !== id);
				setTagList(newTagList);
				alert("Delete tag successfully");
			} else {
				alert(res.message);
			}
		});
	};

	const onSelectTag = (tag: Tag) => {
		setCurrentTag(tag);
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

	return (
		<TagContext.Provider
			value={{
				tagList,
				currentTag,
				fetchType,
				searchValue,
				isOpenAddTag,
				addTag,
				updateTag,
				deleteTag,
				onSelectTag,
				onChangeFetchType,
				onChangeSearchValue,
				onChangeIsOpenAddTag,
			}}>
			{children}
		</TagContext.Provider>
	);
}
