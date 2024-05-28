"use client";
import {
	Dispatch,
	SetStateAction,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import {
	Multiple_Choice_Question,
	True_False_Question,
} from "../../ReadingInterface";

interface Props {
	question: Multiple_Choice_Question;
	answer: string[];
	setAnswer: Dispatch<SetStateAction<string[]>>;
	open: boolean[];
	setOpen: Dispatch<SetStateAction<boolean[]>>;
}

export default function MCQuestion({
	question,
	answer,
	setAnswer,
	open,
	setOpen,
}: Props) {
	const questionIndex = question.questionNumber;
	const numberOfAns = question.numberOfAnswer;

	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	
	const [containerHeight, setContainerHeight] = useState<number>(10);
	const [headerHeight, setHeaderHeight] = useState<number>(10);

	const handleChangeAnswer = (value: string) => {
		const newAns = [...answer];

		if (numberOfAns == 1) {
			if (value == newAns[questionIndex - 1]) {
				newAns[questionIndex - 1] = "";
			} else {
				newAns[questionIndex - 1] = value;
			}
			setAnswer(newAns);
			return;
		}

		var repeat = false;
		for (var i = questionIndex; i <= questionIndex + numberOfAns - 1; i++) {
			if (value == newAns[i - 1]) {
				newAns[i - 1] = "";
				repeat = true;
				break;
			}
		}
		if (repeat) {
			setAnswer(newAns);
			return;
		}
		for (var i = questionIndex; i <= questionIndex + numberOfAns - 1; i++) {
			if (newAns[i - 1] == "") {
				newAns[i - 1] = value;
				break;
			}
		}
		setAnswer(newAns);
	};

	const handleOpenQuestion = () => {
		const newOpen = [...open];
		newOpen[questionIndex - 1] = !newOpen[questionIndex - 1];
		setOpen(newOpen);
	};

	const isAnswer = (value: string) => {
		for (var i = questionIndex; i <= questionIndex + numberOfAns - 1; i++) {
			if (answer[i - 1] == value) return true;
		}

		return false;
	};

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
					<div className="min-w-8 min-h-8 flex justify-center items-center rounded-full bg-red-400 text-white font-bold p-1 px-2">
						{`${numberOfAns == 1 ? questionIndex : questionIndex + " - " + (questionIndex + numberOfAns - 1)}`}
					</div>
				</div>
				<div
					className="max-lg:text-base h-fit"
					dangerouslySetInnerHTML={{ __html: question.question }}
				/>
			</div>

			<hr className="solid border-gray-300 border rounded-full w-11/12"></hr>

			<div className={`w-full h-fit flex flex-col text-sm p-2 gap-2`}>
				{question.choice.map((choice, index) => {
					return (
						<div
							key={index}
							onClick={() =>
								handleChangeAnswer(
									String.fromCharCode(65 + index)
								)
							}
							className={`w-full flex flex-row items-center gap-2 border border-transparent rounded-lg duration-100 cursor-pointer p-2 ${isAnswer(String.fromCharCode(65 + index)) ? "bg-red-400 text-white" : "hover:border-red-400 "} `}>
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
