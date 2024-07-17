import {
	SearchAddition,
	SearchCriteria,
	SearchPayload,
} from "@/app/interface/interfaces";
import { AccountOperation } from "@/app/interface/main";
import { UserInformation } from "@/app/interface/user";
import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useContext, // Import useContext
} from "react";

interface UserContextType {
	userInforList: UserInformation[];
	setUserInforList: Dispatch<SetStateAction<UserInformation[]>>;
	currentUser: UserInformation;
	setCurrentUser: Dispatch<SetStateAction<UserInformation>>;
	searchCiterias: SearchCriteria[];
	setSearchCiterias: Dispatch<SetStateAction<SearchCriteria[]>>;
	searchAddition: SearchAddition;
	setSearchAddition: Dispatch<SetStateAction<SearchAddition>>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	search: () => Promise<void>;
	loadMore: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserData = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserData must be used within a UserProvider");
	}
	return context;
};

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [userInforList, setUserInforList] = useState<UserInformation[]>([]);

	const [currentUser, setCurrentUser] = useState<UserInformation>(null);

	const [searchCiterias, setSearchCiterias] = useState<SearchCriteria[]>([]);
	const [searchAddition, setSearchAddition] = useState<SearchAddition>({
		sort: [],
		page: 1,
		size: 10,
		group: null,
	});

	const search = async () => {
		const accoutOperation = new AccountOperation();
		await accoutOperation
			.search(
				{
					criteria: searchCiterias,
					addition: searchAddition,
				} as SearchPayload,
				testToken
			)
			.then((response) => {
				console.log(response.data as UserInformation[]);
				setUserInforList(response.data as UserInformation[]);
			});
	};

	const loadMore = async () => {
		const accoutOperation = new AccountOperation();

		const pageNumber =
			Math.ceil(userInforList.length / searchAddition.size) + 1;

		await accoutOperation
			.search(
				{
					criteria: searchCiterias,
					addition: { ...searchAddition, page: pageNumber },
				} as SearchPayload,
				testToken
			)
			.then((response) => {
				setUserInforList((prev) => [...prev, ...response.data]);
			});
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
				searchAddition,
				setSearchAddition,
				isLoading,
				setIsLoading,
				search,
				loadMore,
			}}>
			{children}
		</UserContext.Provider>
	);
};

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
