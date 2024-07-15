"use client";
import { QuizDataProvider } from "../contexts/QuizDataProvider";
import QuizTab from "../components/QuizTab";
import QuizContent from "../components/QuizContent";

export default function Page() {
	return (
		<QuizDataProvider>
			<QuizManagement />
		</QuizDataProvider>
	);
}

function QuizManagement() {
	return (
		<main className="flex items-center justify-center flex-1">
			<div className="flex flex-col items-center w-11/12 min-h-screen gap-4 py-4">
				<div className="flex flex-col w-full gap-1 h-fit">
					<div className="flex flex-row gap-2 cursor-pointer">
						<span className="px-1 rounded-md hover:text-white hover:bg-foreground-red">
							Save & exit
						</span>
						<span className="px-1 rounded-md hover:text-white hover:bg-foreground-red">
							Save
						</span>
						<span className="px-1 rounded-md hover:text-white hover:bg-foreground-red">
							Edit test detail
						</span>
					</div>

					<hr className="w-full border-[0.5px] border-gray-200" />

					<div className="flex flex-row w-full gap-8 h-fit">
						<div className="flex flex-col w-2/3">
							<QuizTab />

							<span className="text-3xl font-bold">
								IELTS test very very very long ass name
							</span>
						</div>

						<div className="flex-1 m-1"></div>
					</div>
				</div>

				<QuizContent />
			</div>
		</main>
	);
}
