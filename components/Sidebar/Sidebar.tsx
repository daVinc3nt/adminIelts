import { RiFilePaper2Fill } from "react-icons/ri";
import { PiCardsFill } from "react-icons/pi";
import { FaTag, FaUser } from "react-icons/fa";
import { Link } from "@nextui-org/react";
import { FaPenFancy } from "react-icons/fa";
import { useUtility } from "@/app/provider/UtilityProvider";

const iconSize = 20;

const path = [
	{
		name: "IELTS Management",
		icon: <RiFilePaper2Fill size={iconSize} className="inline-block" />,
		link: "/management/ielts",
	},
	{
		name: "Writing Grading",
		icon: <FaPenFancy size={iconSize} className="inline-block" />,
		link: "/management/ielts/writing",
	},
	{
		name: "Flashcard Management",
		icon: <PiCardsFill size={iconSize} className="inline-block" />,
		link: "/management/flashcard",
	},
	{
		name: "Tag Management",
		icon: <FaTag size={iconSize} className="inline-block" />,
		link: "/management/tags",
	},
	{
		name: "User Management",
		icon: <FaUser size={iconSize} className="inline-block" />,
		link: "/management/users",
	},
];

export default function SideBar() {
	const { isOpenSidebar } = useUtility();

	return (
		<div
			style={{ left: isOpenSidebar ? "0px" : "-240px" }}
			className="w-[240px] h-screen bg-white dark:bg-pot-black fixed  z-[1101] p-2 flex flex-col gap-4 shadow-md">
			<img
				src={"/images/Logo_name.png"}
				className="w-full px-3  bg-white rounded-md dark:bg-pot-black h-fit mb-4"
			/>
			{
				<div className="flex flex-col w-full gap-1 h-fit px-1">
					{path.map((item, index) => {
						return (
							<div
								key={index}
								className="flex flex-col w-full gap-1 text-sm text-gray-600 dark:text-gray-200 h-fit">
								<Link
									href={item.link}
									className="flex items-center gap-2 p-3 duration-100 rounded-md cursor-pointer hover:bg-mecury-gray dark:hover:bg-gray-22">
									{item.icon}
									{item.name}
								</Link>
							</div>
						);
					})}
				</div>
			}
		</div>
	);
}
