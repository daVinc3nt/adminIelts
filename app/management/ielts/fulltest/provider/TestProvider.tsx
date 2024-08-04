"use client";
import { Tag } from "@/app/interface/tag/tag";
import {
	Quiz,
	ReciveTestToTest,
	setStartFrom,
	Test,
	TestToUpdateTest,
} from "@/app/interface/test/test";
import {
	CreateFullPracticeFromTest,
	Skill,
	UpdateFullTest,
} from "@/app/lib/interfaces";
import {
	PracticeOperation,
	QuizOperation,
	TagOperation,
	TestOperation,
	UploadOperation,
} from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface TestContextType {
	test: Test;
	currentQuizIndex: number;
	currentSkill: Skill;
	currentPractice: Quiz;
	fileList: File[];
	isOpenCreateQuizPractice: boolean;
	urlList: string[];
	isLoading: boolean;
	practiceType: "quiz" | "group";
	tagList: Tag[];

	onChangeTest: (test: Test) => void;
	onChangeQuiz: (quiz: Quiz, skill: Skill, quizIndex: number) => void;
	getTestById: (id: string) => void;
	onChangecurrentQuizIndex: (index: number) => void;
	onChangeCurrentSkill: (skill: Skill) => void;
	onSave: () => void;
	onDeleteQuiz: (quizIndex: number, skill: Skill) => void;
	onSelectPractice: (test: Quiz) => void;
	onChangeFileList: (files: File[]) => void;
	onChangeIsOpenCreateQuizPractice: (value: boolean) => void;
	createPratice: (test: CreateFullPracticeFromTest) => void;
	onChangeIsLoading: (value: boolean) => void;
	onChangePracticeType: (type: "quiz" | "group") => void;
}

const TestContext = createContext<TestContextType | null>(null);

export const useTest = () => {
	const context = useContext(TestContext);
	if (!context) {
		throw new Error("useTestManagement must be used within a TestProvider");
	}
	return context;
};

export default function TestProvider({ children }: { children: ReactNode }) {
	const { sid } = useAuth();
	const { setSuccess, setError } = useUtility();

	const [test, setTest] = useState<Test>();
	const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
	const [currentSkill, setCurrentSkill] = useState<Skill>(Skill.READING);
	const [practiceType, setPracticeType] = useState<"quiz" | "group">("quiz");
	const [fileList, setFileList] = useState<File[]>([]);
	const [urlList, setUrlList] = useState<string[]>([]);
	const [currentPractice, setCurrentPractice] = useState<Quiz>();
	const [isOpenCreateQuizPractice, setIsOpenCreateQuizPractice] =
		useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [tagList, setTagList] = useState<Tag[]>([]);

	useEffect(() => {
		const fetchTagList = () => {
			const newTagOperation = new TagOperation();
			newTagOperation
				.search(
					{
						criteria: [],
						addition: {
							sort: [],
							page: 1,
							size: 1000,
							group: [],
						},
					},
					sid
				)
				.then((res) => {
					if (res.success) {
						setTagList(res.data);
					} else {
						setError(res.message);
					}
				});
		};
		fetchTagList();
	}, []);

	useEffect(() => {
		if (isLoading) {
			setTimeout(() => {
				setIsLoading(false);
			}, 400);
		}
	}, [isLoading]);

	const onChangePracticeType = (type: "quiz" | "group") => {
		setPracticeType(type);
	};

	const onChangeIsLoading = (value: boolean) => {
		setIsLoading(value);
	};

	const createPratice = (test: CreateFullPracticeFromTest) => {
		const newPracrticeOperation = new PracticeOperation();
		newPracrticeOperation.create(test, sid).then((res) => {
			if (res.success) {
				const newTest = ReciveTestToTest(res.data);
				getFileList(newTest);
				setTest(newTest);
				setSuccess("Practice created successfully");
				setIsOpenCreateQuizPractice(false);
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const getTestById = (id: string) => {
		const newTestOperation = new TestOperation();
		newTestOperation.findOne(id as any, sid).then((res) => {
			if (res.success) {
				if (res.data === null) {
					setTest(null);
					setError("Test not found");
					return;
				}
				const newTest = ReciveTestToTest(res.data);
				getFileList(newTest);
				setTest(newTest);
				if (newTest.reading.length > 0) {
					setCurrentSkill(Skill.READING);
				} else if (newTest.listening.length > 0) {
					setCurrentSkill(Skill.LISTENING);
				} else if (newTest.writing.length > 0) {
					setCurrentSkill(Skill.WRITING);
				} else {
					setCurrentSkill(Skill.SPEAKING);
				}
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const onSave = () => {
		const newTestOperation = new TestOperation();
		const updateTest = TestToUpdateTest(setStartFrom(test));
		const updateFullTest: UpdateFullTest = {
			files: fileList,
			data: updateTest,
		};
		newTestOperation
			.update(test.id as any, updateFullTest, sid)
			.then((res) => {
				if (res.success) {
					setSuccess("Test updated successfully");
					const newtest = ReciveTestToTest(res.data);
					console.log(newtest);
					getFileList(newtest);
					setTest(newtest);
				} else {
					setError(res.message);
					console.error(res.message);
				}
			});
	};

	const removeQuiz = (quizIndex: number, skill: Skill) => {
		const newTest = { ...test };
		const newFileList = [...fileList];
		const newUrlList = [...urlList];
		switch (skill) {
			case Skill.LISTENING:
				newTest.listening.splice(quizIndex, 1);
				newFileList.splice(quizIndex, 1);
				newUrlList.splice(quizIndex, 1);
				break;
			case Skill.WRITING:
				newTest.writing.splice(quizIndex, 1);
				break;
			case Skill.SPEAKING:
				newTest.speaking.splice(quizIndex, 1);
				break;
			default:
				newTest.reading.splice(quizIndex, 1);
		}
		setTest(newTest);
		setFileList(newFileList);
		setUrlList(newUrlList);
	};

	const onDeleteQuiz = (quizIndex: number, skill: Skill) => {
		const newQuizOperation = new QuizOperation();
		let quizId = "";
		switch (skill) {
			case Skill.LISTENING:
				quizId = test.listening[quizIndex].id;
				break;
			case Skill.WRITING:
				quizId = test.writing[quizIndex].id;
				break;
			case Skill.SPEAKING:
				quizId = test.speaking[quizIndex].id;
				break;
			default:
				quizId = test.reading[quizIndex].id;
		}
		if (quizId) {
			newQuizOperation.delete(quizId as any, sid).then((res) => {
				if (res) {
					setSuccess("Quiz deleted successfully");
					setCurrentQuizIndex(currentQuizIndex - 1);
					setCurrentSkill(Skill.READING);
					removeQuiz(quizIndex, skill);
				} else {
					setError(res.message);
					console.error(res.message);
				}
			});
		} else {
			setSuccess("Quiz deleted successfully");
			setCurrentQuizIndex(currentQuizIndex - 1);
			setCurrentSkill(Skill.READING);
			removeQuiz(quizIndex, skill);
		}
	};

	const onChangeTest = (test: Test) => {
		setTest(test);
	};

	const onChangeQuiz = (quiz: Quiz, skill: Skill, quizIndex: number) => {
		const newTest = { ...test };
		switch (skill) {
			case Skill.LISTENING:
				newTest.listening[quizIndex] = quiz;
				break;
			case Skill.WRITING:
				newTest.writing[quizIndex] = quiz;
				break;
			case Skill.SPEAKING:
				newTest.speaking[quizIndex] = quiz;
				break;
			default:
				newTest.reading[quizIndex] = quiz;
		}
		onChangeTest(newTest);
	};

	const onChangecurrentQuizIndex = (index: number) => {
		setCurrentQuizIndex(index);
	};

	const onChangeCurrentSkill = (skill: Skill) => {
		setCurrentSkill(skill);
	};

	const onSelectPractice = (quiz: Quiz) => {
		setCurrentPractice(quiz);
	};

	const getFileList = (test: Test) => {
		let files: File[] = [];
		let newUrlList: string[] = [];
		const newUploadOperation = new UploadOperation();
		test.listening.forEach((quiz) => {
			files.push(null);
			if (quiz.filePath) {
				newUploadOperation.search(quiz.filePath, sid).then((res) => {
					if (res.success) {
						newUrlList.push(res.data);
					} else {
						newUrlList.push(null);
					}
				});
			} else {
				files.push(null);
				newUrlList.push(null);
			}
		});
		setUrlList(newUrlList);
		setFileList(files);
	};

	const onChangeFileList = (files: File[]) => {
		setFileList(files);
	};

	const onChangeIsOpenCreateQuizPractice = (value: boolean) => {
		setIsOpenCreateQuizPractice(value);
	};

	return (
		<TestContext.Provider
			value={{
				test,
				currentQuizIndex,
				currentSkill,
				currentPractice,
				fileList,
				urlList,
				isOpenCreateQuizPractice,
				isLoading,
				practiceType,
				tagList,

				onChangeTest,
				onChangeQuiz,
				getTestById,
				onChangecurrentQuizIndex,
				onChangeCurrentSkill,
				onSave,
				onDeleteQuiz,
				onSelectPractice,
				onChangeFileList,
				onChangeIsOpenCreateQuizPractice,
				createPratice,
				onChangeIsLoading,
				onChangePracticeType,
			}}>
			{children}
		</TestContext.Provider>
	);
}
