"use client";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import TextEditor from "@/components/TextEditor/TextEditor";
import {
	PartInterface,
	QuestionGroupInterface,
	TestInterface,
	True_False_Question,
} from "../TestInterface";
import TFQuestion from "./TFQuestion";
import MCQuestion from "./MCQuestion";
import FQuestion from "./FQuestion";
import QGroup from "./QGroup";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";

interface Props {
	partIndex: number;
	currentTest: TestInterface;
	setCurrentTest: Dispatch<SetStateAction<TestInterface>>;
}

export default function ReadingPart({
	partIndex,
	currentTest,
	setCurrentTest,
}: Props) {
	const currentPart = currentTest.partList[partIndex];

	const onChangeParagraph = useCallback((value: string) => {
		setCurrentTest((prev) => {
			const newTest = { ...prev };
			newTest.partList[partIndex].paragraph = value;
			return newTest;
		});
	}, []);

	const addGroup = () => {
		const newGroup = {
			startQuestion: 0,
			endQuestion: 0,
			description: "",
			questionList: [],
		} as QuestionGroupInterface;

		let newTest = { ...currentTest };
		newTest.partList[partIndex].groupList.push(newGroup);
		setCurrentTest(newTest);
	};

	return (
		<div className="w-full h-full grid grid-cols-2 gap-4 overflow-x-hidden">
			<TextEditor
				text={currentPart.paragraph}
				onChangeText={onChangeParagraph}
			/>
			<div className="w-full h-full flex flex-col items-center gap-8 overflow-y-scroll pb-40 relative">
				{currentPart.groupList.map((_, index) => {
					return (
						<React.Fragment key={index}>
							<QGroup
								key={index}
								partIndex={partIndex}
								groupIndex={index}
								currentTest={currentTest}
								setCurrentTest={setCurrentTest}
							/>
							<hr className="solid border-gray-300 border rounded-full w-11/12"></hr>
						</React.Fragment>
					);
				})}
				<div className="w-full flex justify-center pt-10">
					<div
						className="w-fit h-fit py-1 px-2 bg-red-400 rounded-lg font-bold text-white cursor-pointer z-30"
						onClick={() => addGroup()}>
						Add group
					</div>
				</div>
			</div>
		</div>
	);
}
