"use client";
import { useLayoutEffect, useRef, useState } from "react";
import {
	Multiple_Choice_Question,
	True_False_Question,
} from "../../ReadingInterface";

interface Props {
	question: Multiple_Choice_Question;
}

export default function MCQuestion({ question }: Props) {
	const [openIndex, setOpenIndex] = useState<boolean>(false);

	const questionNumber = question.questionNumber;
	const numberOfAns = question.numberOfAnswer;

	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);

	const [containerHeight, setContainerHeight] = useState<number>();
	const [headerHeight, setHeaderHeight] = useState<number>();

	useLayoutEffect(() => {
		const getHeight = () => {
			if (containerRef.current) {
				const clone = containerRef.current.cloneNode(
					true
				) as HTMLElement;
				clone.style.visibility = "hidden";
				clone.style.position = "absolute";
				clone.style.height = "auto";
				clone.style.width = containerRef.current.offsetWidth + "px";
				document.body.appendChild(clone);
				setContainerHeight(clone.offsetHeight);
				document.body.removeChild(clone);
			}

			if (headerRef.current) {
				const clone = headerRef.current.cloneNode(true) as HTMLElement;
				clone.style.visibility = "hidden";
				clone.style.position = "absolute";
				clone.style.height = "auto";
				clone.style.width = headerRef.current.offsetWidth + "px";
				document.body.appendChild(clone);
				setHeaderHeight(clone.offsetHeight);
				document.body.removeChild(clone);
			}
		};

		getHeight();

		window.addEventListener("resize", getHeight);

		return () => window.removeEventListener("resize", getHeight);
	}, []);

	return (
		<div
			style={{
				height: openIndex ? containerHeight : headerHeight + "px",
				borderColor: openIndex ? "#f87171" : "#fecaca",
				backgroundColor: openIndex ? "white" : "#F8F9FA",
			}}
			ref={containerRef}
			className={`w-full duration-300 overflow-hidden border-2 flex flex-col items-center gap-0 rounded-lg`}>
			<div
				ref={headerRef}
				onClick={() => {
					setOpenIndex(!openIndex);
					console.log(headerHeight);
					console.log(containerHeight);
				}}
				className="flex flex-row p-2 gap-2 items-start text-sm w-full h-fit cursor-pointer">
				<div className="h-full flex items-center">
					<div className="min-w-8 min-h-8 flex justify-center items-center rounded-full bg-red-400 text-white font-bold p-1 px-2">
						{`${numberOfAns == 1 ? questionNumber : questionNumber + " - " + (questionNumber + numberOfAns - 1)}`}
					</div>
				</div>
				<div className="max-lg:text-base h-fit">
					{question.question}
				</div>
			</div>

			<hr className="solid border-gray-300 border rounded-full w-11/12"></hr>

			<div className={`w-full h-fit flex flex-col text-sm p-2`}>
				{question.choice.map((choice, index) => {
					return (
						<div
							key={index}
							className="w-full flex flex-row items-center gap-2 border border-transparent rounded-lg hover:bg-red-400 hover:text-white duration-100 hover:border-gray-200 cursor-pointer p-2">
							<div>
								<b>{String.fromCharCode(65 + index)}.</b>{" "}
								{choice}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
