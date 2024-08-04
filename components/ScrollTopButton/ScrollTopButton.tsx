import { IoIosArrowUp } from "react-icons/io";

export default function ScrollTopButton() {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<div
			onClick={() => scrollToTop()}
			className="fixed bottom-14 right-2 size-10 rounded-full bg-foreground-blue dark:bg-foreground-red flex items-center justify-center">
			<IoIosArrowUp className="size-8 text-white" />
		</div>
	);
}
