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

interface RecordContextType {
	test: Test;
	currentPage: number;
	recordList: RecordInfor[];
	searchCriteria: SearchCriteria;
	isLoading: boolean;

	onChangeSearchCriteria: (criteria: SearchCriteria) => void;
	getTestByTestId: (id: string) => void;
	handleChangePage: (_: any, value: number) => void;
	search: () => void;
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
	const { setError } = useUtility();

	const [test, setTest] = useState<Test>();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recordList, setRecordList] = useState<RecordInfor[]>();
	const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
		field: "",
		operator: "~",
		value: "",
	});
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (test) {
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
				setIsLoading(false);
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
				sort: [],
				page: currentPage,
				size: 6,
				group: null,
			},
		};
		if (searchCriteria.value != "" && searchCriteria.field != "") {
			newSearchPayload.criteria.push(searchCriteria);
		}
		newRecordOperation.search(newSearchPayload, sid).then((res) => {
			if (res.success) {
				console.log(res);
				setRecordList(res.data);
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

				onChangeSearchCriteria,
				getTestByTestId,
				handleChangePage,
				search,
			}}>
			{children}
		</RecordContext.Provider>
	);
}
