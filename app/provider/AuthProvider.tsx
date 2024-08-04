"use client";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { getSid } from "../interface/cookies/cookies";

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
