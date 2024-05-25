import NavBar from "@/components/Navbar/Navbar";

export default function Test() {
	return (
		<>
			<div className="flex min-h-screen w-full flex-col items-center justify-center pt-14">
				<div className="w-full min-h-96 h-fit flex justify-center">
					<div className="w-10/12 flex flex-row items-start justify-end gap-6 p-8 max-lg:w-full max-md:flex-col">
						<div className="w-full min-h-[292px] h-fit flex flex-col justify-between items-start">
							<div className="w-full min-h-60 h-fit flex flex-col items-start justify-between">
								<div className="text-3xl font-bold max-lg:text-2xl">
									Thư viện đề thi
								</div>

								<div className=""></div>

								<input
									type="search"
									className="w-full h-10 border-2 rounded-md p-2 outline-none focus:border-transparent focus:ring-[4px] focus:ring-[#bdc5d1] duration-200"
									placeholder="Nhập từ khóa bạn muốn tìm kiếm: tên sách, dạng câu hỏi ..."
								/>
							</div>

							<button className="p-2 bg-blue-800 rounded-md text-white font-semibold hover:bg-blue-900">
								Tìm kiếm
							</button>
						</div>
						<div className="w-96 min-h-60 h-fit bg-white rounded-lg shadow-md shadow-gray-200"></div>
					</div>
				</div>

				<div className="w-full bg-white min-h-96 h-fit"></div>
			</div>
		</>
	);
}

interface pageInterface {
	label: string;
	path: string;
}

const courseList: pageInterface[] = [
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
