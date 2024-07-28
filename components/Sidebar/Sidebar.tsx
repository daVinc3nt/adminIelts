import { RiFilePaper2Fill } from "react-icons/ri";

import { FaTag, FaUser } from "react-icons/fa";
import { Link } from "@nextui-org/react";
interface Props {
	isOpenSidebar: boolean;
	setIsOpenSidebar: (isOpenSidebar: boolean) => void;
}

export default function SideBar({ isOpenSidebar, setIsOpenSidebar }: Props) {
	return (
		<div
			style={{ left: isOpenSidebar ? "0px" : "-240px" }}
			className="w-[240px] h-screen bg-white dark:bg-pot-black fixed duration-200 z-[1101] p-2 flex flex-col gap-4 shadow-md">
			<img
				src={"/images/Logo_name.png"}
				className="w-full px-3 duration-200 bg-white rounded-md dark:bg-pot-black h-fit"
			/>
			<div className="flex flex-col w-full gap-2 h-fit">
				<span className="font-bold text-pot-black dark:text-gray-200">
					TEST MANAGEMENT
				</span>
				<div className="flex flex-col w-full gap-1 text-sm text-gray-600 dark:text-gray-400 h-fit">
					<Link
						href="/management/ielts"
						className="flex items-center gap-2 p-2 duration-100 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400 dark:hover:text-pot-black">
						<RiFilePaper2Fill size={30} className="inline-block" />
						IELTS
					</Link>

					{/* <span className="flex items-center gap-2 p-2 duration-100 rounded-md cursor-pointer">
						<FaBook size={30} className="inline-block" />
						Đánh giá năng lực
					</span>

					<span className="flex items-center gap-2 p-2 duration-100 rounded-md cursor-pointer">
						<BsClipboard2PlusFill
							size={30}
							className="inline-block"
						/>
						Custom Test
					</span> */}
				</div>
			</div>
			<div className="flex flex-col w-full gap-2 h-fit">
				<span className="font-bold text-pot-black dark:text-gray-200">
					Tag Management
				</span>
				<div className="flex flex-col w-full gap-1 text-sm text-gray-600 dark:text-gray-400 h-fit">
					<Link
						href="/management/tags"
						className="flex items-center gap-2 p-2 duration-100 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400 dark:hover:text-pot-black">
						<FaTag size={30} className="inline-block" />
						Tag
					</Link>
				</div>
			</div>
			<div className="flex flex-col w-full gap-2 h-fit">
				<span className="font-bold text-pot-black dark:text-gray-200">
					USER MANAGEMENT
				</span>
				<div className="flex flex-col w-full gap-1 text-sm text-gray-600 dark:text-gray-400 h-fit">
					<Link
						href="/management/users"
						className="flex items-center gap-2 p-2 duration-100 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400 dark:hover:text-pot-black">
						<FaUser size={30} className="inline-block" />
						User Management
					</Link>
				</div>
			</div>
		</div>
	);
}
