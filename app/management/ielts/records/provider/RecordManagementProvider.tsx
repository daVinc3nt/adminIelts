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
import { init } from "next/dist/compiled/webpack/webpack";

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

	onChangeSearchCriteria: (criteria: SearchCriteria) => void;
	getTestByTestId: (id: string) => void;
	handleChangePage: (_: any, value: number) => void;
	search: () => void;
	deleteRecord: (id: string) => void;
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
	const { sid } = useAuth();
	const { setError, setSuccess } = useUtility();

	const [test, setTest] = useState<Test>(initTest);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recordList, setRecordList] = useState<RecordInfor[]>();
	const [searchCriteria, setSearchCriteria] =
		useState<SearchCriteria>(initSearchCriteria);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [numberOfPage, setNumberOfPage] = useState<number>(10);

	useEffect(() => {
		if (test && test.id != "") {
			search();
		}
	}, [currentPage, test]);

	const getTestByTestId = (id: string) => {
		const newTestOperation = new TestOperation();
		newTestOperation.findOne(id as any, sid).then((res) => {
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
				throw new Error(res.message);
			}
		});
	};

	const onChangeSearchCriteria = (criteria: SearchCriteria) => {
		setSearchCriteria(criteria);
	};

	const search = () => {
		const newRecordOperation = new RecordOperation();
		const newSearchPayload: SearchPayload = {
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
			newSearchPayload.criteria.push(searchCriteria);
		}

		newRecordOperation.search(newSearchPayload, sid).then((res) => {
			if (res.success && res.data) {
				console.log(res);
				setRecordList(res.data);
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

	const deleteRecord = (id: string) => {
		const newRecordOperation = new RecordOperation();
		newRecordOperation.delete(id as any, sid).then((res) => {
			if (res.success) {
				setSuccess("Delete record successfully");
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

				onChangeSearchCriteria,
				getTestByTestId,
				handleChangePage,
				search,
				deleteRecord,
			}}>
			{children}
		</RecordContext.Provider>
	);
}
