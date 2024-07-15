"use client";
import { CredentialsForm } from "@/app/login/components/CredentialsForm";
import { GoogleSignInButton } from "@/app/login/components/GoogleSignInButton";
import { SignUpForm } from "@/app/login/components/SignUpForm";
import Image from "next/image";
import { useState } from "react";
export default function Log() {
	const [show, setShow] = useState(false);
	return (
		<div className="bg-gray-100 fixed z-50 inset-0">
			<div
				className={`relative preserve-3d ${show ? "rotate-y-180" : ""} duration-500 w-full flex flex-col py-5  px-10 items-center justify-center min-h-screen`}>
				<div
					className="absolute bg-white rounded-xl flex 
                flex-col items-center
                px-10 py-10 md:px-20 md:pb-10 shadow-md h-[calc(100%)] md:h-[calc(90%)]">
					<Image
						src="/images/Logo_name2.png"
						className="mb-5"
						alt="Google Logo"
						width={300}
						height={300}
					/>
					<GoogleSignInButton />
					<span className="text-2xl font-semibold text-black text-center mt-5">
						hoặc
					</span>
					<CredentialsForm />
					<span className="text-sm text-black  text-center mt-10">
						Chưa có tài khoản?{" "}
					</span>{" "}
					<span
						className="text-blue-500 cursor-pointer"
						onClick={() => setShow(!show)}>
						Tạo mới
					</span>
				</div>
				<div
					className="absolute rotate-y-180 backface-hidden bg-white rounded-xl flex 
                flex-col items-center
                px-10 md:px-20 py-5 shadow-md h-[calc(100%)] md:h-[calc(90%)]">
					<Image
						src="/images/Logo_name2.png"
						className="mb-5"
						alt="Google Logo"
						width={300}
						height={300}
					/>
					<div className="relative h-full w-full">
						<SignUpForm />
					</div>
					<span className="text-sm text-black  text-center mt-5">
						Đã có tài khoản?{" "}
					</span>{" "}
					<span
						className="text-blue-500 cursor-pointer"
						onClick={() => setShow(!show)}>
						Đăng nhập
					</span>
				</div>
			</div>
		</div>
	);
}
