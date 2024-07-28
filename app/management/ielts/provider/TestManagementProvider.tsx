"use client";
import { TestOperation } from "@/app/lib/main";
import { TestInfor } from "@/app/interface/quiz";
import { useRouter } from "next/navigation";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useAuth } from "@/app/provider/AuthProvider";
import { FetchingType, SearchCriteria } from "@/app/lib/interfaces";

interface TestContextType {
	testList: TestInfor[];
	currentPage: number;
	searchCriteria: SearchCriteria;
	currentTest: TestInfor;

	search: () => void;
	deleteTest: (id: string) => void;
	createTest: () => void;
	handleChangePage: (_: any, value: number) => void;
	onSelectTest: (test: TestInfor) => void;
	onChangeSearchCriteria: (criteria: SearchCriteria) => void;
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
	const router = useRouter();

	const [testList, setTestList] = useState<TestInfor[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentTest, setCurrentTest] = useState<TestInfor>(null);
	const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
		field: "name",
		operator: "~",
		value: "",
	});

	const search = () => {
		const newTestOperation = new TestOperation();

		let newSearchCriteria = [];
		if (searchCriteria.value != "") {
			newSearchCriteria.push(searchCriteria);
		}

		newTestOperation
			.search(
				FetchingType.FULL,
				null,
				{
					criteria: newSearchCriteria,
					addition: {
						sort: [],
						page: currentPage,
						size: 8,
						group: null,
					},
				},
				sid
			)
			.then((response) => {
				console.log(response);
				setTestList(response.data as TestInfor[]);
			});
	};

	useEffect(() => {
		search();
	}, [currentPage]);

	const deleteTest = (id: string) => {
		const newTestOperation = new TestOperation();
		newTestOperation.delete(id as any, sid).then((res) => {
			if (res.success) {
				alert("Delete successfully");
				const newTestList = [];
				testList.forEach((test) => {
					if (test.id != id) {
						newTestList.push(test);
					}
				});
				setTestList(newTestList);
			} else {
				alert(res.message);
			}
		});
	};

	const createTest = () => {
		const newTestOperation = new TestOperation();
		newTestOperation
			.createFullTest(
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
			)
			.then((res) => {
				console.log(res);
				if (res.success) {
					console.log(res.data);
					router.push(`/management/ielts/fulltest/${res.data.id}`);
				} else {
					alert(res.message);
				}
			});
	};

	const handleChangePage = (_: any, value: number) => {
		setCurrentPage(value);
	};

	const onSelectTest = (test: TestInfor) => {
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

				handleChangePage,
				search,
				deleteTest,
				createTest,
				onSelectTest,
				onChangeSearchCriteria,
			}}>
			{children}
		</TestContext.Provider>
	);
}