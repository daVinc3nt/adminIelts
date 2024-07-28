"use client";
import { useEffect } from "react";
import RecordProvider, { useRecord } from "../provider/RecordProvider";
import RecordPreview from "../components/RecordPreview";
import { Skill } from "@/app/lib/interfaces";
import RecordQuizList from "../components/RecordQuizList";

export default function Page({ params }: { params: { id: string } }) {
	return (
		<RecordProvider>
			<Record id={params.id} />
		</RecordProvider>
	);
}

interface RecordProps {
	id: string;
}

function Record({ id }: RecordProps) {
	const { fetchRecordById, record } = useRecord();

	useEffect(() => {
		fetchRecordById(id);
	}, [id]);

	return (
		<main className="flex items-center justify-center flex-1">
			<div className="flex flex-col items-center w-8/12 min-h-screen gap-4 py-4">
				<RecordQuizList />
				{record &&
					record.reading.map((_, index) => {
						return (
							<RecordPreview
								key={index}
								quizIndex={index}
								quizskill={Skill.READING}
							/>
						);
					})}
				{record &&
					record.listening.map((_, index) => {
						return (
							<RecordPreview
								key={index}
								quizIndex={index}
								quizskill={Skill.LISTENING}
							/>
						);
					})}
			</div>
		</main>
	);
}
