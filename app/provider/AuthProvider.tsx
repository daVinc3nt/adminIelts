"use client";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import {
	deleteSid,
	getIsLogin,
	getSid,
	setLogin,
} from "../interface/cookies/cookies";
import { UserInformation } from "../interface/user/user";
import { AccountOperation, AppOperation } from "../lib/main";
import { useRouter } from "next/navigation";
import {
	getRoleFromRoleInfor,
	initPrivilegeConfig,
	isAdmin,
	PrivilegeConfig,
} from "../interface/privilegeconfig/privilegeconfig";

const initUserInfor = {
	id: "",
	username: "",
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: "",
	roles: [],
};

interface AuthContextType {
	isLogin: boolean;
	userInformation: UserInformation;
	isLoading: boolean;
	privilage: PrivilegeConfig;
	logOut: () => void;
	setIsLogin: (isLogin: boolean) => void;
	setUserInformation: (userInfor: UserInformation) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [userInformation, setUserInformation] =
		useState<UserInformation>(initUserInfor);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [privilage, setPrivilage] =
		useState<PrivilegeConfig>(initPrivilegeConfig);

	const router = useRouter();

	useLayoutEffect(() => {
		setIsLogin(getIsLogin());
	}, []);

	useEffect(() => {
		const appOperation = new AppOperation();
		appOperation.getPrivilegeConfig().then((res) => {
			if (res.success && res.data) {
				setPrivilage(res.data);
			} else {
				console.error(res.message);
			}
		});
	}, []);

	useEffect(() => {
		const sid = getSid();
		if (sid) {
			const account = new AccountOperation();
			account.getAuthenticatedInfo(sid).then((res) => {
				if (res.success && res.data) {
					if (!isAdmin(getRoleFromRoleInfor(res.data.roles))) {
						alert("You are not allowed to access this page");
						router.push("/login");
					} else {
						setUserInformation(res.data);
						setIsLogin(true);
						setLogin(true);
					}
				} else {
					setIsLogin(false);
					setLogin(false);
				}
				setIsLoading(false);
			});
		} else {
			setIsLogin(false);
			setLogin(false);
			setIsLoading(false);
		}
	}, []);

	const logOut = () => {
		router.push("/login");
		setLogin(false);
		setIsLogin(false);
		setUserInformation(initUserInfor);
		deleteSid();
	};

	return (
		<AuthContext.Provider
			value={{
				isLogin,
				userInformation,
				isLoading,
				privilage,
				logOut,
				setIsLogin,
				setUserInformation,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
