"use client";
import { useState } from "react";
import { TestInterface } from "../interface/TestInterface";
import ReadingPart from "../interface/component/ReadingPart";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

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

	const saveTest = () => {
		setTestPartNumber_questionNumber();
		console.log(currentTest);
	};

	const setTestPartNumber_questionNumber = () => {
		let newTest = { ...currentTest };
		let questionNumber = 0;
		newTest.partList.forEach((part, index) => {
			part.partNumber = index + 1;
			part.startQuestion = questionNumber + 1;
			part.groupList.forEach((group) => {
				group.startQuestion = questionNumber + 1;
				group.questionList.forEach((question) => {
					question.questionNumber = questionNumber + 1;
					questionNumber++;
				});
				group.endQuestion = questionNumber;
			});
			part.endQuestion = questionNumber;
		});

		setCurrentTest(newTest);
	};

	const onChangeTestName = (value: string) => {
		setCurrentTest({
			...currentTest,
			testName: value,
		});
	};

	const addPart = () => {
		if (currentTest.partList.length >= 4)
			return alert("Maximum number of parts is 4");

		const newPart = {
			partNumber: currentTest.partList.length,
			startQuestion: 0,
			endQuestion: 0,
			paragraph: "",
			groupList: [],
		};

		setCurrentTest({
			...currentTest,
			partList: [...currentTest.partList, newPart],
		});
		setCurrentPart(currentTest.partList.length);
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

		setCurrentPart(currentPart - 1);
	};

	const DeletePartDropDownButton = () => {
		const [isOpen, setIsOpen] = useState<boolean>(false);

		return (
			<div
				tabIndex={-1}
				className="relative w-8 h-8 cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
				onBlur={() =>
					setTimeout(() => {
						setIsOpen(false);
					}, 150)
				}>
				<div className="flex items-center justify-center w-full h-full bg-red-400 rounded-full">
					<BsThreeDotsVertical size={25} color="white" />
				</div>

				{isOpen && (
					<motion.div
						className={`w-fit h-fit bg-white border text-base font-bold shadow-lg rounded-lg absolute z-10 flex flex-col overflow-hidden`}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}>
						<button
							className="w-32 px-2 py-1 text-white bg-red-400"
							onClick={() => detelePart()}>
							Delete part
						</button>
					</motion.div>
				)}
			</div>
		);
	};

	return (
		<div className="flex w-full h-full p-4 bg-primary ">
			<div className="flex flex-col justify-start w-full h-full gap-4 p-4 bg-white border rounded-lg shadow-lg">
				<div className="grid w-full grid-cols-12 gap-4 min-h-20">
					<div className="flex flex-col justify-between w-full h-full col-span-4">
						<div className="flex flex-row w-full gap-4 h-fit">
							<input
								type="text"
								value={currentTest.testName}
								onChange={(e) =>
									onChangeTestName(e.target.value)
								}
								placeholder="Test name"
								className="w-full h-8 p-2 border-2 border-red-200 rounded-lg outline-none focus:border-transparent focus:outline focus:ring focus:ring-red-400 bg-primary focus:bg-white"
							/>
							<button
								className="flex flex-row px-4 py-1 font-semibold text-white bg-red-400 rounded-lg cursor-pointer w-fit h-fit"
								onClick={() => saveTest()}>
								<span>Save</span>
							</button>
						</div>
						<div className="flex flex-row items-center w-full gap-2 h-fit">
							<DeletePartDropDownButton />
							<span className="text-3xl font-bold">
								Part {currentPart + 1}
							</span>
						</div>
					</div>

					<div className="flex items-center justify-center w-full col-span-4 col-start-5 gap-2 min-h-fit">
						<div className="flex items-center justify-center border-2 border-red-200 border-solid rounded-full w-fit min-h-fit">
							{currentTest.partList.map((_, index) => {
								return (
									<button
										key={index}
										onClick={() => setCurrentPart(index)}
										className="relative px-3 py-1 text-sm font-medium rounded-full">
										{currentPart === index && (
											<motion.div
												layoutId="pill"
												className="absolute inset-0 bg-red-400 rounded-full"
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
							className="p-2 bg-red-400 rounded-full cursor-pointer w-fit h-fit"
							onClick={() => addPart()}>
							<FaPlus size={15} color="white" />
						</div>
					</div>

					<div className="flex flex-col w-full h-full col-span-3 col-start-10"></div>
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
