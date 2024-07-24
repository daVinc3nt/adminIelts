import Link from "next/link";
import { useRef, useEffect } from "react";
import { CiUser } from "react-icons/ci";


export default function UserInfor() {
	const Ref = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (Ref.current && !Ref.current.contains(event.target as Node)) {
				Ref.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<details className="relative" ref={Ref}>
			<summary className="list-none">
				<div className="w-9 h-9 rounded-full bg-black"></div>
			</summary>
			<div className="absolute w-60 h-60 bg-white dark:bg-pot-black shadow-md right-0 top-10 rounded-md flex flex-col overflow-hidden gap-2">
				<div className="w-full h-10 bg-foreground-blue dark:bg-foreground-red flex items-center p-2">
					<span className="text-white text-base">My Account</span>
				</div>
				<div className="flex flex-row w-full h-fit">
					<CiUser size={20} />
					<Link href="#">User Information</Link>
				</div>
			</div>
		</details>
	);
}
