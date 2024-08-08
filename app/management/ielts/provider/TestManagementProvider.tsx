"use client";
import { TestOperation } from "@/app/lib/main";
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

const initSearchCriteria: SearchCriteria = {
	field: "name",
	operator: "~",
	value: "",
};
const numberOfItemsPerPage = 8;

interface TestContextType {
	testList: Test[];
	currentPage: number;
	searchCriteria: SearchCriteria;
	currentTest: Test;
	fetchType: "test" | "practice";
	currentSkill: Skill;
	isLoading: boolean;
	numberOfPage: number;

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
	const { sid } = useAuth();
	const { setSuccess, setError } = useUtility();
	const router = useRouter();

	const [testList, setTestList] = useState<Test[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentTest, setCurrentTest] = useState<Test>(null);
	const [fetchType, setFetchType] = useState<"test" | "practice">("test");
	const [currentSkill, setCurrentSkill] = useState<Skill>("" as any);
	const [searchCriteria, setSearchCriteria] =
		useState<SearchCriteria>(initSearchCriteria);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [numberOfPage, setNumberOfPage] = useState<number>(10);

	useEffect(() => {
		search();
	}, [currentPage, currentSkill, fetchType]);

	const refresh = () => {
		setIsLoading(true);
		setTimeout(() => {
			search();
			setIsLoading(false);
		}, 100);
	};

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

		newTestOperation
			.search(FetchingType.FULL, currentSkill, searchPayload, sid)
			.then((res) => {
				if (res.success) {
					const newTestList = res.data.map(
						(receiveTest: ReciveTest) =>
							ReciveTestToTest(receiveTest)
					);
					setTestList(newTestList);
				} else {
					setError(res.message);
					console.error(res.message);
				}
				setIsLoading(false);
			});
	};

	const onChangeFetchType = (type: "test" | "practice") => {
		setFetchType(type);
	};

	const onChangeCurrentSkill = (skill: Skill) => {
		setCurrentSkill(skill);
	};

	const deleteTest = (id: string) => {
		const newTestOperation = new TestOperation();
		newTestOperation.delete(id as any, sid).then((res) => {
			if (res.success) {
				setSuccess("Delete successfully");
				search();
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
					reading: [],
					listening: [],
					writing: [],
					speaking: [],
				},
			},
			sid
		);
		if (res.success) {
			console.log(res.data);
			window.open(`/management/ielts/fulltest/${res.data.id}`, "_blank");
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