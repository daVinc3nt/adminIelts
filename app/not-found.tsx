import Link from "next/link";

export default function Page404() {
	return (
		<main className="w-full h-screen flex items-center justify-center -mt-14 flex-col gap-2">
			<h1 className="text-black dark:text-white text-9xl font-bold">
				404
			</h1>
			<h1 className="text-black dark:text-white text-4xl flex flex-row gap-2">
				Page Not Found -
				<Link
					href="/"
					className="hover:text-foreground-blue dark:hover:text-foreground-red">
					Back to home
				</Link>
			</h1>
		</main>
	);
}
