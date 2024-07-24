import { FaUserPlus } from "react-icons/fa";

export default function AddUserButton() {
	return (
		<button className="flex flex-row items-center justify-center h-full gap-2 px-4 ml-10 font-bold text-white duration-200 rounded-md dark:text-gray-200 w-fit borde-0 whitespace-nowrap bg-foreground-blue dark:bg-foreground-red">
			Add User
			<FaUserPlus size={25} />
		</button>
	);
}
