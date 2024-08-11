"use client";
import { setId, setLogin } from "@/app/interface/cookies/cookies";
import { isAdmin } from "@/app/interface/privilegeconfig/privilegeconfig";
import { AuthOperation } from "@/app/lib/main";
import { useAuth } from "@/app/provider/AuthProvider";
import { useUtility } from "@/app/provider/UtilityProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CredentialsFormProps {
	csrfToken?: string;
}
export function CredentialsForm(props: CredentialsFormProps) {
	const { setIsLogin, setUserInformation } = useAuth();
	const { setError, setSuccess } = useUtility();

	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const username = data.get("username").toString();
		const password = data.get("password").toString();

		const newAuthOptions = new AuthOperation();
		newAuthOptions
			.login({
				identifier: username,
				password: password,
			})
			.then((response) => {
				if (response.success) {
					const userRole = response.data.roles.map((role) => {
						return role.role;
					});
					if (isAdmin(userRole)) {
						setSuccess("Login successful");
						setUserInformation(response.data);
						setId(response.data.id);
						setLogin(true);
						setIsLogin(true);
						window.location.href = "/";
					} else {
						setError("You are not allowed to access this page");
						setErrorMessage(
							"You are not allowed to access this page"
						);
					}
				} else {
					setError("Your username/password is wrong");
					setErrorMessage("Your username/password is wrong");
				}
			});
	};
	return (
		<form
			className=" w-full h-full text-black  flex flex-col items-center justify-between"
			action=""
			method="POST"
			onSubmit={handleSubmit}>
			<div className="relative w-full">
				<input
					id="username"
					name="username"
					type="text"
					className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 dark:text-gray-200 placeholder-transparent focus:outline-none focus:border-sky-700"
					placeholder=""
					required
				/>
				<label
					htmlFor="username"
					className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">
					Username
				</label>
			</div>

			<div className="mt-5 w-full sm:mt-10 relative">
				<input
					name="password"
					id="password"
					type="password"
					className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 dark:text-gray-200 placeholder-transparent focus:outline-none focus:border-sky-700"
					placeholder=""
					required
				/>
				<label
					htmlFor="password"
					className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:text-gray-600 peer-focus:text-sm">
					Password
				</label>
			</div>
			<p className="text-red-500  mt-5 text-xxs sm:text-sm">
				{errorMessage}
			</p>
			<button
				type="submit"
				className="mt-5 relative bg-foreground-blue dark:bg-foreground-red px-4 py-2 rounded-full w-2/3 text-white text-sm md:text-xl">
				Log in
			</button>
		</form>
	);
}
