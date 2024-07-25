"use client";
import { AuthOperation } from "@/app/lib/main";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface CredentialsFormProps {
	csrfToken?: string;
}
export function CredentialsForm(props: CredentialsFormProps) {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const handleSubmit = async (e) => {
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
					console.log("data", response.data);
					router.push("/");
				} else {
					setError("Your username/password is wrong");
				}
			});

		// console.log(data.get("password"));
		// const signInResponse = await signIn("credentials", {
		// 	username: data.get("username"),
		// 	password: data.get("password"),
		// 	redirect: false,
		// }).then((respronse) => {
		// 	console.log("respronse", respronse);
		// 	return respronse;
		// });
		// if (signInResponse && !signInResponse.error) {
		// 	router.push("/");
		// } else {
		// 	console.log("Error: ", signInResponse);
		// 	setError("Your username/password is wrong");
		// }
	};
	return (
		<form
			className=" w-full mt-8 text-black  flex flex-col items-center"
			action=""
			method="POST"
			onSubmit={handleSubmit}>
			<div className="relative w-full">
				<input
					id="username"
					name="username"
					type="text"
					className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700"
					placeholder=""
					required
				/>
				<label
					htmlFor="username"
					className=" absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">
					Username
				</label>
			</div>

			<div className="mt-5 w-full sm:mt-10 relative">
				<input
					name="password"
					id="password"
					type="password"
					className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700"
					placeholder=""
					required
				/>
				<label
					htmlFor="password"
					className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
					Password
				</label>
				{/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
			</div>
			<p className="text-red-500  mt-5 text-xxs sm:text-sm">{error}</p>
			<button
				type="submit"
				className="mt-5 relative bg-blue-900 px-4 py-2 rounded-full w-2/3 text-white text-sm md:text-xl">
				Đăng nhập
			</button>
		</form>
	);
}
