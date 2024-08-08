"use client";
import { Flashcard } from "@/app/interface/flashcard/flashcard";
import { FTag } from "@/app/interface/tag/tag";
import {
	CreateFullFlashCard,
	SearchCriteria,
	SearchPayload,
} from "@/app/lib/interfaces";
import {
	FlashCardOperation,
	FTagOperation,
	UploadOperation,
} from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { createContext, useContext, useEffect, useState } from "react";

const numberOfFlashcardPerPage = 40;
const initSearchCriteria: SearchCriteria = {
	field: "word",
	operator: "~",
	value: "",
};

interface FlashcardContextType {
	flashcardList: Flashcard[];
	currentFlashcard: Flashcard;
	fetchType: string;
	searchCriteria: SearchCriteria;
	isOpenAddFlashcard: boolean;
	flashcardIndex: number;
	isOpenUpdateFlashcard: boolean;
	fTagList: FTag[];
	currentPage: number;
	numberOfPages: number;
	isLoading: boolean;
	currentTag: string;

	addFlashcard: (flashcard: CreateFullFlashCard) => Promise<boolean>;
	updateFlashcard: (flashcard: CreateFullFlashCard, id: string) => void;
	deleteFlashcard: (id: string) => void;
	onSelectFlashcard: (flashcard: Flashcard) => void;
	onChangeFetchType: (value: string) => void;
	onChangeSearchCritera: (value: SearchCriteria) => void;
	onChangeIsOpenAddFlashcard: (value: boolean) => void;
	onChangeFlashCardIndex: (value: number) => void;
	onChangeIsOpenUpdateFlashcard: (value: boolean) => void;
	getImagePath: (path: string | null) => Promise<any>;
	createFtag: (value: string) => void;
	deleteFtag: (id: string) => void;
	onChangePage: (_: any, page: number) => void;
	onChangeCurrentTag: (value: string) => void;
	fetchFlashcardList: () => void;
}

const FlashcardContext = createContext<FlashcardContextType | null>(null);

export const useFlashcardManagement = () => {
	const context = useContext(FlashcardContext);
	if (!context) {
		throw new Error(
			"useFlashcardManagement must be used within a FlashcardProvider"
		);
	}
	return context;
};

export default function FlashcardManagementProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { sid } = useAuth();
	const { setError, setSuccess } = useUtility();
	const [flashcardList, setFlashcardList] = useState<Flashcard[]>([]);
	const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard>(null);
	const [fetchType, setFetchType] = useState<string>("");
	const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
	const [isOpenAddFlashcard, setIsOpenAddFlashcard] =
		useState<boolean>(false);
	const [isOpenUpdateFlashcard, setIsOpenUpdateFlashcard] =
		useState<boolean>(false);
	const [searchCriteria, setSearchCritera] =
		useState<SearchCriteria>(initSearchCriteria);
	const [fTagList, setFTagList] = useState<FTag[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [numberOfPages, setNumberOfPages] = useState<number>(10);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [currentTag, setCurrentTag] = useState<string>("");

	useEffect(() => {
		fetchFlashcardList();
	}, [currentPage]);

	const fetchFlashcardList = () => {
		const newFlashcardOperation = new FlashCardOperation();

		const searchPayload: SearchPayload = {
			criteria: [],
			addition: {
				sort: [],
				page: currentPage,
				size: numberOfFlashcardPerPage,
				group: null,
			},
		};
		if (searchCriteria.value !== "") {
			searchPayload.criteria.push(searchCriteria);
		}
		if (currentTag !== "") {
			searchPayload.criteria.push({
				field: "tag",
				operator: "=",
				value: currentTag,
			});
		}

		console.log(searchPayload);

		newFlashcardOperation.search(searchPayload, sid).then((res) => {
			if (res.success) {
				console.log(res.data);
				setFlashcardList(res.data);
			} else {
				setError(res.message);
				console.error(res.message);
			}
			setIsLoading(false);
		});
	};

	useEffect(() => {
		const fetchFTagList = () => {
			const newFTagOperation = new FTagOperation();
			newFTagOperation
				.search(
					{
						criteria: [
							{
								field: "isPublic",
								operator: "=",
								value: true,
							},
						],
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
						setFTagList(res.data);
					} else {
						setError(res.message);
						console.error(res.message);
					}
				});
		};

		fetchFTagList();
	}, []);

	const createFtag = (value: string) => {
		if (!value || value == "" || value.trim() == "") {
			setError("Tag value can not be empty");
			return;
		}
		const newFTagOperation = new FTagOperation();
		newFTagOperation.create({ value, isPublic: true }, sid).then((res) => {
			if (res.success) {
				setSuccess("Create tag successfully");
				setFTagList([...fTagList, res.data]);
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const deleteFtag = (id: string) => {
		const newFTagOperation = new FTagOperation();
		newFTagOperation.delete(id as any, sid).then((res) => {
			if (res.success) {
				setSuccess("Delete tag successfully");
				setFTagList(fTagList.filter((tag) => tag.id !== id));
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const addFlashcard = async (flashcard: CreateFullFlashCard) => {
		const newFlashcardOperation = new FlashCardOperation();
		const res = await newFlashcardOperation.create(flashcard, sid);
		if (res.success) {
			setSuccess("Add flashcard successfully");
			setFlashcardList([...flashcardList, res.data]);
			return true;
		}
		setError(res.message);
		console.error(res.message);
		return false;
	};

	const updateFlashcard = (flashcard: CreateFullFlashCard, id: string) => {
		const newFlashcardOperation = new FlashCardOperation();
		newFlashcardOperation.update(id as any, flashcard, sid).then((res) => {
			if (res.success) {
				setSuccess("Update flashcard successfully");
				setFlashcardList(
					flashcardList.map((flashcard) =>
						flashcard.id === id ? res.data : flashcard
					)
				);
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const deleteFlashcard = (id: string) => {
		const newFlashcardOperation = new FlashCardOperation();
		newFlashcardOperation.delete(id as any, sid).then((res) => {
			if (res.success) {
				setSuccess("Delete flashcard successfully");
				setFlashcardList(
					flashcardList.filter((flashcard) => flashcard.id !== id)
				);
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const onSelectFlashcard = (flashcard: Flashcard) => {
		setCurrentFlashcard(flashcard);
	};

	const onChangeFetchType = (value: string) => {
		setFetchType(value);
	};

	const onChangeSearchCritera = (value: SearchCriteria) => {
		setSearchCritera(value);
	};

	const onChangeIsOpenAddFlashcard = (value: boolean) => {
		setIsOpenAddFlashcard(value);
	};

	const onChangeIsOpenUpdateFlashcard = (value: boolean) => {
		setIsOpenUpdateFlashcard(value);
	};

	const onChangeFlashCardIndex = (value: number) => {
		setFlashcardIndex(value);
	};

	const getImagePath = async (path: string | null) => {
		if (!path) return null;
		const newUploadOperation = new UploadOperation();
		const res = await newUploadOperation.search(path, sid);
		if (res.success) {
			return res.data;
		}
		return null;
	};

	const onChangePage = (_: any, page: number) => {
		console.log(page);
		setCurrentPage(page);
	};

	const onChangeCurrentTag = (value: string) => {
		setCurrentTag(value);
	};

	return (
		<FlashcardContext.Provider
			value={{
				flashcardList,
				currentFlashcard,
				fetchType,
				searchCriteria,
				isOpenAddFlashcard,
				flashcardIndex,
				isOpenUpdateFlashcard,
				fTagList,
				currentPage,
				numberOfPages,
				isLoading,
				currentTag,

				addFlashcard,
				updateFlashcard,
				deleteFlashcard,
				onSelectFlashcard,
				onChangeFetchType,
				onChangeSearchCritera,
				onChangeIsOpenAddFlashcard,
				onChangeFlashCardIndex,
				onChangeIsOpenUpdateFlashcard,
				getImagePath,
				createFtag,
				deleteFtag,
				onChangePage,
				onChangeCurrentTag,
				fetchFlashcardList,
			}}>
			{children}
		</FlashcardContext.Provider>
	);
}
