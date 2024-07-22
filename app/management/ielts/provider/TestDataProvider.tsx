"use client";
import { Quiz, Test } from "@/app/interface/quiz";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface TestContextType {
	TestList: Test[];
	setTestList: Dispatch<SetStateAction<Test[]>>;
	quizList: Quiz[];
	setQuizList: Dispatch<SetStateAction<Quiz[]>>;
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	handleChangePage: (
		event: React.ChangeEvent<unknown>,
		value: number
	) => void;
	fetchType: string;
	setFetchType: Dispatch<SetStateAction<string>>;
	searchPayload: {
		searchValue: string;
		searchField: string;
	};
	setSearchPayload: Dispatch<
		SetStateAction<{
			searchValue: string;
			searchField: string;
		}>
	>;
	skillType: string;
	setSkillType: Dispatch<SetStateAction<string>>;
	search: () => void;
}

const TestContext = createContext<TestContextType | null>(null);

export const useTest = () => {
	const context = useContext(TestContext);
	if (!context) {
		throw new Error("useTest must be used within a TestProvider");
	}
	return context;
};

export default function TestDataProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [TestList, setTestList] = useState<Test[]>([]);
	const [quizList, setQuizList] = useState<Quiz[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [fetchType, setFetchType] = useState<string>("fulltests");
	const [skillType, setSkillType] = useState<string>("");

	const [searchPayload, setSearchPayload] = useState({
		searchValue: "",
		searchField: "",
	});

	const search = () => {};

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setCurrentPage(value);
	};

	return (
		<TestContext.Provider
			value={{
				TestList,
				setTestList,
				quizList,
				setQuizList,
				currentPage,
				setCurrentPage,
				handleChangePage,
				fetchType,
				setFetchType,
				searchPayload,
				setSearchPayload,
				skillType,
				setSkillType,
				search,
			}}>
			{children}
		</TestContext.Provider>
	);
}
