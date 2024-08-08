"use client";
import { BiMailSend } from "react-icons/bi";
import WritingProvider, { useWriting } from "../provider/WritingMarkProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { RemarkWriting } from "@/app/lib/interfaces";
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/Page/LoadingPage";
import NotFoundPage from "@/components/Page/NotFoundPage";

export default function Page({ params }: { params: { id: string } }) {
	return (
		<WritingProvider>
			<WritingMark id={params.id} />
		</WritingProvider>
	);
}

interface WritingMarkProps {
	id: string;
}

function WritingMark({ id }: WritingMarkProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(
				() => import("@/components/CK5Editor/CKEditor5ForWriting"),
				{
					ssr: false,
				}
			),
		[]
	);

	const { onSetConfirmation } = useUtility();
	const {
		writingAnswer,
		isLoading,
		getWritingAnswerById,
		createRemark,
		onChangeWritingAnswer,
	} = useWriting();

	useEffect(() => {
		getWritingAnswerById(id);
	}, [id]);

	const onSubmit = () => {
		const newRemark: RemarkWriting = {
			remark: writingAnswer.remark,
			firstCriterion: writingAnswer.firstCriterion,
			secondCriterion: writingAnswer.secondCriterion,
			thirdCriterion: writingAnswer.thirdCriterion,
			fourthCriterion: writingAnswer.fourthCriterion,
			score: writingAnswer.score,
		};

		onSetConfirmation({
			message: "Are you sure you want to send the email?",
			onConfirm: () => createRemark(newRemark),
			type: "create",
		});
	};

	const onChangeRemark = (content: string) => {
		writingAnswer.remark = content;
		onChangeWritingAnswer(writingAnswer);
	};

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!writingAnswer) {
		return (
			<NotFoundPage
				message="Writing answer not found"
				subMessage={`There are no writing answer with id: ${id}`}
				backto="Back to writing management"
				backtoLink="/management/ielts/writing"
			/>
		);
	}

	return (
		<main className="flex justify-center flex-1 main">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit();
				}}
				className="flex flex-col items-center w-11/12 min-h-screen gap-6 py-4">
				<div className="flex flex-row items-center justify-end w-full gap-4">
					<button className="flex flex-row items-center justify-center gap-2 px-4 py-1 bg-white rounded-md min-w-fit dark:bg-pot-black hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white">
						<span className="font-bold">Send email</span>
						<BiMailSend className="size-7" />
					</button>
				</div>

				<div className="flex flex-row w-full gap-4 h-fit">
					<div className="flex flex-col flex-grow overflow-hidden bg-white rounded-md shadow-md h-fit dark:bg-pot-black">
						<div className="w-full px-4 py-2 h-fit bg-foreground-blue dark:bg-foreground-red ">
							<span className="text-2xl font-bold text-white dark:text-gray-200">
								Writing Question
							</span>
						</div>

						<div
							className="w-full p-4 whitespace-pre-wrap h-fit preview"
							dangerouslySetInnerHTML={{
								__html: writingAnswer.quiz
									? writingAnswer.quiz.content
									: "",
							}}></div>
					</div>

					<div className="flex flex-col w-1/3 h-full gap-5">
						<input
							value={writingAnswer.firstCriterion}
							onChange={(e) =>
								onChangeWritingAnswer({
									...writingAnswer,
									firstCriterion: e.target.value,
								})
							}
							type="text"
							required
							autoComplete="off"
							placeholder="Enter first criterion"
							className="w-full px-4 py-1 text-base text-black bg-white rounded-md shadow-md h-fit dark:bg-pot-black focus:outline-none focus:ring-0 dark:text-gray-200"
						/>
						<input
							value={writingAnswer.secondCriterion}
							onChange={(e) =>
								onChangeWritingAnswer({
									...writingAnswer,
									secondCriterion: e.target.value,
								})
							}
							type="text"
							required
							autoComplete="off"
							placeholder="Enter second criterion"
							className="w-full px-4 py-1 text-base text-black bg-white rounded-md shadow-md h-fit dark:bg-pot-black focus:outline-none focus:ring-0 dark:text-gray-200"
						/>
						<input
							value={writingAnswer.thirdCriterion}
							onChange={(e) =>
								onChangeWritingAnswer({
									...writingAnswer,
									thirdCriterion: e.target.value,
								})
							}
							type="text"
							required
							autoComplete="off"
							placeholder="Enter third criterion"
							className="w-full px-4 py-1 text-base text-black bg-white rounded-md shadow-md h-fit dark:bg-pot-black focus:outline-none focus:ring-0 dark:text-gray-200"
						/>
						<input
							value={writingAnswer.fourthCriterion}
							onChange={(e) =>
								onChangeWritingAnswer({
									...writingAnswer,
									fourthCriterion: e.target.value,
								})
							}
							type="text"
							required
							autoComplete="off"
							placeholder="Enter fourth criterion"
							className="w-full px-4 py-1 text-base text-black bg-white rounded-md shadow-md h-fit dark:bg-pot-black focus:outline-none focus:ring-0 dark:text-gray-200"
						/>
					</div>

					<div className="flex flex-col h-full w-fit">
						<div className="size-[188px] bg-white rounded-md dark:bg-pot-black shadow-md flex flex-col items-center justify-center">
							<span className="text-4xl font-bold">Score</span>
							<input
								type="number"
								required
								autoComplete="off"
								className="w-32 h-20 text-4xl text-center text-black bg-white rounded-md dark:bg-pot-black focus:outline-none focus:ring-0 dark:text-gray-200"
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-row w-full gap-8 h-fit ">
					<div className="flex flex-col w-1/2 overflow-hidden bg-white rounded-md shadow-md min-h-48 dark:bg-pot-black">
						<div className="w-full px-4 py-2 h-fit bg-foreground-blue dark:bg-foreground-red ">
							<span className="text-2xl font-bold text-white dark:text-gray-200">
								Student Answer
							</span>
						</div>
						<CK5Editor
							content={writingAnswer.content}
							onChangeContent={onChangeRemark}
							disable
						/>
					</div>
					<div className="flex flex-col w-1/2 overflow-hidden bg-white rounded-md shadow-md min-h-48 dark:bg-pot-black">
						<div className="w-full px-4 py-2 h-fit bg-foreground-blue dark:bg-foreground-red ">
							<span className="text-2xl font-bold text-white dark:text-gray-200">
								Teacher review
							</span>
						</div>
						<CK5Editor
							content={writingAnswer.remark}
							onChangeContent={onChangeRemark}
						/>
					</div>
				</div>
			</form>
		</main>
	);
}
