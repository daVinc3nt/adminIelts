import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function CustomLoadingElement() {
	return (
		<div className="w-full h-screen flex flex-col gap-4 justify-center place-items-center dark:text-white bg-white dark:bg-[#3a3b3c]  ">
			<LoadingSpinner />
		</div>
	);
}
