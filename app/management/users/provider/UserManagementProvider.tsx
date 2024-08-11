import {
	SearchCriteria,
	SearchPayload,
	UpdateAccountPayload,
} from "@/app/lib/interfaces";
import { AccountOperation, UploadOperation } from "@/app/lib/main";
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
import { getSid } from "@/app/interface/cookies/cookies";

const numberOfUserPerPage = 6;
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
	avartarFilePaths: string[];

	onChangeCurrentUser: (user: UserInformation) => void;
	search: () => void;
	onChangeRole: (value: string) => void;
	onChangeSearchCriteria: (newSearchCriteria: SearchCriteria) => void;
	handleChangePage: (_: any, value: number) => void;
	onChangeIsOpenUserInfor: (value: boolean) => void;
	onChangeIsOpenUpdateInfor: (value: boolean) => void;
	updateUserInformation: (newInfor: UpdateAccountPayload) => void;
	refresh: () => void;
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
	const [avartarFilePaths, setAvartarFilePaths] = useState<string[]>(
		new Array(numberOfUserPerPage).fill("/images/user.png")
	);

	const refresh = () => {
		setIsLoading(true);
		setTimeout(() => {
			changePage();
			setIsLoading(false);
		}, 100);
	};

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

		accoutOperation.search(searchPayload, getSid()).then((res) => {
			if (res.success) {
				setUserInforList(res.data as UserInformation[]);
				if (searchPayload.criteria.length === 0) {
					accoutOperation.count(getSid()).then((res) => {
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
					if (res.data.length == numberOfUserPerPage) {
						setNumberOfPage(2);
					} else {
						setNumberOfPage(1);
					}
				}
				res.data.forEach((user, index) => {
					if (user.avatar) {
						getAvatar(user, index);
					} else {
						const newAvartarFilePaths = [...avartarFilePaths];
						newAvartarFilePaths[index] = "/images/user.png";
						setAvartarFilePaths(newAvartarFilePaths);
					}
				});
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

		accoutOperation.search(searchPayload, getSid()).then((res) => {
			if (res.success) {
				setUserInforList(res.data as UserInformation[]);
				if (searchPayload.criteria.length != 0) {
					if (
						res.data.length == numberOfUserPerPage &&
						currentPage == numberOfPage
					) {
						setNumberOfPage(numberOfPage + 1);
					}
				}
				res.data.forEach((user, index) => {
					if (user.avatar) {
						getAvatar(user, index);
					} else {
						const newAvartarFilePaths = [...avartarFilePaths];
						newAvartarFilePaths[index] = "/images/user.png";
						setAvartarFilePaths(newAvartarFilePaths);
					}
				});
			} else {
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	const getAvatar = (user: UserInformation, index: number) => {
		const newUploadOperation = new UploadOperation();
		newUploadOperation.search(user.avatar as any, getSid()).then((res) => {
			if (res.success) {
				const newAvartarFilePaths = [...avartarFilePaths];
				newAvartarFilePaths[index] = res.data;
				setAvartarFilePaths(newAvartarFilePaths);
			} else {
				const newAvartarFilePaths = [...avartarFilePaths];
				newAvartarFilePaths[index] = "/images/user.png";
				setAvartarFilePaths(newAvartarFilePaths);
				setError(res.message);
				console.error(res.message);
			}
		});
	};

	useEffect(() => {
		search();
	}, [role]);

	useEffect(() => {
		if (!isLoading) {
			changePage();
		}
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
			.update(currentUser.id as any, newInfor, getSid())
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
				avartarFilePaths,

				onChangeCurrentUser,
				search,
				onChangeRole,
				onChangeSearchCriteria,
				handleChangePage,
				onChangeIsOpenUserInfor,
				onChangeIsOpenUpdateInfor,
				updateUserInformation,
				refresh,
			}}>
			{children}
		</UserContext.Provider>
	);
};
