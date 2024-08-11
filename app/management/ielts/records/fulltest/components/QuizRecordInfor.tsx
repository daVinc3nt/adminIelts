"use client";
import { useRecord } from "../provider/RecordProvider";

export default function QuizRecordInfor() {
	const { record } = useRecord();

	return (
		<div className="w-full h-fit bg-white dark:bg-pot-black rounded-md flex flex-col gap-6 p-4 shadow-md mt-2">
			<div className="w-full">
				<span className="text-3xl">Result</span>
			</div>
			<div className="w-full h-fit flex flex-row gap-2">
				{record.listening.length > 0 && (
					<div className="w-1/2 flex flex-col gap-1">
						<span className="text-green-500">
							Listening completed question:{" "}
							{record.listeningCompletedQuizzes}
						</span>
						<span className="text-green-500">
							Listening correct answer:{" "}
							{record.listeningCorrectAnswers}
						</span>

						<span className="text-red-500 mt-2">
							Listening uncompleted answer:{" "}
							{record.listeningUncompletedQuizzes}
						</span>
						<span className="text-red-500">
							Listening wrong answer:{" "}
							{record.listeningWrongAnswers}
						</span>
					</div>
				)}

				{record.reading.length > 0 && (
					<div className="w-1/2 flex flex-col gap-1">
						<span className="text-green-500">
							Reading completed question:{" "}
							{record.readingCompletedQuizzes}
						</span>
						<span className="text-green-500">
							Reading correct answer:{" "}
							{record.readingCorrectAnswers}
						</span>

						<span className="text-red-500 mt-2">
							Reading uncompleted answer:{" "}
							{record.readingUncompletedQuizzes}
						</span>
						<span className="text-red-500">
							Reading wrong answer: {record.readingWrongAnswers}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
