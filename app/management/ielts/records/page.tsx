import RecordManagementProvider from "../provider/RecordManagementProvider";

export default function Page() {
	return (
		<RecordManagementProvider>
			<RecordManagement />
		</RecordManagementProvider>
	);
}

function RecordManagement() {
	return (
		<div>
			<h1>Record Management</h1>
		</div>
	);
}
