"use client";
import { SignUpPayload, VerifyOtpPayload } from "@/app/lib/interfaces";
import { AuthOperation } from "@/app/lib/main";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
interface CredentialsFormProps {
	csrfToken?: string;
}
export function SignUpForm(props: CredentialsFormProps) {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [info, setInfo] = useState<SignUpPayload>();
	const [show, setShow] = useState(false);
	const [otp, setOtp] = useState("");
	const [id, setId] = useState("");
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(info);
		const formData = new FormData(e.currentTarget);
		const Auth = new AuthOperation();
		setShow(!show);
		const response = await Auth.signup(info);
		console.log(response);
		if (window && response)
			localStorage.setItem("userinfo", JSON.stringify(response.data));
	};
	const handleSubmitOtp = async () => {
		const userId = JSON.parse(localStorage.getItem("userinfo"));
		console.log(userId);
		const verifyPayload: VerifyOtpPayload = {
			id: userId.id,
			otp: otp,
		};
		console.log(verifyPayload);
		const Auth = new AuthOperation();
		const response = await Auth.verifyOtp(verifyPayload);
		console.log(response);
	};
	return (
		<div className="inline-block">
			<form
				className={`absolute h-full  z-50 top-0 left-0 ${!show ? "opacity-100" : "animate-slide_out_up"} w-full bg-white text-black flex flex-col items-center`}
				action=""
				method="POST"
				onSubmit={handleSubmit}>
				<span className="text-2xl font-semibold  text-center">
					Đăng ký
				</span>
				<div className="relative overflow-y-scroll h-[calc(50%)]">
					<div className="flex gap-5 mt-10">
						<div className="relative">
							<input
								id="firstname"
								name="firstname"
								type="text"
								className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700"
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
								Tên
							</label>
						</div>
						<div className="relative">
							<input
								name="lastname"
								id="lastname"
								type="type"
								className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700"
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
								className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">
								Họ
							</label>
							{/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
						</div>
					</div>
					<div className="relative mt-8 w-full md:mt-10">
						<input
							name="username"
							id="username"
							type="type"
							className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700"
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
							className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700"
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
							className=" peer h-10 w-full border-b-2 bg-transparent  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-700"
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
					{error}
				</p>
				<button
					type="submit"
					className="mt-14 relative bg-blue-900 px-4 py-2 active:scale-110 duration-300 rounded-full w-2/3 text-white text-sm md:text-xl">
					Đăng ký
				</button>
			</form>

			<div
				className={`absolute top-0  left-0 z-10 h-full w-full ${show ? "animate-slide_in_up" : "opacity-0"} text-black flex flex-col items-center`}>
				<span className="mt-10 text-2xl font-semibold  text-center">
					Xác thực OTP
				</span>
				<span className="mt-5 text-lg font-semibold  text-center animate-bounce">
					Mình đang gửi <span className="text-red-600">mail</span> cho
					bạn...
				</span>
				<div className="relative px-5 mt-8 w-full md:mt-10">
					<input
						name="otp"
						id="otp"
						type="text"
						className=" h-10 w-full p-4 ring-2 ring-xanh_duong_bg rounded-full focus:outline-none  text-gray-900"
						onChange={(e) => setOtp(e.target.value)}
					/>
					{/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
				</div>
				<p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">
					{error}
				</p>
				<button
					onClick={() => handleSubmitOtp()}
					className="mt-10 relative bg-blue-900 px-4 py-2 active:scale-110 duration-300 rounded-full w-2/3 text-white text-sm md:text-xl">
					Xác nhận
				</button>
				<button
					onClick={() => {
						setShow(!show);
					}}
					className="mt-5 relative bg-blue-900 px-4 py-2 active:scale-110 duration-300 rounded-full w-2/3 text-white text-sm md:text-xl">
					Quay lại
				</button>
			</div>
		</div>
	);
}
