"use client";
import { RemarkWriting } from "@/app/lib/interfaces";
import { RecordOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { cn } from "@nextui-org/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface WritingContextType {
	writingAnswer: WritingAnswer;

	getWritingAnswerById: (id: string) => void;
	createRemark: (remmark: RemarkWriting) => void;
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
	const { sid } = useAuth();
	const { setError } = useUtility();

	const [writingAnswer, setWritingAnswer] = useState<WritingAnswer>({
		id: "",
		content: "",
		firstCriterion: "",
		secondCriterion: "",
		thirdCriterion: "",
		fourthCriterion: "",
		remark: "",
	});

	const getWritingAnswerById = (id: string) => {
		const newRecordOperation = new RecordOperation();
		newRecordOperation.getWritingAnswer(id as any, sid).then((res) => {
			console.log(res);
			if (res.success && res.data) {
				res.data.remark = res.data.content;
				setWritingAnswer(res.data);
			} else {
				if (res.data == null) {
					setError("Can't find writing answer");
				} else {
					setError(res.message);
					console.error(res.message);
				}
			}
		});
	};

	const createRemark = (remmark: RemarkWriting) => {
		const newRecordOperation = new RecordOperation();
		newRecordOperation
			.createWritingRemark(writingAnswer.id as any, remmark, sid)
			.then((res) => {
				if (res.success) {
					console.log("success");
				} else {
				}
			});
	};

	const onChangeWritingAnswer = (writingAnwser: WritingAnswer) => {
		setWritingAnswer(writingAnwser);
	};

	return (
		<WritingContext.Provider
			value={{
				writingAnswer,

				getWritingAnswerById,
				createRemark,
				onChangeWritingAnswer,
			}}>
			{children}
		</WritingContext.Provider>
	);
}
