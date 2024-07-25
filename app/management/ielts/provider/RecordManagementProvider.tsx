"use client";
import { RecordInfor } from "@/app/interface/record";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	use,
	useContext,
	useEffect,
	useState,
} from "react";
import recordInfor from "@/app/interface/data/RecordInfor.json";
import { TestInfor } from "@/app/interface/quiz";
import { TestOperation } from "@/app/lib/main";
import { FetchingType, SearchPayload, Skill } from "@/app/lib/interfaces";
import { testToken } from "@/app/interface/user";

interface RecordContextType {
	recordInforList: RecordInfor[];
	setRecordInforList: Dispatch<SetStateAction<RecordInfor[]>>;
	testInforList: TestInfor[];
	setTestInforList: Dispatch<SetStateAction<TestInfor[]>>;
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
	const [recordInforList, setRecordInforList] =
		useState<RecordInfor[]>(recordInfor);

	const [testInforList, setTestInforList] = useState<TestInfor[]>([]);

	useEffect(() => {
		const newTestOperation = new TestOperation();

		const newTestInforList: TestInfor[] = [];
		recordInfor.forEach((recordInfor) => {
			newTestOperation
				.findOne(recordInfor.testId as any, testToken)
				.then((res) => {
					if (res.success) {
						newTestInforList.push({
							id: res.data.id,
							name: res.data.name,
							createdAt: res.data.createdAt,
							updatedAt: res.data.updatedAt,
						});
						setTestInforList(newTestInforList);
					} else {
						newTestInforList.push({
							id: "",
							name: "",
							createdAt: "",
							updatedAt: "",
						} as any);
					}
				});
		});
	}, [recordInforList]);

	return (
		<RecordContext.Provider
			value={{
				recordInforList,
				setRecordInforList,
				testInforList,
				setTestInforList,
			}}>
			{children}
		</RecordContext.Provider>
	);
}
