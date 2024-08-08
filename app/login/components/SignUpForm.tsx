"use client";
import { SignUpPayload, VerifyOtpPayload } from "@/app/lib/interfaces";
import { AuthOperation } from "@/app/lib/main";
import { useUtility } from "@/app/provider/UtilityProvider";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
interface CredentialsFormProps {
	csrfToken?: string;
}
export function SignUpForm(props: CredentialsFormProps) {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSignUp, setIsSignUp] = useState(true);

	return (
		<div className="inline-block h-full">
			{isSignUp ? (
				<SignUp
					setIsSignUp={setIsSignUp}
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
				/>
			) : (
				<VerifyOtp
					setIsSignUp={setIsSignUp}
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
				/>
			)}
		</div>
	);
}

interface SignUpProps {
	setIsSignUp: (isSignUp: boolean) => void;
	errorMessage: string;
	setErrorMessage: (errorMessage: string) => void;
}

function SignUp({ setIsSignUp, errorMessage, setErrorMessage }: SignUpProps) {
	const { setSuccess, setError } = useUtility();

	const [info, setInfo] = useState<SignUpPayload>();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const Auth = new AuthOperation();
		Auth.signup(info).then((res) => {
			if (res.success) {
				localStorage.setItem("userinfo", JSON.stringify(res.data));
				setIsSignUp(false);
				setSuccess("OTP sent to your mail");
				setErrorMessage("");
			} else {
				setError(res.message);
				setErrorMessage(res.message);
			}
		});
	};

	return (
		<form
			className="absolute h-full  z-50 top-0 left-0 w-full bg-white dark:bg-gray-22 dark:text-white text-black flex flex-col items-center justify-between"
			action=""
			method="POST"
			onSubmit={handleSubmit}>
			<span className="text-3xl font-semibold  text-center">Sign up</span>
			<div className="relative overflow-y-scroll h-[70%]">
				<div className="flex gap-5 mt-10">
					<div className="relative">
						<input
							id="firstname"
							name="firstname"
							type="text"
							className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700 dark:text-gray-200"
							placeholder=""
							onChange={(e) =>
								setInfo({
									...info,
									firstName: e.target.value,
								})
							}
							required
						/>
						<label
							htmlFor="firstname"
							className=" absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">
							First name
						</label>
					</div>
					<div className="relative">
						<input
							name="lastname"
							id="lastname"
							type="type"
							className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700 dark:text-gray-200"
							placeholder=""
							onChange={(e) =>
								setInfo({
									...info,
									lastName: e.target.value,
								})
							}
							required
						/>
						<label
							htmlFor="lastname"
							className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-gray-200">
							Last name
						</label>
						{/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
					</div>
				</div>
				<div className="relative mt-8 w-full md:mt-10">
					<input
						name="username"
						id="username"
						type="type"
						className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700 dark:text-gray-200"
						placeholder=""
						onChange={(e) =>
							setInfo({ ...info, username: e.target.value })
						}
						required
					/>
					<label
						htmlFor="username"
						className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">
						Username
					</label>
					{/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
				</div>
				<div className="relative mt-8 w-full md:mt-10">
					<input
						name="email"
						id="email"
						type="text"
						className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700 dark:text-gray-200"
						placeholder=""
						onChange={(e) =>
							setInfo({ ...info, email: e.target.value })
						}
						required
					/>
					<label
						htmlFor="email"
						className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">
						Email
					</label>
					{/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
				</div>
				<div className="relative mt-8 w-full md:mt-10">
					<input
						name="pass"
						id="pass"
						type="password"
						placeholder=""
						className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700 dark:text-gray-200"
						onChange={(e) =>
							setInfo({ ...info, password: e.target.value })
						}
						required
					/>
					<label
						htmlFor="pass"
						className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">
						Passsword
					</label>
					{/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
				</div>
			</div>
			<p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">
				{errorMessage}
			</p>
			<button
				type="submit"
				className="relative bg-foreground-blue dark:bg-foreground-red px-4 py-2 active:scale-110 duration-300 rounded-full w-2/3 text-white text-sm md:text-xl">
				Sign up
			</button>
		</form>
	);
}

interface VerifyOtpProps {
	setIsSignUp: (isSignUp: boolean) => void;
	errorMessage: string;
	setErrorMessage: (errorMessage: string) => void;
}

function VerifyOtp({
	setIsSignUp,
	setErrorMessage,
	errorMessage,
}: VerifyOtpProps) {
	const router = useRouter();

	const { setSuccess, setError } = useUtility();

	const [otp, setOtp] = useState("");

	const handleSubmitOtp = async () => {
		const userId = JSON.parse(localStorage.getItem("userinfo"));
		const verifyPayload: VerifyOtpPayload = {
			id: userId.id,
			otp: otp,
		};
		const Auth = new AuthOperation();
		Auth.verifyOtp(verifyPayload).then((res) => {
			if (res.success) {
				localStorage.setItem("userinfo", JSON.stringify(res.data));
				setSuccess("Account created successfully");
				setTimeout(() => {
					router.refresh();
				}, 1000);
			} else {
				setError(res.message);
				setErrorMessage(res.message);
			}
		});
	};

	return (
		<div className="absolute top-0  left-0 z-10 h-full w-full text-black dark:text-white flex flex-col items-center">
			<span className="mt-10 text-2xl font-semibold  text-center">
				OTP Verification
			</span>
			<span className="mt-5 text-lg font-semibold  text-center animate-bounce">
				Sending OTP in your <span className="text-red-600">mail</span>{" "}
				...
			</span>
			<div className="relative px-5 mt-8 w-full md:mt-10">
				<input
					name="otp"
					id="otp"
					type="text"
					className=" h-10 w-full p-4 ring-2 ring-xanh_duong_bg rounded-full focus:outline-none  text-gray-900 dark:text-white"
					onChange={(e) => setOtp(e.target.value)}
				/>
			</div>
			<p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">
				{errorMessage}
			</p>
			<button
				onClick={() => handleSubmitOtp()}
				className="mt-10 relative bg-blue-900 px-4 py-2 active:scale-110 duration-300 rounded-full w-2/3 text-white text-sm md:text-xl">
				Confirm
			</button>
			<button
				onClick={() => {
					setIsSignUp(true);
				}}
				className="mt-5 relative bg-blue-900 px-4 py-2 active:scale-110 duration-300 rounded-full w-2/3 text-white text-sm md:text-xl">
				Return
			</button>
		</div>
	);
}
