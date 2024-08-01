"use client";
import { RecordTest } from "@/app/interface/record/fulltestRecord";
import { createContext, useContext, useState } from "react";
import { RecordOperation } from "@/app/lib/main";
import { Skill } from "@/app/lib/interfaces";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";

interface RecordContextType {
	record: RecordTest;
	currentQuizIndex: number;
	currentSkill: Skill;
	fetchRecordById: (id: string) => void;
	onChangeCurrentQuizIndex: (value: number) => void;
	onChangeSkill: (value: Skill) => void;
}

const RecordContext = createContext<RecordContextType | null>(null);

export const useRecord = () => {
	const context = useContext(RecordContext);
	if (!context) {
		throw new Error("useRecord must be used within a RecordProvider");
	}
	return context;
};

export default function RecordProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { sid } = useAuth();
	const { setError, setSuccess } = useUtility();

	const [record, setRecord] = useState<RecordTest>();
	const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
	const [currentSkill, setCurrentSkill] = useState<Skill>(Skill.READING);

	const fetchRecordById = (id: string) => {
		const newRecordOperation = new RecordOperation();
		newRecordOperation.findOne(id as any, sid).then((res) => {
			if (res.success) {
				console.log(res.data);
				setRecord(res.data);
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const onChangeCurrentQuizIndex = (value: number) => {
		setCurrentQuizIndex(value);
	};

	const onChangeSkill = (value: Skill) => {
		setCurrentSkill(value);
	};

	return (
		<RecordContext.Provider
			value={{
				record,
				currentQuizIndex,
				currentSkill,

				fetchRecordById,
				onChangeCurrentQuizIndex,
				onChangeSkill,
			}}>
			{children}
		</RecordContext.Provider>
	);
}
