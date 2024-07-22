import { createContext, ReactNode, useContext } from "react";

interface AuthContextType {}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
