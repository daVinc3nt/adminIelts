import React, { Dispatch, SetStateAction } from "react";
import FSection from "./Section/FSection";
import {
	FSectionInterface,
	MCSectionInterface,
	PartInterface,
	TFQuestionInterface,
	TFSectionInterface,
} from "../ReadingTestInterface";
import TFSection from "./Section/TFSection";
import MCSection from "./Section/MCSection";

interface ReadingAnswerProps {
	part: PartInterface;
	answer: string[];
	setAnswer: Dispatch<SetStateAction<string[]>>;
}

export default function ReadingAnswer({
	part,
	answer,
	setAnswer,
}: ReadingAnswerProps) {
	return (
		<div className="w-full h-full col-span-6 flex flex-col lg:overflow-y-scroll gap-8 p-2 pb-40 max-lg:col-span-full">
			{part.sectionList.map((p, index) => {
				switch (p.sectionType) {
					case "MC":
						return (
							<React.Fragment key={index}>
								<MCSection
									section={
										part.sectionList[
											index
										] as MCSectionInterface
									}
									answer={answer}
									setAnswer={setAnswer}
								/>
								<hr className="solid bg-gray-200 border-gray-200 border rounded-full"></hr>
							</React.Fragment>
						);

					case "TF":
						return (
							<React.Fragment key={index}>
								<TFSection
									section={
										part.sectionList[
											index
										] as TFSectionInterface
									}
									answer={answer}
									setAnswer={setAnswer}
								/>
								<hr className="solid bg-gray-200 border-gray-200 border rounded-full"></hr>
							</React.Fragment>
						);
					case "F":
						return (
							<React.Fragment key={index}>
								<FSection
									section={
										part.sectionList[
											index
										] as FSectionInterface
									}
									answer={answer}
									setAnswer={setAnswer}
								/>
								<hr className="solid bg-gray-200 border-gray-200 border rounded-full"></hr>
							</React.Fragment>
						);
					default:
						return null;
				}
			})}
			<div className="w-full h-fit flex items-center justify-center text-xl font-bold">
				{`End of part ${part.partNumer}`}
			</div>
		</div>
	);
}
