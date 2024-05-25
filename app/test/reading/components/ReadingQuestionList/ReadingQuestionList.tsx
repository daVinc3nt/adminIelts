import ArrowLeftIcon from "@/components/Icon/ArrowLeft";
import ArrowRightIcon from "@/components/Icon/ArrowRight";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { PartInterface } from "../ReadingTestInterface";

interface ReadingQuestionListProps {
	answer: string[];
	numberOfPart: number;
	currentPart: number;
	setPart: Dispatch<SetStateAction<number>>;
	partList: PartInterface[];
}

export default function ReadingQuestionList({
	answer,
	numberOfPart,
	currentPart,
	setPart,
	partList,
}: ReadingQuestionListProps) {
	return (
		<div className="w-full min-h-20 bg-white border rounded-2xl shadow-md shadow-gray-300 grid grid-cols-12">
			<div className="col-span-10 h-full grid grid-cols-2 px-4 max-lg:grid-cols-1 max-lg:col-span-full">
				{Array.from({ length: numberOfPart }, (_, index) => {
					const startQuestion = partList[index].startQuestion;
					const endQuestion = partList[index].endQuestion;
					return (
						<div className="w-full h-full flex flex-row justify-start items-center font-bold gap-2 max-lg:flex-col max-lg:items-start">
							<div className="text-xl">{`Part ${index + 1}:`}</div>
							<div className="flex flex-row gap-1 w-fit h-fit">
								{Array.from(
									{
										length: endQuestion - startQuestion + 1,
									},
									(_, index) => {
										const questionNumber =
											startQuestion + index;
										return (
											<div
												key={index}
												className={`${answer[questionNumber - 1] == "" ? "bg-white text-red-400" : "bg-red-400 text-white"} w-8 h-8 rounded-full border-2 hover:cursor-pointer border-red-200 max-lg:w-5 max-lg:h-5 flex justify-center items-center text-xs`}>
												{questionNumber}
											</div>
										);
									}
								)}
							</div>
						</div>
					);
				})}
			</div>
			<div className="col-span-2 h-full max-lg:col-span-full grid grid-cols-2 gap-4">
				{currentPart - 1 > 0 ? (
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 1.0 }}
						onClick={() => setPart(currentPart - 1)}
						className="w-full h-full flex flex-row items-center justify-end gap-2 cursor-pointer">
						<div className="text-lg">{`Part ${currentPart - 1}`}</div>
						<div className="w-12 h-12 flex items-center justify-center">
							<ArrowLeftIcon
								width={12}
								height={12}
								color="#f87171"
							/>
						</div>
					</motion.div>
				) : (
					<div />
				)}
				{currentPart < numberOfPart ? (
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 1.0 }}
						onClick={() => setPart(currentPart + 1)}
						className="w-full h-full flex flex-row items-center justify-start gap-2c cursor-pointer">
						<div className="w-12 h-12 flex items-center justify-center">
							<ArrowRightIcon
								width={12}
								height={12}
								color="#f87171"
							/>
						</div>
						<div className="text-lg">{`Part ${currentPart + 1}`}</div>
					</motion.div>
				) : (
					<div />
				)}
			</div>
		</div>
	);
}
