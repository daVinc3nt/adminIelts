import NavBar from "@/components/Navbar/Navbar";
import Reveal from "@/components/Reveal/Reveal";

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="flex min-h-screen w-full flex-col items-center justify-between p-24 mt-14">
				<Reveal direction="top2bot">
					<div className="w-40 h-40 rounded-lg bg-black"></div>
				</Reveal>
			</div>
		</>
	);
}
