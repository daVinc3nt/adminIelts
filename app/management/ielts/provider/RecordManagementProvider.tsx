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

	return (
		<RecordContext.Provider
			value={{
				recordInforList,
				setRecordInforList,
			}}>
			{children}
		</RecordContext.Provider>
	);
}
