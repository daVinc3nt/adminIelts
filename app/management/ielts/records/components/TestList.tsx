import { useTestManagement } from "../../provider/TestManagementProvider";
import { useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";

export default function TestList() {
	return (
		<div className="flex flex-col items-center w-full px-4 py-2 duration-200 bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black h-[434px] dark:bg-pot-black">
			<div className="flex flex-row items-center w-full gap-2 py-2 font-medium text-gray-400 h-fit">
				<div className="w-[30%] px-2">Name</div>
				<div className="w-[35%]">ID</div>
				<div className="w-[10%]">Date Create</div>
				<div className="w-[10%]">Last update</div>
				<div className="w-[15%]"></div>
			</div>
			<hr className="w-full my-1 border border-gray-200 dark:border-gray-400" />
			<FullTestList />
		</div>
	);
}

function FullTestList() {
	const { testList, setCurrentTest } = useTestManagement();
	if (!testList) return null;

	return (
		<>
			{testList.map((test) => {
				return (
					<div
						key={test.id}
						className="flex flex-row items-center w-full gap-2 py-2 text-sm text-gray-600 duration-200 bg-white rounded-md cursor-default dark:text-gray-200 h-fit dark:bg-pot-black dark:hover:bg-black-night group hover:shadow-md hover:z-10">
						<div className="w-[30%] flex flex-col px-2">
							<span className="text-base font-semibold">
								{test.name}
							</span>
						</div>
						<div className="w-[35%] flex flex-col">
							<span className="text-base font-semibold">
								{test.id}
							</span>
						</div>
						<div className="w-[10%] flex flex-col">
							<span className="text-base font-semibold">
								{new Date(test.createdAt).toLocaleDateString()}
							</span>
						</div>
						<div className="w-[10%] flex flex-col">
							<span className="text-base font-semibold">
								{new Date(test.updatedAt).toLocaleDateString()}
							</span>
						</div>
						<div className="w-[15%] flex items-center justify-center">
							<div
								onClick={() => setCurrentTest(test)}
								className="p-1 duration-200 opacity-0 cursor-pointer text-pot-black dark:text-gray-200 group-hover:opacity-100">
								View record
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}

interface OptionButtonProps {
	id: string;
}

function OptionButton({ id }: OptionButtonProps) {
	const { deleteTestOrQuiz } = useTestManagement();

	const inforRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inforRef.current &&
				!inforRef.current.contains(event.target as Node)
			) {
				inforRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<details
			ref={inforRef}
			className="relative z-20 h-full duration-200 cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="p-1 duration-200 opacity-0 cursor-pointer text-pot-black dark:text-gray-200 group-hover:opacity-100">
					<BsThreeDotsVertical className="size-5" />
				</div>
			</summary>
			<div className="absolute top-0 flex flex-col w-24 gap-1 p-2 bg-white rounded-md shadow-lg h-fit dark:bg-gray-22 left-9">
				<Link
					href={`/management/ielts/fulltest/${id}`}
					className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					Edit
				</Link>
				<div
					onClick={() => deleteTestOrQuiz(id)}
					className="p-2 text-red-500 rounded-md hover:bg-gray-100 dark:hover:bg-pot-black">
					Delete
				</div>
			</div>
		</details>
	);
}

function QuizList() {}

const testToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIwOTgxMTE1LCJleHAiOjE3NTI1MTcxMTV9.VHdXs5y2Vey-YjmqLN7Uxn1kF1dC-TXZF0ro9_u5mJQ";
