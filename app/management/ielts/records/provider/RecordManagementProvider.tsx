"use client";
import { RecordInfor } from "@/app/interface/record/fulltestRecord";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import recordInfor from "@/app/interface/data/RecordInfor.json";
import { RecordOperation, TestOperation } from "@/app/lib/main";
import { Test } from "@/app/interface/quiz";
import { useAuth } from "@/app/provider/AuthProvider";
import { SearchPayload } from "@/app/lib/interfaces";

interface RecordContextType {
	test: Test;
	currentPage: number;
	recordList: RecordInfor[];

	getTestByTestId: (id: string) => void;
	handleChangePage: (_: any, value: number) => void;
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
	const [test, setTest] = useState<Test>();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recordList, setRecordList] = useState<RecordInfor[]>();

	useEffect(() => {
		const fetchRecordList = () => {
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
			newRecordOperation.search(newSearchPayload, sid).then((res) => {
				if (res.success) {
					console.log(res);
					setRecordList(res.data);
				} else {
					alert(res.message);
				}
			});
		};

		if (test) {
			fetchRecordList();
		}
	}, [currentPage, test]);

	const getTestByTestId = (id: string) => {
		const newTestOperation = new TestOperation();
		newTestOperation.findOne(id as any, sid).then((res) => {
			if (res.success) {
				setTest(res.data);
			} else {
				alert(res.message);
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

				getTestByTestId,
				handleChangePage,
			}}>
			{children}
		</RecordContext.Provider>
	);
}
