"use client";
import { getSid } from "@/app/interface/cookies/cookies";
import { RemarkWriting } from "@/app/lib/interfaces";
import { RecordOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

interface WritingContextType {
	writingAnswer: WritingAnswer;
	isLoading: boolean;

	getWritingAnswerById: (id: string) => void;
	createRemark: (remmark: RemarkWriting) => Promise<boolean>;
	onChangeWritingAnswer: (writingAnwser: WritingAnswer) => void;
}

const WritingContext = createContext<WritingContextType | null>(null);

export const useWriting = () => {
	const context = useContext(WritingContext);
	if (!context) {
		throw new Error("useWriting must be used within a WritingProvider");
	}
	return context;
};

export default function WritingProvider({ children }: { children: ReactNode }) {
	const { setError, setSuccess } = useUtility();

	const [writingAnswer, setWritingAnswer] = useState<WritingAnswer>();
	const [isLoading, setIsLoading] = useState(true);

	const getWritingAnswerById = (id: string) => {
		const newRecordOperation = new RecordOperation();
		newRecordOperation.getWritingAnswer(id as any, getSid()).then((res) => {
			if (res.success && res.data) {
				const record = res.data as WritingAnswer;
				record.remark = record.content;
				record.firstCriterion = "";
				record.secondCriterion = "";
				record.thirdCriterion = "";
				record.fourthCriterion = "";
				setWritingAnswer(record);
			} else {
				setWritingAnswer(null);
				if (res.data == null) {
					setError("Can't find writing answer");
				} else {
					setError(res.message);
					console.error(res.message);
				}
			}
			setIsLoading(false);
		});
	};

	const createRemark = async (remmark: RemarkWriting) => {
		const newRecordOperation = new RecordOperation();
		const res = await newRecordOperation.createWritingRemark(
			writingAnswer.id as any,
			remmark,
			getSid()
		);
		if (res.success) {
			return true;
		}
		setError(res.message);
		console.error(res.message);
		return false;
	};

	const onChangeWritingAnswer = (writingAnwser: WritingAnswer) => {
		setWritingAnswer(writingAnwser);
	};

	return (
		<WritingContext.Provider
			value={{
				writingAnswer,
				isLoading,

				getWritingAnswerById,
				createRemark,
				onChangeWritingAnswer,
			}}>
			{children}
		</WritingContext.Provider>
	);
}
