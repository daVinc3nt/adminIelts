import EaseIn from "../AnimationWrapper/EaseIn";
import SlideIn from "../AnimationWrapper/SlideIn";
import Link from "next/link";

interface Props {
	title: string;
	description: string;
	bg: string;
	path: string;
}

export default function CourseCard({ title, description, bg, path }: Props) {
	const navigate = () => {
		if (path != "") {
			window.open(path, "_self");
		}
	};

	return (
		<SlideIn
			direction="right2left"
			whileHover={{ y: -10 }}
			className="w-full h-fit">
			<div
				onClick={navigate}
				className="w-full h-80 rounded-lg overflow-hidden shadow-md group">
				<div
					className={`w-full bg-${bg} bg-no-repeat bg-cover h-1/2 p-4`}></div>
				<div className="w-full h-1/2 p-4 flex flex-col justify-between">
					<EaseIn delay={0.1}>
						<h2 className="group-hover:text-red-600 duration-200">
							{title}
						</h2>
					</EaseIn>
					<EaseIn className="w-full h-fit" delay={0.2}>
						<div className="w-full h-fit text-sm overflow-hidden">
							{description}
						</div>
					</EaseIn>
					<button className="w-full h-8 bg-white rounded-lg hover:bg-red-400 hover:text-white shadow-sm">
						Làm bài ngay
					</button>
				</div>
			</div>
		</SlideIn>
	);
}
