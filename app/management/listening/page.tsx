"use client";
import { useState } from "react";
import { TestInterface } from "../interface/TestInterface";
import ReadingPart from "./component/ReadingPart";
import { motion } from "framer-motion";
import PlusIcon from "@/components/Icon/PlusIcon";
import HorizontalDotsIcon from "@/components/Icon/HorizontalDotsIcon";
import AudioDropInput from "@/components/AudioDropIn/AudioDropIn";

export default function ReadingManagement() {
	const [currentTest, setCurrentTest] = useState<TestInterface>({
		testID: "",
		testName: "",
		numberOfQuestion: 40,
		duration: 60,
		partList: [
			{
				partNumber: 0,
				startQuestion: 0,
				endQuestion: 0,
				paragraph: "",
				groupList: [],
			},
		],
	});

	const [currentPart, setCurrentPart] = useState<number>(0);

	const onChangeTestName = (value: string) => {
		setCurrentTest({
			...currentTest,
			testName: value,
		});
	};

	const addPart = () => {
		if (currentTest.partList.length >= 5)
			return alert("Maximum number of parts is 5");

		const newPart = {
			partNumber: currentTest.partList.length + 1,
			startQuestion: 0,
			endQuestion: 0,
			paragraph: "",
			groupList: [],
		};

		setCurrentTest({
			...currentTest,
			partList: [...currentTest.partList, newPart],
		});
	};

	const detelePart = () => {
		if (currentTest.partList.length <= 1)
			return alert("Your test must have at least 1 part");

		const newPartList = currentTest.partList.filter(
			(_, index) => index !== currentPart
		);

		setCurrentTest({
			...currentTest,
			partList: newPartList,
		});

		setCurrentPart(0);
	};

	const DeletePartDropDownButton = () => {
		const [isOpen, setIsOpen] = useState<boolean>(false);

		return (
			<div
				className="w-8 h-8 cursor-pointer relative"
				onClick={() => setIsOpen(!isOpen)}
				onMouseLeave={() => setIsOpen(false)}>
				<div className="w-full h-full flex justify-center items-center bg-red-400 rounded-full">
					<HorizontalDotsIcon width={10} height={10} color="white" />
				</div>

				{isOpen && (
					<motion.div
						className={`w-fit h-fit bg-white border text-base font-bold shadow-lg rounded-lg absolute z-10 flex flex-col overflow-hidden`}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}>
						<button
							className="px-2 py-1 bg-red-400 text-white w-32"
							onClick={() => detelePart()}>
							Delete part
						</button>
					</motion.div>
				)}
			</div>
		);
	};

	return (
		<div className="w-full h-full flex p-4 bg-primary">
			<div className="w-full h-full bg-white border shadow-lg rounded-lg p-4 gap-4 flex flex-1 flex-col justify-start">
				<div className="w-full min-h-20 grid grid-cols-12 gap-4">
					<div className="w-full h-full col-span-4 flex flex-col justify-between">
						<div className="w-full h-fit flex flex-row">
							<input
								type="text"
								value={currentTest.testName}
								onChange={(e) =>
									onChangeTestName(e.target.value)
								}
								placeholder="Test name"
								className="w-full h-8 border-2 border-red-200 p-2 rounded-lg outline-none focus:border-transparent focus:outline focus:ring focus:ring-red-400 bg-primary focus:bg-white"
							/>
						</div>
						<div className="w-full h-fit flex flex-row items-center gap-2">
							<DeletePartDropDownButton />
							<span className="font-bold text-3xl">
								Part {currentPart + 1}
							</span>
						</div>
					</div>

					<div className="col-span-4 col-start-5 w-full min-h-fit flex justify-center items-center gap-2">
						<div className="w-fit min-h-fit flex justify-center items-center rounded-full border-2 border-solid border-red-200">
							{currentTest.partList.map((_, index) => {
								return (
									<button
										key={index}
										onClick={() => setCurrentPart(index)}
										className="relative rounded-full px-3 py-1 text-sm font-medium">
										{currentPart === index && (
											<motion.div
												layoutId="pill"
												className="absolute inset-0 rounded-full bg-red-400"
											/>
										)}
										<span
											className={`relative text-base ${currentPart === index ? "text-white" : "text-black"} font-bold z-10 duration-100 delay-100`}>
											{`Part ${index + 1}`}
										</span>
									</button>
								);
							})}
						</div>
						<div
							className="w-fit h-fit p-2 bg-red-400 rounded-full cursor-pointer"
							onClick={() => addPart()}>
							<PlusIcon width={4} height={4} color="white" />
						</div>
					</div>

					<div className="w-full h-full col-start-10 col-span-3 flex flex-col">
						<AudioDropInput className="border-2 border-dashed border-red-400 rounded-xl w-full h-full flex items-center justify-center text-xl font-semibold" />
					</div>
				</div>
				{currentTest.partList.map((_, index) => {
					if (index !== currentPart) return null;

					return (
						<ReadingPart
							key={index}
							partIndex={index}
							currentTest={currentTest}
							setCurrentTest={setCurrentTest}
						/>
					);
				})}
			</div>
		</div>
	);
}
