import {
	SearchCriteria,
	SearchPayload,
	UpdateAccountPayload,
} from "@/app/lib/interfaces";
import { AccountOperation } from "@/app/lib/main";
import { UserInformation } from "@/app/interface/user/user";
import {
	createContext,
	useState,
	ReactNode,
	useContext,
	useEffect, // Import useContext
} from "react";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";


const numberOfUserPerPage = 1;
const initSearchCriteria: SearchCriteria = {
	field: "firstName",
	operator: "~",
	value: "",
};

interface UserContextType {
	userInforList: UserInformation[];
	currentUser: UserInformation;
	role: string;
	searchCriteria: SearchCriteria;
	isOpenUserInfor: boolean;
	isOpenUpdateInfor: boolean;
	isLoading: boolean;
	currentPage: number;
	numberOfUser: number;
	numberOfPage: number;

	onChangeCurrentUser: (user: UserInformation) => void;
	search: () => void;
	onChangeRole: (value: string) => void;
	onChangeSearchCriteria: (newSearchCriteria: SearchCriteria) => void;
	handleChangePage: (_: any, value: number) => void;
	onChangeIsOpenUserInfor: (value: boolean) => void;
	onChangeIsOpenUpdateInfor: (value: boolean) => void;
	updateUserInformation: (newInfor: UpdateAccountPayload) => void;
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
	const { sid } = useAuth();
	const { setError, setSuccess } = useUtility();

	const [userInforList, setUserInforList] = useState<UserInformation[]>([]);
	const [currentUser, setCurrentUser] = useState<UserInformation>(null);
	const [role, setRole] = useState<string>("");
	const [isOpenUserInfor, setIsOpenUserInfor] = useState<boolean>(false);
	const [isOpenUpdateInfor, setIsOpenUpdateInfor] = useState<boolean>(false);
	const [searchCriteria, setSearchCriteria] =
		useState<SearchCriteria>(initSearchCriteria);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [numberOfPage, setNumberOfPage] = useState<number>(10);
	const [numberOfUser, setNumberOfUser] = useState<number>(0);

	const search = () => {
		const accoutOperation = new AccountOperation();

		const searchPayload: SearchPayload = {
			criteria: [],
			addition: {
				sort: [],
				page: currentPage,
				size: numberOfUserPerPage,
				group: null,
			},
		};

		if (role !== "") {
			searchPayload.criteria.push({
				field: "role",
				operator: "=",
				value: role,
			});
		}
		if (searchCriteria.value !== "") {
			searchPayload.criteria.push(searchCriteria);
		}

		accoutOperation.search(searchPayload, sid).then((res) => {
			if (res.success) {
				setUserInforList(res.data as UserInformation[]);
				if (searchPayload.criteria.length === 0) {
					accoutOperation.count(sid).then((res) => {
						if (res.success) {
							setNumberOfUser(res.data);
							setNumberOfPage(
								Math.ceil(res.data / numberOfUserPerPage)
							);
						} else {
							setError(res.message);
							console.error(res.message);
						}
					});
				} else {
					if (res.data.length != 0) {
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
		const accoutOperation = new AccountOperation();

		const searchPayload: SearchPayload = {
			criteria: [],
			addition: {
				sort: [],
				page: currentPage,
				size: numberOfUserPerPage,
				group: null,
			},
		};

		if (role !== "") {
			searchPayload.criteria.push({
				field: "role",
				operator: "=",
				value: role,
			});
		}

		if (searchCriteria.value !== "") {
			searchPayload.criteria.push(searchCriteria);
		}

		accoutOperation.search(searchPayload, sid).then((res) => {
			if (res.success) {
				setUserInforList(res.data as UserInformation[]);
				if(res.data.length > 0 && currentPage == numberOfPage) {
					setNumberOfPage(numberOfPage + 1);
				}
			} else {
				setError(res.message);
				console.error(res.message);
			}
			setIsLoading(false);
		});
	};

	useEffect(() => {
		search();
	}, []);

	useEffect(() => {
		changePage();
	}, [currentPage]);

	const handleChangePage = (_: any, value: number) => {
		setCurrentPage(value);
	};

	const onChangeCurrentUser = (user: UserInformation) => {
		setCurrentUser(user);
	};

	const onChangeRole = (value: string) => {
		setRole(value);
	};

	const onChangeSearchCriteria = (newSearchCriteria: SearchCriteria) => {
		setSearchCriteria(newSearchCriteria);
	};

	const onChangeIsOpenUserInfor = (value: boolean) => {
		setIsOpenUserInfor(value);
	};

	const onChangeIsOpenUpdateInfor = (value: boolean) => {
		setIsOpenUpdateInfor(value);
	};

	const updateUserInformation = (newInfor: UpdateAccountPayload) => {
		const newAccountOperation = new AccountOperation();
		newAccountOperation
			.update(currentUser.id as any, newInfor, sid)
			.then((res) => {
				if (res.success) {
					const userId = res.data.id;
					setUserInforList(
						userInforList.map((user) => {
							if (user.id === userId) {
								return res.data;
							}
							return user;
						})
					);
					onChangeCurrentUser(res.data);
					setSuccess("Update account successfully");
				} else {
					setError(res.message);
					console.error(res.message);
				}
			});
	};

	return (
		<UserContext.Provider
			value={{
				userInforList,
				currentUser,
				role,
				searchCriteria,
				isOpenUserInfor,
				isOpenUpdateInfor,
				isLoading,
				currentPage,
				numberOfUser,
				numberOfPage,

				onChangeCurrentUser,
				search,
				onChangeRole,
				onChangeSearchCriteria,
				handleChangePage,
				onChangeIsOpenUserInfor,
				onChangeIsOpenUpdateInfor,
				updateUserInformation,
			}}>
			{children}
		</UserContext.Provider>
	);
};
