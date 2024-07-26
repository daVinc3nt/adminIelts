"use client";
import { FillingGroup } from "@/app/interface/quiz";
import { useTestData } from "../../provider/TestDataProvider";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
import { QuizType } from "@/app/lib/interfaces";
import { BsThreeDots } from "react-icons/bs";

interface WritingQuizGroupProps {
	quizIndex: number;
	isPreview?: boolean;
}

export default function WritingQuizGroup({
	quizIndex,
	isPreview,
}: WritingQuizGroupProps) {
	const CK5Editor = useMemo(
		() =>
			dynamic(() => import("@/components/CK5Editor/CK5Editor"), {
				ssr: false,
			}),
		[]
	);

	const quizGroupSettingRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				quizGroupSettingRef.current &&
				!quizGroupSettingRef.current.contains(event.target as Node)
			) {
				quizGroupSettingRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const { quizList, setQuizList } = useTestData();

	const onChangeQuestion = (question: string) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups[0].question = question;
		setQuizList(newQuizList);
	};

	const addFillingGroup = () => {
		const newGroup: FillingGroup = {
			type: QuizType.FILLING,
			question: "",
			startFrom: 0,
			quizzes: [],
		};
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups.push(newGroup);
		setQuizList(newQuizList);
	};

	const removeQuizGroup = (index: number) => {
		const newQuizList = [...quizList];
		newQuizList[quizIndex].groups.splice(index, 1);
		setQuizList(newQuizList);
	};

	return (
		<div className="flex flex-col gap-8">
			{quizList[quizIndex].groups.map((group, index) => (
				<div className="flex flex-col items-center w-full gap-6 h-fit">
					<div className="flex flex-col w-full h-fit">
						<div className="flex flex-row items-center justify-between w-full p-2 h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 rounded-t-md">
							<div className="flex flex-col w-full h-fit">
								<span className="text-2xl font-bold text-white ">
									Writing Question :
								</span>
							</div>
							{!isPreview && (
								<details
									ref={quizGroupSettingRef}
									className="relative">
									<summary className="list-none">
										<BsThreeDots className="p-1 text-white size-8" />
									</summary>
									<div className="top-8 -left-10 absolute w-32 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
										<button
											onClick={() =>
												removeQuizGroup(index)
											}
											className="flex items-start justify-start w-full p-2 text-sm text-red-500 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
											Delete group
										</button>
									</div>
								</details>
							)}
						</div>
						{!isPreview ? (
							<CK5Editor
								content={group.question}
								onChangeContent={onChangeQuestion}
							/>
						) : (
							<div
								className="w-full h-fit preview border border-foreground-blue dark:border-foreground-red rounded-b-md p-2"
								dangerouslySetInnerHTML={{
									__html: group.question,
								}}></div>
						)}
					</div>
					<hr className="w-11/12 border border-gray-200 dark:border-gray-600" />
				</div>
			))}
			{!isPreview && (
				<div className="flex flex-row w-full gap-2 items-center justify-center">
					<button
						onClick={() => addFillingGroup()}
						className="p-1 text-white rounded-md bg-foreground-blue dark:bg-foreground-red dark:text-gray-200 w-fit h-fit">
						Add Writing Question
					</button>
				</div>
			)}
		</div>
	);
}
