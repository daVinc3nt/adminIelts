import {
	SearchCriteria,
	SearchPayload,
	UpdateAccountPayload,
} from "@/app/lib/interfaces";
import { AccountOperation } from "@/app/lib/main";
import { UserInformation } from "@/app/interface/user";
import {
	createContext,
	useState,
	ReactNode,
	useContext,
	useEffect, // Import useContext
} from "react";
import { useAuth } from "@/app/provider/AuthProvider";

interface UserContextType {
	userInforList: UserInformation[];
	currentUser: UserInformation;
	role: string;
	searchCriteria: SearchCriteria;
	currentPage: number;
	isOpenUserInfor: boolean;
	isOpenUpdateInfor: boolean;

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

	const [userInforList, setUserInforList] = useState<UserInformation[]>([]);
	const [currentUser, setCurrentUser] = useState<UserInformation>(null);
	const [role, setRole] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isOpenUserInfor, setIsOpenUserInfor] = useState<boolean>(false);
	const [isOpenUpdateInfor, setIsOpenUpdateInfor] = useState<boolean>(false);
	const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
		field: "firstName",
		operator: "~",
		value: "",
	});

	const search = () => {
		const accoutOperation = new AccountOperation();
		const newSearchCriteria: SearchCriteria[] = [];
		if (role !== "") {
			newSearchCriteria.push({
				field: "role",
				operator: "=",
				value: role,
			});
		}
		if (searchCriteria.value !== "") {
			newSearchCriteria.push(searchCriteria);
		}

		accoutOperation
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
				sid
			)
			.then((response) => {
				if (response.success) {
					console.log(response.data);
					setUserInforList(response.data as UserInformation[]);
				} else {
					alert(response.message);
				}
			});
	};

	useEffect(() => {
		search();
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
				console.log(res);
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
					alert("Update account successfully");
				} else {
					alert(res.message);
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
				currentPage,
				isOpenUserInfor,
				isOpenUpdateInfor,

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
