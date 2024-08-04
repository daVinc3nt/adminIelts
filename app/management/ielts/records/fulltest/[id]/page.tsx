"use client";
import { Fragment, useEffect } from "react";
import RecordProvider, { useRecord } from "../provider/RecordProvider";
import RecordPreview from "../components/RecordPreview";
import { Skill } from "@/app/lib/interfaces";
import RecordQuizList from "../components/RecordQuizList";
import QuizRecordInfor from "../components/QuizRecordInfor";

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

	if (!record) {
		return (
			<main className="flex items-center justify-center flex-1">
				<span className="text-4xl font-bold text-black dark:text-gray-200">
					Record not found
				</span>
			</main>
		);
	}

	return (
		<main className="flex items-center justify-center flex-1">
			<div className="flex flex-col items-center w-8/12 min-h-screen gap-2 py-4">
				<div className="w-full h-fit flex flex-row items-center justify-between">
					<span className="text-4xl font-bold text-black dark:text-gray-200">
						{record.name}
					</span>
					{record.score != undefined && (
						<span className="w-fit h-fit p-3 bg-white text-2xl font-semibold rounded-md shadow-md dark:bg-pot-black">
							Score: {record.score}
						</span>
					)}
				</div>
				{record.score != undefined ? <QuizRecordInfor /> : null}
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
