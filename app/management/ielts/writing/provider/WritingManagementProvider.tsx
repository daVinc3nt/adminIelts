"use client";
import { SearchCriteria } from "@/app/lib/interfaces";
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

interface WritingManagementContextType {
	writingList: WritingAnswerInfor[];
	currentPage: number;
	searchCriteria: SearchCriteria;

	search: () => void;
	handleChangePage: (_: any, page: number) => void;
	onChangeSearchCriteria: (criteria: SearchCriteria) => void;
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
	const { setError } = useUtility();

	const [writingList, setWritingList] = useState<WritingAnswerInfor[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>();

	useEffect(() => {
		search();
	}, [currentPage]);

	const search = () => {
		const newRemarkOperation = new RemarkRequestOperation();
		newRemarkOperation
			.search(
				{
					criteria: [],
					addition: {
						sort: [],
						page: currentPage,
						size: 6,
						group: null,
					},
				},
				sid
			)
			.then((res) => {
				if (res.success && res.data) {
					setWritingList(res.data);
				} else {
					setWritingList([]);
					setError(res.message);
				}
			});
	};

	const handleChangePage = (_: any, page: number) => {
		setCurrentPage(page);
	};

	const onChangeSearchCriteria = (criteria: SearchCriteria) => {
		setSearchCriteria(criteria);
	};

	return (
		<WritingManagementContext.Provider
			value={{
				writingList,
				currentPage,
				searchCriteria,
				search,
				handleChangePage,
				onChangeSearchCriteria,
			}}>
			{children}
		</WritingManagementContext.Provider>
	);
}
