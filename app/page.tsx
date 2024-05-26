import NavBar from "@/components/Navbar/Navbar";
import Reveal from "@/components/AnimationWrapper/Reveal";

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="w-full h-fit pt-14">
				<div className="w-full h-144 bg-primary p-8">
					<div className="w-full h-full rounded-lg bg-white"></div>
				</div>
				<div className="w-full h-144 bg-white"></div>
			</div>
		</>
	);
}
