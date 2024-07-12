import Link from "next/link";
import { useRef, useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { FaCog } from "react-icons/fa";

export default function Mail() {
	const MailRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				MailRef.current &&
				!MailRef.current.contains(event.target as Node)
			) {
				MailRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<details className="relative" ref={MailRef}>
			<summary className="list-none">
				<CiMail
					size={35}
					className="p-1 rounded-full cursor-pointer stroke-[0.5] hover:bg-background-gray text-pot-black dark:text-gray-200 dark:hover:bg-zinc-700"
				/>
			</summary>
			<div className="absolute right-0 flex flex-col gap-2 overflow-hidden bg-white rounded-md shadow-md w-60 h-60 top-10">
				<div className="flex items-center w-full h-10 p-2 bg-foreground-red">
					<span className="text-base text-white">My mail</span>

					<button className="ml-auto">
						<FaCog size={20} color="white" />
					</button>
				</div>

				<div className="flex items-center justify-center flex-1">
					<span>You have 0 mail</span>
				</div>

				<div className="flex items-center justify-center w-full h-10 bg-gray-50">
					<Link
						href="#"
						className="text-foreground-red hover:underline underline-offset-2">
						View all mail
					</Link>
				</div>
			</div>
		</details>
	);
}
