import { FaHeadphones, FaBookOpen, FaPen } from "react-icons/fa6";
import { TestInfor } from "./interface";
import { RiSpeakFill } from "react-icons/ri";

interface TestItemProps {
	currentTest: number;
	setCurrentTest: (index: number) => void;
	testInfor: TestInfor[];
}

export default function TestList({
	currentTest,
	setCurrentTest,
	testInfor,
}: TestItemProps) {
	interface IconProps {
		testType: string;
	}
	function TestIcon({ testType }: IconProps) {
		switch (testType) {
			case "Reading Test":
				return (
					<FaBookOpen
						title="Reading test"
						size={30}
						color="#f87171"
					/>
				);
			case "Listening Test":
				return (
					<FaHeadphones
						title="Listening test"
						size={30}
						color="#f87171"
					/>
				);
			case "Speaking Test":
				return (
					<RiSpeakFill
						title="Speaking test"
						size={30}
						color="#f87171"
					/>
				);
			case "Writing Test":
				return <FaPen title="Writing test" size={30} color="#f87171" />;
		}
	}

	return (
		<div className="flex flex-col flex-1 items-center bg-white border rounded-lg shadow-md overflow-hidden">
			<div className="grid w-full grid-cols-10 gap-4 pl-3 mb-2 min-h-10">
				<div className="flex items-end justify-end w-full h-full col-span-1 text-base font-semibold">
					Type
				</div>
				<div className="flex items-end justify-center w-full h-full col-span-3 text-base font-semibold">
					Test Name
				</div>
				<div className="flex items-end justify-center w-full h-full col-span-2 text-base font-semibold">
					Author
				</div>
				<div className="flex items-end justify-center w-full h-full col-span-2 text-base font-semibold">
					Date created
				</div>
				<div className="flex items-end justify-center w-full h-full col-span-2 text-base font-semibold">
					Last modified
				</div>
			</div>

			<hr className="w-11/12 mb-2 border border-red-400" />

			<div className="flex flex-col flex-grow w-full overflow-auto">
				{testInfor.map((test, index) => (
					<div
						key={index}
						onClick={() => setCurrentTest(index)}
						className={`grid w-full grid-cols-10 gap-4 py-2 h-fit  ${currentTest == index ? "bg-red-200" : "hover:bg-red-100"}`}>
						<div className="flex items-center justify-end w-full h-full col-span-1">
							<TestIcon testType={test.testType} />
						</div>
						<div className="flex items-center justify-center w-full h-full col-span-3 text-base font-semibold">
							{test.testName}
						</div>
						<div className="flex items-center justify-center w-full h-full col-span-2 text-base font-semibold">
							{test.author}
						</div>
						<div className="flex items-center justify-center w-full h-full col-span-2 text-base font-semibold">
							{test.dateCreated}
						</div>
						<div className="flex items-center justify-center w-full h-full col-span-2 text-base font-semibold">
							{test.lastModified}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
