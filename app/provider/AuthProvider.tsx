"use client";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { getIsLogin, getSid } from "../interface/cookies/cookies";
import { UserInformation } from "../interface/user/user";

interface AuthContextType {
	sid: string;
	setSid: Dispatch<SetStateAction<string>>;
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
	const [sid, setSid] = useState<string>(getSid() || "");
	const [isLogin, setIsLogin] = useState<boolean>(getIsLogin() == "true");
	const [userInformation, setUserInformation] =
		useState<UserInformation>(null);

	useLayoutEffect(() => {
		console.log(isLogin);

		setIsLogin(localStorage.getItem("isLogin") ? true : false);
		const sid = getSid();
		const useInfor = JSON.parse(
			localStorage.getItem("userinfo")
		) as UserInformation;
		if (sid && useInfor) {
		} else {
			setIsLogin(false);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				sid,
				setSid,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
