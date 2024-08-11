"use client";
import { Fragment, useEffect } from "react";
import RecordProvider, { useRecord } from "../provider/RecordProvider";
import RecordPreview from "../components/RecordPreview";
import { Skill } from "@/app/lib/interfaces";
import RecordQuizList from "../components/RecordQuizList";
import QuizRecordInfor from "../components/QuizRecordInfor";
import NotFoundPage from "@/components/Page/NotFoundPage";
import WritingQuizPreview from "../components/WritingQuizPreview";

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
	const { fetchRecordById, record, currentSkill, currentQuizIndex } =
		useRecord();

	useEffect(() => {
		fetchRecordById(id);
	}, [id]);

	if (!record) {
		return (
			<NotFoundPage
				message="Record not found"
				subMessage={`There are no record with id: ${id}`}
				backto="Back to ielts management"
				backtoLink="/management/ielts"
			/>
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
				<RecordQuizList />
				{record.score != undefined && currentSkill != Skill.WRITING && (
					<QuizRecordInfor />
				)}
				{record &&
					record.reading.map((_, index) => {
						if (
							currentSkill != Skill.READING ||
							currentQuizIndex != index
						)
							return null;
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
						if (
							currentSkill != Skill.LISTENING ||
							currentQuizIndex != index
						)
							return null;
						return (
							<RecordPreview
								key={index}
								quizIndex={index}
								quizskill={Skill.LISTENING}
							/>
						);
					})}
				{record &&
					record.writing.map((_, index) => {
						if (
							currentSkill != Skill.WRITING ||
							currentQuizIndex != index
						)
							return null;
						return (
							<WritingQuizPreview key={index} quizIndex={index} />
						);
					})}
			</div>
		</main>
	);
}
