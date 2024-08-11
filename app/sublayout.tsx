"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "../app/provider/UtilityProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	getRoleFromRoleInfor,
	isAdmin,
} from "./interface/privilegeconfig/privilegeconfig";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { isOpenSidebar } = useUtility();
	const { isLoading, isLogin, userInformation } = useAuth();

	const router = useRouter();

	useEffect(() => {
		if (!isLoading) {
			if (!isLogin) {
				router.push("/login");
			}

			// const roleList = getRoleFromRoleInfor(userInformation.roles);
			// if (!isAdmin(roleList)) {
			// 	alert("You are not allowed to access this page");
			// 	router.push("/login");
			// }
		}
	}, [isLoading]);

	return (
		<div
			style={{
				paddingLeft: isOpenSidebar ? "240px" : "0px",
			}}
			className="flex flex-col min-h-screen pt-16  bg-gray-50 dark:bg-black-night">
			{children}
		</div>
	);
}
