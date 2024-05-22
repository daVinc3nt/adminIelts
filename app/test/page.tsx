export default function Test() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center">
			<div className="w-full min-h-96 h-fit flex justify-center">
				<div className="w-10/12 flex flex-row items-start justify-end gap-4 p-8 max-lg:w-full max-md:flex-col">
					<div className="w-full min-h-72 h-fit bg-red-500">
						<div className="text-3xl font-bold max-lg:text-2xl">
							Thư viện đề thi
						</div>

						<div className="text-base p-8"></div>
					</div>
					<div className="w-96 min-h-60 h-fit bg-white rounded-lg shadow-md shadow-gray-200"></div>
				</div>
			</div>

			<div className="w-full bg-white min-h-96 h-fit"></div>
		</div>
	);
}

interface linkInterface {
	label: string;
	path: string;
}

const courseList: linkInterface[] = [
	{
		label: "Tất cả",
		path: "",
	},
	{
		label: "IELTS Academic",
		path: "",
	},
	{
		label: "IELTS General",
		path: "",
	},
	{
		label: "Tiếng anh THPTQG",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
	{
		label: "Template",
		path: "",
	},
];
