"use client";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
export function GoogleSignInButton() {
	const handleClick = () => {
		signIn("google");
	};
	return (
		<button
			className="flex items-center bg-white rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-pot-black dark:text-white"
			onClick={handleClick}>
			<FcGoogle className="mr-2 size-7" />
			<span>Continue with Google</span>
		</button>
	);
}
