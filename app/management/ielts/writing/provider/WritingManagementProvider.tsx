"use client";
import { SearchCriteria, SearchPayload } from "@/app/lib/interfaces";
import { RemarkRequestOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

//Constant declaration
const numberOfItemsPerPage = 6;
const initSearchCriteria: SearchCriteria = {
	field: "",
	operator: "~",
	value: "",
};

interface WritingManagementContextType {
	writingList: WritingAnswerInfor[];
	currentPage: number;
	searchCriteria: SearchCriteria;
	isLoading: boolean;

	search: () => void;
	handleChangePage: (_: any, page: number) => void;
	onChangeSearchCriteria: (criteria: SearchCriteria) => void;
	onDelete: (id: string) => void;
	onRefresh: () => void;
}

const WritingManagementContext =
	createContext<WritingManagementContextType | null>(null);

export const useWritingManagement = () => {
	const context = useContext(WritingManagementContext);
	if (!context) {
		throw new Error(
			"useWritingManagement must be used within a WritingManagementProvider"
		);
	}
	return context;
};

export default function WritingManagementProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { sid } = useAuth();
	const { setError, setSuccess } = useUtility();

	const [writingList, setWritingList] = useState<WritingAnswerInfor[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchCriteria, setSearchCriteria] =
		useState<SearchCriteria>(initSearchCriteria);

	useEffect(() => {
		search();
	}, [currentPage]);

	const search = () => {
		const newRemarkOperation = new RemarkRequestOperation();

		const searchPayLoad: SearchPayload = {
			criteria: [],
			addition: {
				sort: [],
				page: currentPage,
				size: numberOfItemsPerPage,
				group: null,
			},
		};

		if (searchCriteria.field != "" && searchCriteria.value.trim() != "") {
			searchPayLoad.criteria.push(searchCriteria);
		}

		newRemarkOperation.search(searchPayLoad, sid).then((res) => {
			if (res.success && res.data) {
				setWritingList(res.data);
			} else {
				setWritingList(null);
				setError(res.message);
			}
		});
		setIsLoading(false);
	};

	const onRefresh = () => {
		setIsLoading(true);
		setTimeout(() => {
			search();
		}, 100);
	};

	const handleChangePage = (_: any, page: number) => {
		setCurrentPage(page);
	};

	const onChangeSearchCriteria = (criteria: SearchCriteria) => {
		setSearchCriteria(criteria);
	};

	const onDelete = (id: string) => {
		const newRemarkOperation = new RemarkRequestOperation();
		newRemarkOperation.delete(id as any, sid).then((res) => {
			if (res.success) {
				setSuccess("Delete successfully");
				search();
			} else {
				setError(res.message);
				console.log(res.message);
			}
		});
	};

	return (
		<WritingManagementContext.Provider
			value={{
				writingList,
				currentPage,
				searchCriteria,
				isLoading,

				search,
				handleChangePage,
				onChangeSearchCriteria,
				onDelete,
				onRefresh,
			}}>
			{children}
		</WritingManagementContext.Provider>
	);
}