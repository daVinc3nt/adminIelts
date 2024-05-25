"use client";
import { useState } from "react";
import MenuIcon from "../Icon/MenuIcon";
import DropDown from "./DropDown";
import Link from "next/link";

export default function NavBar() {
	const [dropDown, setDropDown] = useState<boolean>(false);

	return (
		<div
			className={`${dropDown ? "max-lg:h-[416px]" : "h-14"} duration-300 w-full h-14 flex 
			justify-center items-center flex-row bg-white shadow-sm shadow-gray-300
			py-2 px-4 gap-2 max-lg:flex-col max-lg:justify-start max-lg:items-start 
			max-lg:overflow-hidden`}>
			<div className="flex flex-row items-center justify-center max-lg:w-full mr-auto">
				<Link
					href="/"
					className="text-4xl font-extrabold cursor-pointer mr-auto">
					Engonow
				</Link>
				<div
					className="lg:hidden"
					onClick={() => setDropDown((prev) => !prev)}>
					<MenuIcon height={8} width={8} color="black" />
				</div>
			</div>
			<DropDown />
		</div>
	);
}

interface pageinterface {
	label: string;
	path: string;
}

const pageList: pageinterface[] = [
	{
		label: "Khóa học của tôi",
		path: "",
	},
	{
		label: "Khóa học online",
		path: "",
	},
	{
		label: "Đề thi online",
		path: "/test",
	},
	{
		label: "Flashcards",
		path: "",
	},
	{
		label: "Blog",
		path: "",
	},
	{
		label: "Kích hoạt khóa học",
		path: "",
	},
];

const mobilePageList: pageinterface[] = [
	{
		label: "Thông báo",
		path: "",
	},
	{
		label: "Lịch học của tôi",
		path: "",
	},
	{
		label: "Trang cá nhân",
		path: "",
	},
];
