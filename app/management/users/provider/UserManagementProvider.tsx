import { SearchCriteria, SearchPayload } from "@/app/lib/interfaces";
import { AccountOperation } from "@/app/lib/main";
import { UserInformation } from "@/app/interface/user";
import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect, // Import useContext
} from "react";

interface UserContextType {
	userInforList: UserInformation[];
	setUserInforList: Dispatch<SetStateAction<UserInformation[]>>;
	currentUser: UserInformation;
	setCurrentUser: Dispatch<SetStateAction<UserInformation>>;
	searchCiterias: SearchCriteria[];
	setSearchCiterias: Dispatch<SetStateAction<SearchCriteria[]>>;
	search: () => Promise<void>;
	role: string;
	setRole: Dispatch<SetStateAction<string>>;
	status: string | boolean;
	setStatus: Dispatch<SetStateAction<string | boolean>>;
	searchField: string;
	setSearchField: Dispatch<SetStateAction<string>>;
	searchValue: string;
	setSearchValue: Dispatch<SetStateAction<string>>;
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	handleChangePage: (
		event: React.ChangeEvent<unknown>,
		value: number
	) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserManagement = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserManagement must be used within a UserProvider");
	}
	return context;
};

export const UserManagementProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [userInforList, setUserInforList] = useState<UserInformation[]>([]);

	const [currentUser, setCurrentUser] = useState<UserInformation>(null);

	const [searchCiterias, setSearchCiterias] = useState<SearchCriteria[]>([]);

	const [role, setRole] = useState<string>("");
	const [status, setStatus] = useState<boolean | string>("");

	const [searchField, setSearchField] = useState<string>("firstName");
	const [searchValue, setSearchValue] = useState<string>("");

	const [currentPage, setCurrentPage] = useState<number>(1);

	const search = async () => {
		const accoutOperation = new AccountOperation();
		const newSearchCriteria: SearchCriteria[] = [];
		if (role !== "") {
			newSearchCriteria.push({
				field: "role",
				operator: "=",
				value: role,
			});
		}
		if (status !== "") {
			newSearchCriteria.push({
				field: "active",
				operator: "=",
				value: status,
			});
		}

		if (searchField !== "" && searchValue !== "") {
			newSearchCriteria.push({
				field: searchField,
				operator: "~",
				value: searchValue,
			});
		}

		await accoutOperation
			.search(
				{
					criteria: newSearchCriteria,
					addition: {
						sort: [],
						page: currentPage,
						size: 6,
						group: null,
					},
				} as SearchPayload,
				testToken
			)
			.then((response) => {
				console.log(response);
				setUserInforList(response.data as UserInformation[]);
			});
	};

	useEffect(() => {
		search();
	}, [currentPage]);

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setCurrentPage(value);
	};

	return (
		<UserContext.Provider
			value={{
				userInforList,
				setUserInforList,
				currentUser,
				setCurrentUser,
				searchCiterias,
				setSearchCiterias,
				search,
				role,
				setRole,
				status,
				setStatus,
				searchField,
				setSearchField,
				searchValue,
				setSearchValue,
				currentPage,
				setCurrentPage,
				handleChangePage,
			}}>
			{children}
		</UserContext.Provider>
	);
};

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIxODk4MDIwLCJleHAiOjE3NTM0MzQwMjB9.9Ut8K9PDmQt8hBgWYgxHbtvbwO6TICtqmMvhOTdkSac";
