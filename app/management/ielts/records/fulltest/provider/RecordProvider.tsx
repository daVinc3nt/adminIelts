"use client";
import { RecordInfor, RecordTest } from "@/app/interface/record/fulltestRecord";
import { createContext, useContext, useState } from "react";
import { RecordOperation } from "@/app/lib/main";
import { SearchPayload, Skill } from "@/app/lib/interfaces";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { getSid } from "@/app/interface/cookies/cookies";

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
	const { setError, setSuccess } = useUtility();

	const [record, setRecord] = useState<RecordTest>({
		id: "",
		name: "",
		reading: [],
		listening: [],
		writing: [],
		speaking: [],
	});
	const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
	const [currentSkill, setCurrentSkill] = useState<Skill>(Skill.READING);

	const fetchRecordById = (id: string) => {
		const newRecordOperation = new RecordOperation();
		newRecordOperation.findOne(id as any, getSid()).then((res) => {
			if (res.success) {
				if (!res.data) {
					setError("Record not found");
					setRecord(null);
					return;
				}
				if (res.data.reading.length > 0) {
					setCurrentSkill(Skill.READING);
				} else if (res.data.listening.length > 0) {
					setCurrentSkill(Skill.LISTENING);
				} else if (res.data.writing.length > 0) {
					setCurrentSkill(Skill.WRITING);
				}
				setRecord(res.data);
			} else {
				setRecord(null);
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
