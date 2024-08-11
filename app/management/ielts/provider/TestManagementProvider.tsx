"use client";
import { PracticeOperation, TestOperation } from "@/app/lib/main";
import { useRouter } from "next/navigation";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useAuth } from "@/app/provider/AuthProvider";
import {
	FetchingType,
	SearchCriteria,
	SearchPayload,
	Skill,
} from "@/app/lib/interfaces";
import { ReciveTest, ReciveTestToTest, Test } from "@/app/interface/test/test";
import { useUtility } from "@/app/provider/UtilityProvider";
import { getSid } from "@/app/interface/cookies/cookies";

const initSearchCriteria: SearchCriteria = {
	field: "name",
	operator: "~",
	value: "",
};
const numberOfItemsPerPage = 6;

interface TestContextType {
	testList: Test[];
	currentPage: number;
	searchCriteria: SearchCriteria;
	currentTest: Test;
	fetchType: "test" | "practice";
	currentSkill: Skill;
	isLoading: boolean;
	numberOfPage: number;
	numberOfTest: number;
	numberOfPractice: number;

	search: () => void;
	deleteTest: (id: string) => void;
	createTest: () => Promise<boolean>;
	handleChangePage: (_: any, value: number) => void;
	onSelectTest: (test: Test) => void;
	onChangeSearchCriteria: (criteria: SearchCriteria) => void;
	onChangeFetchType: (type: "test" | "practice") => void;
	onChangeCurrentSkill: (skill: Skill) => void;
	refresh: () => void;
}

const TestContext = createContext<TestContextType | null>(null);

export const useTestManagement = () => {
	const context = useContext(TestContext);
	if (!context) {
		throw new Error("useTestManagement must be used within a TestProvider");
	}
	return context;
};

export default function TestManagementProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { setSuccess, setError } = useUtility();

	const [testList, setTestList] = useState<Test[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentTest, setCurrentTest] = useState<Test>(null);
	const [fetchType, setFetchType] = useState<"test" | "practice">("test");
	const [currentSkill, setCurrentSkill] = useState<Skill>("" as any);
	const [searchCriteria, setSearchCriteria] =
		useState<SearchCriteria>(initSearchCriteria);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [numberOfPage, setNumberOfPage] = useState<number>(10);
	const [numberOfTest, setNumberOfTest] = useState<number>(0);
	const [numberOfPractice, setNumberOfPractice] = useState<number>(0);

	const refresh = () => {
		setIsLoading(true);
		setTimeout(() => {
			changePage();
			setIsLoading(false);
		}, 100);
	};

	useEffect(() => {
		search();
	}, [currentSkill, fetchType]);

	const search = () => {
		const newTestOperation = new TestOperation();

		let searchPayload: SearchPayload = {
			criteria: [],
			addition: {
				sort: [],
				page: currentPage,
				size: numberOfItemsPerPage,
				group: null,
			},
		};

		if (searchCriteria.value != "") {
			searchPayload.criteria.push(searchCriteria);
		}

		searchPayload.criteria.push({
			field: "isPractice",
			operator: "=",
			value: fetchType == "practice",
		});

		const skill = fetchType == "practice" ? currentSkill : "";

		newTestOperation
			.search(FetchingType.FULL, skill as any, searchPayload, getSid())
			.then((res) => {
				if (res.success) {
					console.log(res.data);
					const newTestList = res.data.map(
						(receiveTest: ReciveTest) =>
							ReciveTestToTest(receiveTest)
					);
					setTestList(newTestList);
					if (searchPayload.criteria.length === 0) {
						if (fetchType == "test") {
							setNumberOfPage(
								Math.ceil(numberOfTest / numberOfItemsPerPage)
							);
						} else {
							setNumberOfPage(
								Math.ceil(
									numberOfPractice / numberOfItemsPerPage
								)
							);
						}
					} else {
						if (res.data.length == numberOfItemsPerPage) {
							setNumberOfPage(2);
						} else {
							setNumberOfPage(1);
						}
					}
				} else {
					setError(res.message);
					console.error(res.message);
				}
				setIsLoading(false);
			});
		setCurrentPage(1);
	};

	const changePage = () => {
		const newTestOperation = new TestOperation();

		let searchPayload: SearchPayload = {
			criteria: [],
			addition: {
				sort: [],
				page: currentPage,
				size: numberOfItemsPerPage,
				group: null,
			},
		};

		if (searchCriteria.value != "") {
			searchPayload.criteria.push(searchCriteria);
		}

		searchPayload.criteria.push({
			field: "isPractice",
			operator: "=",
			value: fetchType == "practice",
		});

		const skill = fetchType == "practice" ? currentSkill : "";

		newTestOperation
			.search(FetchingType.FULL, skill as any, searchPayload, getSid())
			.then((res) => {
				if (res.success) {
					const newTestList = res.data.map(
						(receiveTest: ReciveTest) =>
							ReciveTestToTest(receiveTest)
					);
					setTestList(newTestList);
					if (searchPayload.criteria.length > 0) {
						if (
							res.data.length == numberOfItemsPerPage &&
							currentPage == numberOfPage
						) {
							setNumberOfPage(numberOfPage + 1);
						}
					}
				} else {
					setError(res.message);
					console.error(res.message);
				}
				setIsLoading(false);
			});
	};

	useEffect(() => {
		if (!isLoading) {
			changePage();
		}
	}, [currentPage]);

	useEffect(() => {
		const newTestOperation = new TestOperation();
		newTestOperation.count(getSid()).then((res) => {
			if (res.success) {
				setNumberOfTest(res.data);
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
		const newPracticeOperation = new PracticeOperation();
		newPracticeOperation.count(getSid()).then((res) => {
			if (res.success) {
				setNumberOfPractice(res.data);
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	}, []);

	const onChangeFetchType = (type: "test" | "practice") => {
		setFetchType(type);
	};

	const onChangeCurrentSkill = (skill: Skill) => {
		setCurrentSkill(skill);
	};

	const deleteTest = (id: string) => {
		const newTestOperation = new TestOperation();
		newTestOperation.delete(id as any, getSid()).then((res) => {
			if (res.success) {
				setSuccess("Delete successfully");
				search();
				if (fetchType == "test") {
					setNumberOfTest(numberOfTest - 1);
				} else {
					setNumberOfPractice(numberOfPractice - 1);
				}
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const createTest = async () => {
		const newTestOperation = new TestOperation();
		const res = await newTestOperation.createFullTest(
			{
				files: [] as any,
				data: {
					name: "New test",
					hasPublished: false,
					reading: [],
					listening: [],
					writing: [],
					speaking: [],
				},
			},
			getSid()
		);
		if (res.success) {
			window.open(`/management/ielts/fulltest/${res.data.id}`, "_blank");
			setNumberOfTest(numberOfTest + 1);
			return true;
		}
		setError(res.message);
		console.error(res.message);
		return false;
	};

	const handleChangePage = (_: any, value: number) => {
		setCurrentPage(value);
	};

	const onSelectTest = (test: Test) => {
		setCurrentTest(test);
	};

	const onChangeSearchCriteria = (criteria: SearchCriteria) => {
		setSearchCriteria(criteria);
	};

	return (
		<TestContext.Provider
			value={{
				testList,
				currentPage,
				searchCriteria,
				currentTest,
				fetchType,
				currentSkill,
				isLoading,
				numberOfPage,
				numberOfTest,
				numberOfPractice,

				handleChangePage,
				search,
				deleteTest,
				createTest,
				onSelectTest,
				onChangeSearchCriteria,
				onChangeFetchType,
				onChangeCurrentSkill,
				refresh,
			}}>
			{children}
		</TestContext.Provider>
	);
}