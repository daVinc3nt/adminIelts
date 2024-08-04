"use client"; // Error components must be Client Components
import { useRouter } from "next/navigation";
import { MdError } from "react-icons/md";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	return (
		<div className="w-full h-screen -mt-14 flex items-center justify-center flex-col gap-2">
			<MdError className="size-40 text-red-500" />
			<h1 className="text-3xl font-semibold">
				Opps! Some thing went wrong.
			</h1>
			<p className="text-red-500 text-lg">{error.message}</p>
			<div className="w-fit flex flew-row gap-2 items-center justify-center">
				<button
					onClick={() => router.push("/")}
					className="w-fit h-fit px-4 py-2 rounded-md underline underline-offset-2 hover:text-blue-600">
					Back to home
				</button>
			</div>
		</div>
	);
}
