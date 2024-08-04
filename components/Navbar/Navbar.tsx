import { IoMenu } from "react-icons/io5";
import ThemeSwich from "./ThemeSwitch";
import UserInfor from "./UserInfor";
import { useUtility } from "@/app/provider/UtilityProvider";

export default function Navbar() {
	const { isOpenSidebar, toggleSidebar } = useUtility();

	return (
		<nav
			style={{ paddingLeft: isOpenSidebar ? "248px" : "8px" }}
			className="fixed z-[1100] flex items-center justify-start w-full h-16 gap-4 p-2  bg-white shadow-sm dark:bg-pot-black ">
			<button
				onClick={() => toggleSidebar()}
				className="p-1 rounded-full text-pot-black dark:text-gray-200 hover:bg-background-gray dark:hover:bg-zinc-700">
				<IoMenu size={25} />
			</button>
			<div className="border boder-black h-4/6" />
			<span className="pb-1 text-3xl cursor-pointer text-pot-black dark:text-white">
				<img src="/images/LOGO.png" alt="logo" className="h-14" />
			</span>

			<div className="mr-auto" />

			<ThemeSwich />

			<div className="border boder-black h-4/6" />

			<UserInfor />
		</nav>
	);
}
