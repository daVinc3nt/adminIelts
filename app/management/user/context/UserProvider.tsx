import { SearchAddition, SearchCriteria } from "@/app/interface/interfaces";
import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useContext, // Import useContext
} from "react";

interface UserContextType {
	searchCiterias: SearchCriteria[];
	setSearchCiterias: Dispatch<SetStateAction<SearchCriteria[]>>;
	searchAddition: SearchAddition;
	setSearchAddition: Dispatch<SetStateAction<SearchAddition>>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserData = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserData must be used within a UserProvider");
	}
	return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchCiterias, setSearchCiterias] = useState<SearchCriteria[]>([]);
	const [searchAddition, setSearchAddition] = useState<SearchAddition>({
		sort: [["firstName", "ASC"]],
		page: 1,
		size: 10,
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<UserContext.Provider
			value={{
				searchCiterias,
				setSearchCiterias,
				searchAddition,
				setSearchAddition,
				isLoading,
				setIsLoading,
			}}>
			{children}
		</UserContext.Provider>
	);
};
