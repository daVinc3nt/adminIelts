import RecordManagementProvider from "@/app/management/ielts/provider/RecordManagementProvider";

export default function PopupRecordManagement() {
	return (
		<RecordManagementProvider>
			<RecordManagement />
		</RecordManagementProvider>
	);
}

function RecordManagement() {
	return (
		<div className="fixed z-30 flex justify-center w-full h-full bg-black pt-14 bg-opacity-20 dark:bg-opacity-40">
			<div className="flex flex-col w-9/12 bg-white dark:bg-pot-black rounded-md overflow-hidden h-[90%]">
				<div className="w-full p-4 h-fit bg-foreground-blue dark:bg-foreground-red">
					<h1 className="text-3xl font-bold text-white dark:text-gray-200">
						Test 1 Record List
					</h1>
				</div>
			</div>
		</div>
	);
}
