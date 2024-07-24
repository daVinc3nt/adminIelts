import { createContext, ReactNode, useContext } from "react";

interface RecordContextType {}

const RecordContext = createContext<RecordContextType | null>(null);

const useRecordManagement = () => {
	const context = useContext(RecordContext);
	if (!context) {
		throw new Error(
			"useRecordManagement must be used within a RecordManagementProvider"
		);
	}
	return context;
};

export default function RecordManagementProvider({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<RecordContext.Provider value={null}>{children}</RecordContext.Provider>
	);
}
