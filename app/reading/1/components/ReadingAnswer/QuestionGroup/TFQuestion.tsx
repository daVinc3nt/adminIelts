"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { True_False_Question } from "../../ReadingInterface";

interface Props {
	question: True_False_Question;
}

export default function TFQuestion({ question }: Props) {
	const [openIndex, setOpenIndex] = useState<boolean>(false);

	const questionIndex = question.questionNumber;

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
				}}
				className="flex flex-row p-2 gap-2 items-start text-sm w-full h-fit cursor-pointer">
				<div className="h-full flex items-center">
					<div className="min-w-8 min-h-8 flex justify-center items-center rounded-full bg-red-400 text-white font-bold">
						{questionIndex}
					</div>
				</div>
				<div
					className="max-lg:text-base h-fit"
					dangerouslySetInnerHTML={{ __html: question.question }}
				/>
			</div>

			<hr className="solid border-gray-300 border rounded-full w-11/12"></hr>

			<div className={`w-full h-full flex flex-col text-sm p-2`}>
				<div className="w-full flex flex-row items-center gap-2 border border-transparent rounded-lg hover:bg-red-400 hover:text-white duration-100 hover:border-gray-200 cursor-pointer p-2">
					<div className="font-semibold">TRUE</div>
				</div>
				<div className="w-full flex flex-row items-center gap-2 border border-transparent rounded-lg hover:bg-red-400 hover:text-white duration-100 hover:border-gray-200 cursor-pointer p-2">
					<div className="font-semibold">FALSE</div>
				</div>
				<div className="w-full flex flex-row items-center gap-2 border border-transparent rounded-lg hover:bg-red-400 hover:text-white duration-100 hover:border-gray-200 cursor-pointer p-2">
					<div className="font-semibold">NOT GIVEN</div>
				</div>
			</div>
		</div>
	);
}
