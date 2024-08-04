"use client";
import { useUtility } from "../provider/UtilityProvider";

export default function Home() {
	const { setSuccess } = useUtility();

	const onSetSuccess = () => {
		setSuccess("succsess");
	};

	return (
		<main className="flex items-center justify-center flex-1 p-4 bg-gray-100 h-fit">
			<button
				onClick={() => onSetSuccess()}
				className="p-4 bg-foreground-blue text-white">
				Set Success
			</button>
		</main>
	);
}
