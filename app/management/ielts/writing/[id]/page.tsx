"use client";
import { BiMailSend } from "react-icons/bi";
import WritingProvider, { useWriting } from "../provider/WritingMarkProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { RemarkWriting } from "@/app/lib/interfaces";
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

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
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const { onSetConfirmation } = useUtility();
	const {
		getWritingAnswerById,
		writingAnswer,
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

		onSetConfirmation(
			"Are you sure you want to send the email?",
			() => createRemark(newRemark),
			"create"
		);
	};

	const onChangeRemark = (content: string) => {
		writingAnswer.remark = content;
	};

	if (writingAnswer.id == "") {
		return null;
	}

	if (!writingAnswer)
		return (
			<main className="flex justify-center flex-1 main">
				<div className="w-full h-full flex flex-col items-center justify-center">
					<span className="text-2xl font-bold">
						No Writing Answer found found
					</span>
				</div>
			</main>
		);

	return (
		<main className="flex justify-center flex-1 main">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit();
				}}
				className="flex flex-col items-center w-11/12 min-h-screen gap-6 py-4">
				<div className="w-full flex flex-row items-center gap-4 justify-end">
					<button className="px-4 py-1 bg-white flex flex-row gap-2 min-w-fit items-center justify-center rounded-md  dark:bg-pot-black hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white">
						<span className="font-bold">Send email</span>
						<BiMailSend className="size-7" />
					</button>
				</div>

				<div className="w-full h-fit flex flex-row gap-4">
					<div className="flex-grow bg-white dark:bg-pot-black rounded-md p-2 shadow-md flex flex-col"></div>
					<div className="w-1/3 h-full flex flex-col gap-5">
						<input
							value={writingAnswer.firstCriterion}
							onChange={(e) =>
								onChangeRemark({
									...writingAnswer,
									firstCriterion: e.target.value,
								} as any)
							}
							type="text"
							required
							autoComplete="off"
							placeholder="Enter first criterion"
							className="w-full h-fit px-4 py-1 bg-white rounded-md dark:bg-pot-black focus:outline-none focus:ring-0 text-black dark:text-gray-200 text-base shadow-md"
						/>
						<input
							value={writingAnswer.secondCriterion}
							onChange={(e) => {
								writingAnswer.secondCriterion = e.target.value;
							}}
							type="text"
							required
							autoComplete="off"
							placeholder="Enter second criterion"
							className="w-full h-fit px-4 py-1 bg-white rounded-md dark:bg-pot-black focus:outline-none focus:ring-0 text-black dark:text-gray-200 text-base shadow-md"
						/>
						<input
							value={writingAnswer.thirdCriterion}
							onChange={(e) => {
								writingAnswer.thirdCriterion = e.target.value;
							}}
							type="text"
							required
							autoComplete="off"
							placeholder="Enter third criterion"
							className="w-full h-fit px-4 py-1 bg-white rounded-md dark:bg-pot-black focus:outline-none focus:ring-0 text-black dark:text-gray-200 text-base shadow-md"
						/>
						<input
							value={writingAnswer.fourthCriterion}
							onChange={(e) => {
								writingAnswer.fourthCriterion = e.target.value;
							}}
							type="text"
							required
							autoComplete="off"
							placeholder="Enter fourth criterion"
							className="w-full h-fit px-4 py-1 bg-white rounded-md dark:bg-pot-black focus:outline-none focus:ring-0 text-black dark:text-gray-200 text-base shadow-md"
						/>
					</div>

					<div className="w-fit h-full flex flex-col">
						<div className="size-[188px] bg-white rounded-md dark:bg-pot-black shadow-md flex flex-col items-center justify-center">
							<span className="text-4xl font-bold">Score</span>
							<input
								type="number"
								required
								autoComplete="off"
								className="w-32 h-20 bg-white rounded-md dark:bg-pot-black focus:outline-none focus:ring-0 text-black dark:text-gray-200 text-center text-4xl"
							/>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-col bg-white dark:bg-pot-black rounded-md shadow-md overflow-hidden">
					<div className="w-full h-fit px-4 py-2 bg-foreground-blue dark:bg-foreground-red ">
						<span className="text-2xl font-bold text-white dark:text-gray-200">
							Writing Question
						</span>
					</div>

					<div
						className="w-full h-fit whitespace-pre-wrap p-4 preview"
						dangerouslySetInnerHTML={{ __html: content }}></div>
				</div>

				<div className="w-full h-fit flex flex-row gap-4 ">
					<div className="w-1/2 min-h-48 flex flex-col bg-white dark:bg-pot-black shadow-md rounded-md overflow-hidden">
						<div className="w-full h-fit px-4 py-2 bg-foreground-blue dark:bg-foreground-red ">
							<span className="text-2xl font-bold text-white dark:text-gray-200">
								Student Answer
							</span>
						</div>
						<div className="p-4">{writingAnswer.content}</div>
					</div>
					<div className="w-1/2 min-h-48 flex flex-col bg-white dark:bg-pot-black shadow-md rounded-md overflow-hidden">
						<div className="w-full h-fit px-4 py-2 bg-foreground-blue dark:bg-foreground-red ">
							<span className="text-2xl font-bold text-white dark:text-gray-200">
								Teacher Comment
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

const content = `The chart shows student expenditure over a three-year period in the United Kingdom.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.

Student expenditure (aged under 26 in higher education) the United Kingdom*

Percentage of total expenditure

(1) includes non-essential consumer items and credit repayments

* Source: Student Income and Expenditure Survey. Department for Education and Employment.`;
