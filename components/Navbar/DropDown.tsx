"use client";
import { useState } from "react";
import UserIcon from "../Icon/UserIcon";
import DropdownIcon from "../Icon/DropdownIcon";
import Link from "next/link";
import LogoutIcon from "../Icon/LogoutIcon";

export default function DropDown() {
	const [dropDown, setDropDown] = useState<boolean>(false);

	return (
		<button
			className="w-fit h-fit flex flex-row gap-1 items-center cursor-pointer max-lg:hidden"
			onClick={() => setDropDown(!dropDown)}>
			<UserIcon height={12} width={12} color="black" />
			<DropdownIcon height={4} width={4} color="black" />
			{
				<div
					className={`${dropDown ? "h-[272px] border py-4" : "h-0"} w-72 px-4 duration-100 bg-white absolute top-[52px] right-2 rounded-xl shadow-md shadow-gray-400 flex flex-col gap-4 overflow-hidden`}>
					<div className="w-full h-fit flex flex-col justify-start items-start gap-2 text-sm">
						<div className="text-gray-500 font-semibold">
							Thông báo
						</div>
						<div className="text-black">
							Bạn chưa có thông báo mới
						</div>

						<Link href="" className="text-blue-800 mt-2">
							{"Xem tất cả >>"}
						</Link>
					</div>

					<hr className="solid bg-gray-200 border-gray-200 border rounded-full"></hr>

					<div className="w-full h-fit flex flex-col justify-start items-start text-base">
						<Link
							href=""
							className="w-full hover:bg-gray-100 p-2 flex items-center justify-start">
							Lịch học của tôi
						</Link>
						<Link
							href=""
							className="w-full hover:bg-gray-100 p-2 flex items-center justify-start">
							Trang cá nhân
						</Link>
						<Link
							href=""
							className="w-full hover:bg-gray-100 p-2 flex items-center justify-between">
							Đăng xuất
							<LogoutIcon height={6} width={6} color="black" />
						</Link>
					</div>
				</div>
			}
		</button>
	);
}
