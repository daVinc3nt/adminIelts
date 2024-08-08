import Link from "next/link";
import { FaQuestionCircle } from "react-icons/fa";

interface NotFoundPageProps {
	message: string;
	subMessage?: string;
	backto?: string;
	backtoLink?: string;
}

export default function NotFoundPage({
	message,
	subMessage,
	backto,
	backtoLink,
}: NotFoundPageProps) {
	return (
		<main className="flex justify-center w-full h-screen -mt-16 main">
			<div className="flex flex-col items-center justify-center w-full h-full">
				<FaQuestionCircle className="size-40 text-foreground-blue dark:text-foreground-red" />
				<span className="pt-4 text-5xl font-bold">{message}</span>
				<span className="text-xl text-red-500">{subMessage || ""}</span>
				{backto && (
					<Link
						href={backtoLink || "/"}
						className="pt-4 underline underline-offset-2 hover:text-foreground-blue dark:hover:text-foreground-red">
						{backto}
					</Link>
				)}
			</div>
		</main>
	);
}
