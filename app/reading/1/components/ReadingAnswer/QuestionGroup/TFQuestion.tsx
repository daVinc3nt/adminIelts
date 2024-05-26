"use client";
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { True_False_Question } from "../../ReadingInterface";

interface Props {
	question: True_False_Question;
	answer: string[];
	setAnswer: Dispatch<SetStateAction<string[]>>;
	open: boolean[];
	setOpen: Dispatch<SetStateAction<boolean[]>>;
}

export default function TFQuestion({
	question,
	answer,
	setAnswer,
	open,
	setOpen,
}: Props) {
	const questionIndex = question.questionNumber;

	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const [containerHeight, setContainerHeight] = useState<number>();
	const [headerHeight, setHeaderHeight] = useState<number>();

	const handleChangeAnswer = (value: string) => {
		const newAns = [...answer];
		if (value == newAns[questionIndex - 1]) {
			newAns[questionIndex - 1] = "";
		} else {
			newAns[questionIndex - 1] = value;
		}
		setAnswer(newAns);
	};

	const handleOpenQuestion = () => {
		const newOpen = [...open];
		newOpen[questionIndex - 1] = !newOpen[questionIndex - 1];
		setOpen(newOpen);
	};

	// useEffect(() => {
	// 	const headerOffset = 300;
	// 	const elementPosition =
	// 		containerRef.current.getBoundingClientRect().top;
	// 	const offsetPosition = elementPosition + window.scrollY - headerOffset;

	// 	const container = document.getElementById("asnwer-container");
	// 	container.scrollTo({
	// 		top: offsetPosition,
	// 		behavior: "smooth",
	// 	});
	// }, [open[questionIndex - 1]]);

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
				height: open[questionIndex - 1]
					? containerHeight
					: headerHeight + "px",
				borderColor: open[questionIndex - 1] ? "#f87171" : "#fecaca",
				backgroundColor: open[questionIndex - 1] ? "white" : "#F8F9FA",
			}}
			ref={containerRef}
			className={`w-full duration-300 overflow-hidden border-2 flex flex-col items-center gap-0 rounded-lg`}>
			<div
				ref={headerRef}
				onClick={() => handleOpenQuestion()}
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

			<div className={`w-full h-full flex flex-col text-sm p-2 gap-2`}>
				<div
					onClick={() => handleChangeAnswer("TRUE")}
					className={`w-full flex flex-row items-center gap-2 border border-transparent rounded-lg duration-100 cursor-pointer p-2 ${answer[questionIndex - 1] == "TRUE" ? "bg-red-400 text-white" : "hover:border-red-400 "} `}>
					<div className="font-semibold">TRUE</div>
				</div>
				<div
					onClick={() => handleChangeAnswer("FALSE")}
					className={`w-full flex flex-row items-center gap-2 border border-transparent rounded-lg duration-100 cursor-pointer p-2 ${answer[questionIndex - 1] == "FALSE" ? "bg-red-400 text-white" : "hover:border-red-400 "} `}>
					<div className="font-semibold">FALSE</div>
				</div>
				<div
					onClick={() => handleChangeAnswer("NOT_GIVEN")}
					className={`w-full flex flex-row items-center gap-2 border border-transparent rounded-lg duration-100 cursor-pointer p-2 ${answer[questionIndex - 1] == "NOT_GIVEN" ? "bg-red-400 text-white" : "hover:border-red-400 "} `}>
					<div className="font-semibold">NOT GIVEN</div>
				</div>
			</div>
		</div>
	);
}
