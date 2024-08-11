"use client";
import { getSid } from "@/app/interface/cookies/cookies";
import {
	getRemarkRequestPrivilege,
	getRoleFromRoleInfor,
} from "@/app/interface/privilegeconfig/privilegeconfig";
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
	numberOfPages: number;
	numberOfWriting: number;
	hasPrivilege: boolean;

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
	const { userInformation, privilage } = useAuth();
	const { setError, setSuccess } = useUtility();

	const [writingList, setWritingList] = useState<WritingAnswerInfor[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchCriteria, setSearchCriteria] =
		useState<SearchCriteria>(initSearchCriteria);
	const [numberOfPages, setNumberOfPages] = useState<number>(10);
	const [numberOfWriting, setNumberOfWriting] = useState<number>(0);
	const [hasPrivilege, setHasPrivilege] = useState<boolean>(false);

	useEffect(() => {
		const userRoles = userInformation?.roles;
		if (userRoles) {
			const newPrivilege = getRemarkRequestPrivilege(
				getRoleFromRoleInfor(userRoles),
				"search",
				privilage
			);
			setHasPrivilege(newPrivilege);
		}
	}, [privilage, userInformation]);

	useEffect(() => {
		search();
	}, []);

	const search = () => {
		const newRemarkOperation = new RemarkRequestOperation();

		const searchPayLoad: SearchPayload = {
			criteria: [],
			addition: {
				sort: [["createdAt", "DESC"]],
				page: currentPage,
				size: numberOfItemsPerPage,
				group: null,
			},
		};

		if (searchCriteria.field != "" && searchCriteria.value.trim() != "") {
			searchPayLoad.criteria.push(searchCriteria);
		}

		newRemarkOperation.search(searchPayLoad, getSid()).then((res) => {
			if (res.success && res.data) {
				setWritingList(res.data);
				if (searchPayLoad.criteria.length == 0) {
					newRemarkOperation.count(getSid()).then((res) => {
						if (res.success) {
							setNumberOfWriting(res.data);
							setNumberOfPages(
								Math.ceil(res.data / numberOfItemsPerPage)
							);
						} else {
							setError(res.message);
						}
					});
				} else {
					if (res.data.length == numberOfItemsPerPage) {
						setNumberOfPages(2);
					} else {
						setNumberOfPages(1);
					}
				}
			} else {
				setWritingList(null);
				setError(res.message);
			}
		});
		setCurrentPage(1);
		setIsLoading(false);
	};

	const changePage = () => {
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

		newRemarkOperation.search(searchPayLoad, getSid()).then((res) => {
			if (res.success && res.data) {
				setWritingList(res.data);
				if (searchPayLoad.criteria.length > 0) {
					if (
						res.data.length == numberOfItemsPerPage &&
						currentPage == numberOfPages
					) {
						setNumberOfPages(numberOfPages + 1);
					}
				}
			} else {
				setWritingList(null);
				setError(res.message);
			}
		});
	};

	useEffect(() => {
		if (!isLoading) {
			changePage();
		}
	}, [currentPage]);

	const onRefresh = () => {
		setIsLoading(true);
		setTimeout(() => {
			changePage();
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
		newRemarkOperation.delete(id as any, getSid()).then((res) => {
			if (res.success) {
				setSuccess("Delete successfully");
				setNumberOfWriting(numberOfWriting - 1);
				search();
			} else {
				setError(res.message);
				console.error(res.message);
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
				numberOfPages,
				numberOfWriting,
				hasPrivilege,

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