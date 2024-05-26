"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FSectionInterface } from "../../ReadingTestInterface";

interface FSectionProps {
	section: FSectionInterface;
	answer: string[];
	setAnswer: Dispatch<SetStateAction<string[]>>;
}

export default function FSection({
	section,
	answer,
	setAnswer,
}: FSectionProps) {
	const handleChangeInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		e.preventDefault();
		let newAns = [...answer];
		newAns[index - 1] = e.target.value as string;
		setAnswer(newAns);
	};

	return (
		<div className="w-full h-fit flex flex-col gap-2">
			<div className="font-bold text-xl">{`Question ${section.startQuestion} - ${section.endQuestion}`}</div>
			<div
				className="text-base w-full"
				dangerouslySetInnerHTML={{ __html: section.decription }}></div>
			<div
				className="w-full h-fit text-base whitespace-pre-wrap"
				dangerouslySetInnerHTML={{ __html: section.paragraph }}></div>
			<div className="w-full h-fit flex flex-col justify-center items-center gap-6 mt-4">
				{Array.from(
					{ length: section.endQuestion - section.startQuestion + 1 },
					(_, index) => {
						const questionIndex = section.startQuestion + index;
						return (
							<div
								key={index}
								className="w-full h-fit grid grid-cols-12 gap-2">
								<div className="font-bold flex justify-center items-center pr-4 max-md:col-span-2">
									<div className="min-w-8 min-h-8 bg-red-400 rounded-full flex justify-center items-center text-white hover:cursor-pointer">
										{section.startQuestion + index}
									</div>
								</div>
								{section.question[index] && (
									<div className="w-full col-span-11 flex justify-start items-center">
										{section.question[index]}
									</div>
								)}
								<div
									className={`w-full ${section.question[index] ? "col-span-12" : "col-span-11"}`}>
									<input
										type="text"
										onChange={(e) =>
											handleChangeInput(e, questionIndex)
										}
										value={answer[questionIndex - 1]}
										className="w-full h-8 border-2 border-red-200 p-2 rounded-md outline-none focus:border-transparent focus:outline-red-400 focus:outline focus:ring focus:ring-red-400"
									/>
								</div>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
}
