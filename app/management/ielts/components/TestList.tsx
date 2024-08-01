import { useTestManagement } from "../provider/TestManagementProvider";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { Test } from "@/app/interface/test/test";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";

export default function TestList() {
	return (
		<div className="flex flex-col items-center w-full px-4 py-2 duration-200 bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[430px] dark:bg-pot-black">
			<div className="flex flex-row items-center w-full gap-2 py-2 font-medium text-gray-400 h-fit">
				<div className="w-[3%]"></div>
				<div className="w-[25%]">Name</div>
				<div className="w-[47%]">ID</div>
				<div className="w-[10%] text-center">Date Create</div>
				<div className="w-[10%] text-center">Last update</div>
				<div className="w-[5%]"></div>
			</div>
			<hr className="w-full my-1 border border-gray-200 dark:border-gray-400" />
			<FullTestList />
		</div>
	);
}

function FullTestList() {
	const { testList } = useTestManagement();
	if (!testList) return null;

	return (
		<>
			{testList.map((test, index) => {
				return (
					<div
						key={test.id + index}
						className="flex flex-row items-center w-full gap-2 py-2 text-sm text-gray-600 duration-200 bg-white rounded-md cursor-default dark:text-gray-200 h-fit dark:bg-pot-black dark:hover:bg-black-night group hover:shadow-md hover:z-10">
						<div className="w-[3%]"></div>
						<div className="w-[25%]">
							<span className="text-base font-semibold">
								{test.name}
							</span>
						</div>
						<div className="w-[47%]">
							<span className="text-base font-semibold">
								{test.id}
							</span>
						</div>
						<div className="w-[10%] text-center">
							<span className="text-base font-semibold">
								{new Date(test.createdAt).toLocaleDateString()}
							</span>
						</div>
						<div className="w-[10%] text-center">
							<span className="text-base font-semibold">
								{new Date(test.updatedAt).toLocaleDateString()}
							</span>
						</div>
						<div className="w-[5%]">
							<OptionButton id={test.id} test={test} />
						</div>
					</div>
				);
			})}
		</>
	);
}

interface OptionButtonProps {
	id: string;
	test: Test;
}

function OptionButton({ id, test }: OptionButtonProps) {
	const { deleteTest } = useTestManagement();
	const inforRef = useClickOutsideDetails();

	const onDelete = () => {
		deleteTest(id);
	};

	return (
		<details
			ref={inforRef}
			className="relative z-20 h-full duration-200 cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="p-1 duration-200 opacity-0 cursor-pointer text-pot-black dark:text-gray-200 group-hover:opacity-100">
					<BsThreeDotsVertical className="size-5" />
				</div>
			</summary>
			<div className="absolute top-0 flex flex-col gap-1 p-2 bg-white rounded-md shadow-lg w-[130px] h-fit dark:bg-gray-22 left-8">
				{/* <div
					onClick={() => onSelectTest(test)}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						Preview test
					</span>
					<VscOpenPreview className="text-black size-[18px] dark:text-gray-200" />
				</div> */}
				<Link
					href={`/management/ielts/fulltest/${id}`}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						Edit test
					</span>
					<FiEdit className="text-black size-4 dark:text-gray-200" />
				</Link>
				<Link
					href={`/management/ielts/records/${id}`}
					className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-black dark:text-gray-200">
						View record
					</span>
					<MdHistory
						stroke="1px"
						className="text-black size-5 dark:text-gray-200"
					/>
				</Link>
				<div className="flex flex-row items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					<span className="text-xs text-red-500">Delete</span>
					<FaRegTrashCan className="text-red-500 size-4" />
				</div>
			</div>
		</details>
	);
}
