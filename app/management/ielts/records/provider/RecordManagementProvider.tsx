"use client";
import { RecordInfor } from "@/app/interface/record/fulltestRecord";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { RecordOperation, TestOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { SearchCriteria, SearchPayload } from "@/app/lib/interfaces";
import { ReciveTestToTest, Test } from "@/app/interface/test/test";
import { useUtility } from "@/app/provider/UtilityProvider";
import {
	getRecordPrivilege,
	getRoleFromRoleInfor,
} from "@/app/interface/privilegeconfig/privilegeconfig";
import { getSid } from "@/app/interface/cookies/cookies";

const numberOfItemPerPage = 6;
const initSearchCriteria: SearchCriteria = {
	field: "",
	operator: "~",
	value: "",
};
const initTest: Test = {
	id: "",
};

interface RecordContextType {
	test: Test;
	currentPage: number;
	recordList: RecordInfor[];
	searchCriteria: SearchCriteria;
	isLoading: boolean;
	numberOfPage: number;
	numberOfRecord: number;
	hasPrivilege: boolean;

	onChangeSearchCriteria: (criteria: SearchCriteria) => void;
	getTestByTestId: (id: string) => void;
	handleChangePage: (_: any, value: number) => void;
	search: () => void;
	deleteRecord: (id: string) => void;
	refresh: () => void;
}

const RecordContext = createContext<RecordContextType | null>(null);

export const useRecordManagement = () => {
	const context = useContext(RecordContext);
	if (!context) {
		throw new Error(
			"useRecordManagement must be used within a RecordManagementProvider"
		);
	}
	return context;
};

export default function RecordManagementProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { userInformation, privilage } = useAuth();
	const { setError, setSuccess } = useUtility();

	const [test, setTest] = useState<Test>(initTest);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recordList, setRecordList] = useState<RecordInfor[]>();
	const [searchCriteria, setSearchCriteria] =
		useState<SearchCriteria>(initSearchCriteria);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [numberOfPage, setNumberOfPage] = useState<number>(10);
	const [numberOfRecord, setNumberOfRecord] = useState<number>(0);
	const [hasPrivilege, setHasPrivilege] = useState<boolean>(false);

	const refresh = () => {
		setIsLoading(true);
		setTimeout(() => {
			changePage();
			setIsLoading(false);
		}, 100);
	};

	useEffect(() => {
		const userRoles = userInformation?.roles;
		if (userRoles) {
			const newPrivilege = getRecordPrivilege(
				getRoleFromRoleInfor(userRoles),
				"delete",
				privilage
			);
			setHasPrivilege(newPrivilege);
		}
	}, [privilage, userInformation]);

	const getTestByTestId = (id: string) => {
		const newTestOperation = new TestOperation();
		newTestOperation.findOne(id as any, getSid()).then((res) => {
			if (res.success) {
				if (!res.data) {
					setError("Test not found");
					setTest(null);
					return;
				}
				setTest(ReciveTestToTest(res.data));
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
		newTestOperation
			.countRecordByTestId(id as any, getSid())
			.then((res) => {
				if (res.success) {
					setNumberOfRecord(res.data);
				} else {
					setError(res.message);
					console.error(res.message);
				}
			});
	};

	const onChangeSearchCriteria = (criteria: SearchCriteria) => {
		setSearchCriteria(criteria);
	};

	useEffect(() => {
		if (test && test.id != "") {
			search();
		}
	}, [test]);

	const search = () => {
		const newRecordOperation = new RecordOperation();
		const searchPayload: SearchPayload = {
			criteria: [
				{
					field: "testId",
					operator: "=",
					value: test.id,
				},
			],
			addition: {
				sort: [["createdAt", "DESC"]],
				page: currentPage,
				size: numberOfItemPerPage,
				group: null,
			},
		};

		if (searchCriteria.value != "" && searchCriteria.field != "") {
			searchPayload.criteria.push(searchCriteria);
		}
		newRecordOperation.search(searchPayload, getSid()).then((res) => {
			if (res.success && res.data) {
				setRecordList(res.data);
				if (searchPayload.criteria.length == 1) {
					setNumberOfPage(
						Math.ceil(numberOfRecord / numberOfItemPerPage)
					);
				} else {
					if (res.data.length == numberOfItemPerPage) {
						setNumberOfPage(2);
					} else {
						setNumberOfPage(1);
					}
				}
			} else {
				if (!res.data) {
					setRecordList([]);
				} else {
					setError(res.message);
					console.error(res.message);
					throw new Error(res.message);
				}
			}
			setIsLoading(false);
		});
	};

	const changePage = () => {
		const newRecordOperation = new RecordOperation();
		const searchPayload: SearchPayload = {
			criteria: [
				{
					field: "testId",
					operator: "=",
					value: test.id,
				},
			],
			addition: {
				sort: [],
				page: currentPage,
				size: numberOfItemPerPage,
				group: null,
			},
		};
		if (searchCriteria.value != "" && searchCriteria.field != "") {
			searchPayload.criteria.push(searchCriteria);
		}

		newRecordOperation.search(searchPayload, getSid()).then((res) => {
			if (res.success && res.data) {
				setRecordList(res.data);
				if (searchPayload.criteria.length > 0) {
					if (
						res.data.length == numberOfItemPerPage &&
						currentPage == numberOfPage
					) {
						setNumberOfPage(numberOfPage + 1);
					}
				}
			} else {
				if (!res.data) {
					setRecordList([]);
				} else {
					setError(res.message);
					console.error(res.message);
					throw new Error(res.message);
				}
			}
			setIsLoading(false);
		});
	};

	useEffect(() => {
		if (!isLoading) {
			changePage();
		}
	}, [currentPage]);

	const deleteRecord = (id: string) => {
		const newRecordOperation = new RecordOperation();
		newRecordOperation.delete(id as any, getSid()).then((res) => {
			if (res.success) {
				setSuccess("Delete record successfully");
				setNumberOfRecord(numberOfRecord - 1);
				search();
			} else {
				setError(res.message);
				console.error(res.message);
				throw new Error(res.message);
			}
		});
	};

	const handleChangePage = (_: any, value: number) => {
		setCurrentPage(value);
	};

	return (
		<RecordContext.Provider
			value={{
				test,
				recordList,
				currentPage,
				searchCriteria,
				isLoading,
				numberOfPage,
				numberOfRecord,
				hasPrivilege,

				onChangeSearchCriteria,
				getTestByTestId,
				handleChangePage,
				search,
				deleteRecord,
				refresh,
			}}>
			{children}
		</RecordContext.Provider>
	);
}
