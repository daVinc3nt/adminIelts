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
import { FetchingType, SearchCriteria } from "@/app/lib/interfaces";
import { ReciveTest, ReciveTestToTest, Test } from "@/app/interface/test/test";
import { useUtility } from "@/app/provider/UtilityProvider";

interface TestContextType {
	testList: Test[];
	currentPage: number;
	searchCriteria: SearchCriteria;
	currentTest: Test;

	search: () => void;
	deleteTest: (id: string) => void;
	createTest: () => Promise<boolean>;
	handleChangePage: (_: any, value: number) => void;
	onSelectTest: (test: Test) => void;
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
	const { setSuccess, setError } = useUtility();
	const router = useRouter();

	const [testList, setTestList] = useState<Test[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentTest, setCurrentTest] = useState<Test>(null);
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
			});
	};

	useEffect(() => {
		search();
	}, [currentPage]);

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
			router.push(`/management/ielts/fulltest/${res.data.id}`);
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