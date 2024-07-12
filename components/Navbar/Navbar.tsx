import { IoMenu } from "react-icons/io5";
import { CiLight, CiDark } from "react-icons/ci";
import Notification from "./Notification";
import Mail from "./Mail";
import ThemeSwich from "./ThemeSwitch";
import UserInfor from "./UserInfor";

interface Props {
	isOpenSidebar: boolean;
	setIsOpenSidebar: (isOpenSidebar: boolean) => void;
}

export default function Navbar({ isOpenSidebar, setIsOpenSidebar }: Props) {
	return (
		<nav
			style={{ paddingLeft: isOpenSidebar ? "248px" : "8px" }}
			className="fixed z-40 flex items-center justify-start w-full h-16 gap-4 p-2 duration-200 bg-white shadow-sm dark:bg-pot-black">
			<button
				onClick={() => setIsOpenSidebar(!isOpenSidebar)}
				className="p-1 rounded-full text-pot-black dark:text-gray-200 hover:bg-background-gray dark:hover:bg-zinc-700">
				<IoMenu size={25} />
			</button>
			<div className="border boder-black h-4/6" />
			<span className="pb-1 text-3xl font-semibold cursor-pointer text-pot-black dark:text-white">
				Engonow
			</span>

			<div className="mr-auto" />

			<Notification />

			<Mail />

			<div className="border boder-black h-4/6" />

			<ThemeSwich />

			<div className="border boder-black h-4/6" />

			<UserInfor />
		</nav>
	);
}
