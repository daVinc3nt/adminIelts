"use client";
import { BiMailSend } from "react-icons/bi";
import WritingProvider, { useWriting } from "../provider/WritingMarkProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { RemarkWriting } from "@/app/lib/interfaces";
import { use, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/Page/LoadingPage";
import NotFoundPage from "@/components/Page/NotFoundPage";
import { sendWritingEmail } from "@/app/lib/email";
import { UploadOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { getSid } from "@/app/interface/cookies/cookies";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

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

	const { onSetConfirmation, setError, onSetPromise } = useUtility();
	const {
		writingAnswer,
		isLoading,
		getWritingAnswerById,
		createRemark,
		onChangeWritingAnswer,
	} = useWriting();
	const [filePath, setFilePath] = useState<string>(null);

	useEffect(() => {
		getWritingAnswerById(id);
	}, [id]);

	useEffect(() => {
		if (writingAnswer && writingAnswer.filePath) {
			const Upload = new UploadOperation();
			Upload.search(writingAnswer.filePath, getSid()).then((res) => {
				if (res.success && res.data) {
					setFilePath(res.data);
				} else {
					setError("Can't find file path");
					setFilePath(null);
				}
			});
		}
	}, [writingAnswer]);

	const onSubmit = () => {
		const newRemark: RemarkWriting = {
			remark: writingAnswer.remark,
			firstCriterion: writingAnswer.firstCriterion,
			secondCriterion: writingAnswer.secondCriterion,
			thirdCriterion: writingAnswer.thirdCriterion,
			fourthCriterion: writingAnswer.fourthCriterion,
			score: writingAnswer.score,
		};

		const onSendEmail = () => {
			const account = writingAnswer.record.account;
			const send = sendWritingEmail({
				name: `${account.lastName} ${account.firstName}`,
				to: "lamvytran1410@gmail.com",
				title: "Writing test result",
				firstCriterion: writingAnswer.firstCriterion,
				secondCriterion: writingAnswer.secondCriterion,
				thirdCriterion: writingAnswer.thirdCriterion,
				fourthCriterion: writingAnswer.fourthCriterion,
				score: writingAnswer.score,
				remark: writingAnswer.remark,
			}).then((res) => {
				if (res) {
					createRemark(newRemark);
				}
			});
			onSetPromise(send, "Sending email...", "Email sent successfully");
		};

		onSetConfirmation({
			message: "Are you sure you want to send the email?",
			onConfirm: () => onSendEmail(),
			type: "confirm",
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
		<main className="flex justify-center flex-1 main pb-20">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit();
				}}
				className="flex flex-col items-center w-11/12 min-h-screen gap-6 py-4">
				<div className="flex flex-row items-center justify-between w-2/3 gap-4">
					<Link
						href="/management/ielts/writing"
						className="flex flex-row items-center justify-center gap-2 px-4 py-1 bg-white rounded-md min-w-fit dark:bg-pot-black hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white font-bold">
						<IoMdArrowRoundBack className="size-6" />
						Return
					</Link>
					<button className="flex flex-row items-center justify-center gap-2 px-4 py-1 bg-white rounded-md min-w-fit dark:bg-pot-black hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white">
						<span className="font-bold">Send email</span>
						<BiMailSend className="size-7" />
					</button>
				</div>

				<div className="flex flex-col w-2/3 gap-4 h-fit">
					<div className="w-full flex flex-row gap-4 justify-end">
						<div className="flex flex-col w-full h-full gap-5">
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
								<span className="text-4xl font-bold">
									Score
								</span>
								<input
									type="number"
									step={0.5}
									required
									onChange={(e) => {
										onChangeWritingAnswer({
											...writingAnswer,
											score: parseFloat(e.target.value),
										});
									}}
									autoComplete="off"
									className="w-32 h-20 text-4xl text-center text-black bg-white rounded-md dark:bg-pot-black focus:outline-none focus:ring-0 dark:text-gray-200"
								/>
							</div>
						</div>
					</div>

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
				</div>

				<div className="flex flex-row w-full gap-8 h-fit ">
					<div className="flex flex-col w-1/2 overflow-hidden bg-white rounded-md shadow-md h-fit dark:bg-pot-black">
						<div className="w-full px-4 py-2 h-fit bg-foreground-blue dark:bg-foreground-red flex flex-col">
							<span className="text-2xl font-bold text-white dark:text-gray-200">
								Student Answer
							</span>
							{filePath && (
								<a
									href={filePath}
									className="text-white cursor-pointer hover:underline">
									{
										"Click here to download Student Answer files >>"
									}
								</a>
							)}
						</div>
						<CK5Editor
							content={writingAnswer.content}
							onChangeContent={onChangeRemark}
							disable
						/>
					</div>
					<div className="flex flex-col w-1/2 overflow-hidden bg-white rounded-md shadow-md h-fit dark:bg-pot-black">
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
