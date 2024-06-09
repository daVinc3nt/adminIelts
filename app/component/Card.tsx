import Link from "next/link";
import { motion } from "framer-motion";
import { RiSpeakFill } from "react-icons/ri";
import { FaHeadphones, FaBookOpen, FaPen, FaPlus } from "react-icons/fa6";

interface CardProps {
	numberOfTest: number;
	testType: string;
	path: string;
}
export default function Card({ numberOfTest, testType, path }: CardProps) {
	const TestIcon = () => {
		switch (testType) {
			case "Reading Test":
				return (
					<FaBookOpen
						title="Reading test"
						size={50}
						color="#f87171"
					/>
				);
			case "Listening Test":
				return (
					<FaHeadphones
						title="Listening test"
						size={50}
						color="#f87171"
					/>
				);
			case "Speaking Test":
				return (
					<RiSpeakFill
						title="Speaking test"
						size={50}
						color="#f87171"
					/>
				);
			case "Writing Test":
				return <FaPen title="Writing test" size={50} color="#f87171" />;
		}
	};

	return (
		<motion.div
			whileHover={{ y: -5 }}
			className="flex flex-row w-full h-full col-span-3 overflow-hidden bg-red-400 border rounded-lg shadow-lg">
			<div className="flex items-center justify-center h-full p-2 w-full">
				<div className="p-2 bg-white rounded-2xl">
					<TestIcon />
				</div>
			</div>
			<div className="flex flex-col items-start justify-center w-full h-full px-4">
				<span className="text-base font-bold text-white">
					{testType.split(" ")[0]}
				</span>
				<span className="text-5xl font-bold text-white">
					{numberOfTest}
				</span>
			</div>
			<Link
				href={path}
				className="flex flex-col items-center justify-center h-full px-3 py-6 cursor-pointer w-full group">
				<FaPlus size={40} color="white" />
				<span className="font-semibold text-transparent group-hover:text-white">
					Add Test
				</span>
			</Link>
		</motion.div>
	);
}
