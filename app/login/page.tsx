"use client";
import { CredentialsForm } from "@/app/login/components/CredentialsForm";
import { GoogleSignInButton } from "@/app/login/components/GoogleSignInButton";
import { SignUpForm } from "@/app/login/components/SignUpForm";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const duration = 0.2;

export default function Page() {
	const [isLogin, setIsLogin] = useState<boolean>(true);

	return (
		<main className="flex items-center justify-center flex-1 h-screen gap-2">
			<AnimatePresence mode="wait" initial={false}>
				{isLogin && <Login setIsLogin={setIsLogin} />}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{!isLogin && <SignUp setIsLogin={setIsLogin} />}
			</AnimatePresence>
		</main>
	);
}

interface LoginProps {
	setIsLogin: (isLogin: boolean) => void;
}

function Login({ setIsLogin }: LoginProps) {
	return (
		<motion.div
			initial={{ rotateY: 90 }}
			animate={{
				rotateY: 0,
				transition: { delay: duration, ease: "linear" },
			}}
			exit={{
				rotateY: 90,
				transition: { duration: duration, ease: "linear" },
			}}
			className="relative flex h-[80%] z-40 w-128">
			<div className="w-full h-full z-30 bg-foreground-red absolute top-0 left-0 rounded-md rotate-6 shadow-md" />

			<div className="w-full h-full z-20 bg-foreground-blue absolute top-0 left-0 rounded-md rotate-12 shadow-md rotate-in-12" />

			<div className="flex flex-col items-center justify-between z-40 bg-white dark:bg-gray-22 px-10 py-10 md:px-20 md:pb-10 shadow-md w-full h-full rounded-md">
				<img
					src="/images/Logo_name.png"
					className="mb-5 w-[300px] h-fit object-contain"
					alt="Google Logo"
				/>
				<span className="text-3xl font-semibold text-center mb-4">
					Log in
				</span>
				<GoogleSignInButton />
				<span className="mt-5 text-2xl font-semibold text-center text-black dark:text-white">
					or
				</span>
				<CredentialsForm />
				<span className="mt-5 text-sm text-center text-black dark:text-white">
					Don't have an account?{" "}
				</span>{" "}
				<span
					onClick={() => setIsLogin(false)}
					className="text-blue-500 dark:text-red-500 cursor-pointer">
					Sign up
				</span>
			</div>
		</motion.div>
	);
}

interface SignUpProps {
	setIsLogin: (isLogin: boolean) => void;
}

function SignUp({ setIsLogin }: SignUpProps) {
	return (
		<motion.div
			initial={{ rotateY: 90 }}
			animate={{
				rotateY: 0,
				transition: { delay: duration, ease: "linear" },
			}}
			exit={{
				rotateY: 90,
				transition: { duration: duration, ease: "linear" },
			}}
			className="absolute flex h-[80%] z-40 w-128">
			<div className="w-full h-full z-30 bg-foreground-red absolute top-0 left-0 rounded-md -rotate-6 shadow-md rotate-in-12" />

			<div className="w-full h-full z-20 bg-foreground-blue absolute top-0 left-0 rounded-md -rotate-12 shadow-md rotate-in-12" />

			<div className="flex flex-col items-center justify-between z-40 bg-white dark:bg-gray-22 px-10 py-10 md:px-20 md:pb-10 shadow-md w-full h-full rounded-md">
				<img
					src="/images/Logo_name.png"
					className="mb-5 w-[300px] h-fit object-contain"
					alt="Google Logo"
				/>
				<div className="relative w-full h-full">
					<SignUpForm />
				</div>
				<span className="mt-5 text-sm text-center text-black dark:text-white">
					Already have an account?{" "}
				</span>{" "}
				<span
					onClick={() => setIsLogin(true)}
					className="text-blue-500 cursor-pointer dark:text-red-500">
					Log in
				</span>
			</div>
		</motion.div>
	);
}