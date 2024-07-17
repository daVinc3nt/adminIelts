"use client";
import { QuizDataProvider } from "./provider/QuizDataProvider";

export default function Page() {
	return (
		<QuizDataProvider>
			<IELTSManagement />
		</QuizDataProvider>
	);
}

function IELTSManagement() {
	return (
		<main className="flex justify-center flex-1">
			<div className="flex flex-col items-center w-11/12 h-full gap-4 py-4">
				<div className="flex flex-row items-center w-full h-fit">
					<span className="p-2 mr-auto text-3xl font-bold">
						IELTS TEST MANAGEMENT
					</span>
				</div>

				<div className="flex items-center justify-center w-full h-fit">
					<div className="w-1/2"></div>
				</div>

				<div className="flex flex-col items-center justify-center w-full h-fit"></div>
			</div>
		</main>
	);
}
