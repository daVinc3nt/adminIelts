import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function LoadingPage() {
	return (
		<main className="flex justify-center w-full h-screen -mt-16 main">
			<div className="flex flex-col items-center justify-center w-full h-full">
				<LoadingSpinner size={4} />
			</div>
		</main>
	);
}
