import { BsPlus, BsThreeDots } from "react-icons/bs";
import { useTestData } from "../../provider/TestDataProvider";
import { useEffect, useMemo, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import {
	FillingGroup,
	Quiz,
	QuizDataRecieve,
	quizDataRecieve2Quiz,
	TestDataRecieve2Test,
} from "@/app/interface/quiz";
import {
	Category,
	CreateQuiz,
	QuizType,
	Skill,
	UpdateTest,
} from "@/app/lib/interfaces";
import { QuizOperation, TestOperation } from "@/app/lib/main";

export default function QuizList() {
	const Tabref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(Tabref);

	const addQuizButtonRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				addQuizButtonRef.current &&
				!addQuizButtonRef.current.contains(event.target as Node)
			) {
				addQuizButtonRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const quizSettingRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				quizSettingRef.current &&
				!quizSettingRef.current.contains(event.target as Node)
			) {
				quizSettingRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const {
		quizList,
		setQuizList,
		currentQuizIndex,
		setCurrentQuizIndex,
		currentTest,
	} = useTestData();

	const addQuiz = (category: Category, skill: Skill) => {
		const newQuiz: Quiz = {
			content: "",
			category: category,
			tag: "",
			skill: skill,
			groups: [],
		};

		if (skill == Skill.WRITING) {
			const newGroup: FillingGroup = {
				type: QuizType.FILLING,
				question: "",
				startFrom: 0,
				quizzes: [
					{
						description: "",
						answer: "",
						explaination: "",
					},
				],
			};
			newQuiz.groups.push(newGroup);
		}

		if (skill == Skill.SPEAKING) {
			const newGroup: FillingGroup = {
				type: QuizType.FILLING,
				question: "",
				startFrom: 0,
				quizzes: [],
			};
			newQuiz.groups.push(newGroup);
		}

		let newQuizList = [...quizList, newQuiz];

		const testOperation = new TestOperation();
		const updateTestPayLoad: UpdateTest = TestDataRecieve2Test(
			currentTest,
			newQuizList
		);
		testOperation
			.update(currentTest.id as any, updateTestPayLoad, testToken)
			.then((response) => {
				console.log(response);
				if (response.success == true) {
					setQuizList(newQuizList);
				}
			});
	};

	const deletePart = (quizIndex: number, deletefromDataBase: boolean) => {
		if (deletefromDataBase) {
			let newQuizList = [...quizList];
			newQuizList.splice(quizIndex, 1);

			const testOperation = new TestOperation();
			const newUpdateTest = TestDataRecieve2Test(
				currentTest,
				newQuizList
			);
			testOperation
				.update(currentTest.id as any, newUpdateTest, testToken)
				.then((response) => {
					console.log(response);
					if (response.success == true) {
						alert("Delete successfully");
						setQuizList((prev) => {
							const newQuizList = [...prev];
							newQuizList.splice(quizIndex, 1);
							return newQuizList;
						});
					}
				});
		} else {
			const quizOperation = new QuizOperation();
			quizOperation
				.delete(quizList[quizIndex].id as any, testToken)
				.then((response) => {
					console.log(response);

					if (response.success == true) {
						alert("Delete successfully");
						setQuizList((prev) => {
							const newQuizList = [...prev];
							newQuizList.splice(quizIndex, 1);
							return newQuizList;
						});
					}
				});
		}
	};

	const onSelectQuiz = (index: number) => {
		setCurrentQuizIndex(index);
	};

	const sortQuizList = useMemo(() => {
		const order = {
			reading: 1,
			listening: 2,
			writing: 3,
			speaking: 4,
		};
		return quizList.sort((a, b) => order[a.skill] - order[b.skill]);
	}, [quizList]);

	return (
		<div className="flex flex-row w-full gap-2 pt-2">
			<details ref={addQuizButtonRef} className="relative">
				<summary className="list-none">
					<div
						title="Add Part"
						className="flex items-center justify-center duration-200 rounded-full dark:bg-foreground-red size-8 bg-foreground-blue">
						<BsPlus size={35} color="white" strokeWidth={0.5} />
					</div>
				</summary>
				<div className="top-8 -left-10 absolute w-44 h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
					<button
						onClick={() => addQuiz(Category.IELTS, Skill.READING)}
						className="flex items-start justify-start w-full p-2 text-sm text-black dark:text-gray-200 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
						Add Reading Part
					</button>
					<button
						onClick={() => addQuiz(Category.IELTS, Skill.LISTENING)}
						className="flex items-start justify-start w-full p-2 text-sm text-black dark:text-gray-200 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
						Add Listening Part
					</button>
					<button
						onClick={() => addQuiz(Category.IELTS, Skill.WRITING)}
						className="flex items-start justify-start w-full p-2 text-sm text-black dark:text-gray-200 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
						Add Writing Part
					</button>
					<button
						onClick={() => addQuiz(Category.IELTS, Skill.SPEAKING)}
						className="flex items-start justify-start w-full p-2 text-sm text-black dark:text-gray-200 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
						Add Speaking Part
					</button>
				</div>
			</details>

			<div
				className="w-full overflow-x-scroll h-40 -mb-32 overflow-y-visible scrollbar-hide flex flex-row gap-2 cursor-pointer"
				{...events}
				ref={Tabref}>
				{sortQuizList.map((quiz, index) => {
					const countQuizSkillBeforeIndex = () => {
						let count = 0;
						for (let i = 0; i < index; i++) {
							if (quizList[i].skill == quiz.skill) count++;
						}
						return count;
					};
					return (
						<div
							onClick={() => onSelectQuiz(index)}
							key={index}
							className={`relative flex flex-row items-center justify-center whitespace-nowrap w-fit h-fit px-1 py-1 text-center rounded-md cursor-pointer duration-200 ${currentQuizIndex == index ? "bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200" : "dark:bg-gray-22 bg-mecury-gray"}`}>
							{partLabel(quiz.skill, countQuizSkillBeforeIndex())}
							{currentQuizIndex == index ? (
								<details
									ref={quizSettingRef}
									className="relative">
									<summary className="list-none">
										<BsThreeDots className="p-1 text-white size-6" />
									</summary>
									<div className="top-8 right-0 absolute w-fit h-fit bg-white dark:bg-gray-22 rounded-md shadow-md z-[1001] flex flex-col p-2 justify-center items-center">
										<button
											onClick={() =>
												deletePart(index, false)
											}
											title="Remove part from test"
											className="flex items-start justify-start w-full p-2 text-sm text-red-500 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
											Remove part
										</button>
										<button
											onClick={() =>
												deletePart(index, true)
											}
											title="Delete part from database"
											className="flex items-start justify-start w-full p-2 text-sm text-red-500 rounded-md h-fit hover:bg-mecury-gray dark:hover:bg-pot-black">
											Delete part
										</button>
									</div>
								</details>
							) : (
								<BsThreeDots className="p-1 text-white size-6" />
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

const partLabel = (skill: Skill, index: number) => {
	switch (skill) {
		case Skill.READING:
			return `Reading Part ${index + 1}`;
		case Skill.LISTENING:
			return `Listening Part ${index + 1}`;
		case Skill.WRITING:
			return `Writing Part ${index + 1}`;
		case Skill.SPEAKING:
			return `Speaking Part ${index + 1}`;
	}
};

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
