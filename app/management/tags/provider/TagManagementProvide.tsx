"use client";
import { createContext, ReactNode, useContext } from "react";

interface TagContextType {}

const TagContext = createContext<TagContextType | null>(null);

const useTagManagement = () => {
	const context = useContext(TagContext);
	if (!context) {
		throw new Error("useTagManagement must be used within a TagProvider");
	}
	return context;
};

export default function TagManagementProvider({
	children,
}: {
	children: ReactNode;
}) {
	return <TagContext.Provider value={{}}>{children}</TagContext.Provider>;
}
