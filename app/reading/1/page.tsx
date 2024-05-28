"use client";
import React, { useEffect, useRef, useState } from "react";
import ReadingAnswer from "./components/ReadingAnswer/ReadingAnswer";
import Header from "./components/ReadingHeader/ReadingHeader";

import {
	Test,
	Multiple_Choice_Question,
	Part,
	QuestionType,
	QuestionGroup,
	True_False_Question,
	Fill_Question,
} from "./components/ReadingInterface";
import ReadingParagraph from "./components/ReadingParagraph/ReadingParagraph";
import ReadingQuestionList from "./components/ReadingQuestionList/ReadingQuestionList";

import readingTest from "../../../public/reading-test/readingTest.json";

export default function Reading() {
	const currentTest = readingTest;

	const [currentPart, setPart] = useState<number>(1);
	const part = currentTest.partList[currentPart - 1];

	const [highLight, setHighLight] = useState<boolean>(false);
	const [highLightRange, setHighLightRange] = useState<Range[][]>([[]]);

	const [answer, setAnswer] = useState<string[]>(
		Array(currentTest.numberOfQuestion).fill("")
	);

	const [open, setOpen] = useState<boolean[]>(
		Array(currentTest.numberOfQuestion).fill(false)
	);
	useEffect(() => {
		var myDiv = document.getElementById("test-container");
		myDiv.scrollTop = 0;
	}, [currentPart]);

	return (
		<div className="w-full h-full flex flex-col flex-shrink gap-2 p-2 max-lg:h-fit">
			<div className="h-full max-lg:h-fit bg-white border shadow-md shadow-gray-300 rounded-lg flex flex-col gap-4 p-4 lg:overflow-hidden">
				<div className="w-full h-fit">
					<Header
						value={highLight}
						setValue={setHighLight}
						part={part}
					/>
				</div>
				<div
					id="test-container"
					className="w-full h-full grid grid-cols-12 overflow-scroll lg:overflow-hidden">
					{currentTest.partList.map((part, index) => {
						if (currentPart != index + 1) return null;
						return (
							<React.Fragment key={index}>
								<ReadingParagraph
									highLight={highLight}
									title={part.title}
									paragraph={part.paragraph}
								/>
								<ReadingAnswer
									part={part}
									answer={answer}
									setAnswer={setAnswer}
									open={open}
									setOpen={setOpen}
								/>
							</React.Fragment>
						);
					})}
				</div>
			</div>
			<ReadingQuestionList
				answer={answer}
				currentPart={currentPart}
				setPart={setPart}
				partList={currentTest.partList}
			/>
		</div>
	);
}
