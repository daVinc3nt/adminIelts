import { Dispatch, SetStateAction } from "react";
import Switch from "@/components/Switch/Switch";
import Timer from "@/components/Timer/ReadingTimer";
import { Part } from "../ReadingInterface";
import { Player } from "@lottiefiles/react-lottie-player";

interface HeaderInterface {
	value: boolean;
	setValue: Dispatch<SetStateAction<boolean>>;
	part: Part;
}

export default function Header({ value, setValue, part }: HeaderInterface) {
	return (
		<div className="w-full min-h-fit grid grid-cols-10 grid-rows-subgrid gap-2 max-lg:grid-cols-2 max-lg:grid-rows-2">
			<div className="flex flex-row gap-4 items-center col-span-3 row-span-1 col-start-1 row-start-1 max-lg:col-span-1 max-lg:col-start-1">
				<Switch
					id="hightlight"
					size={6}
					value={value}
					setValue={setValue}
				/>
				<div className="font-semibold text-sm">Enable highlight</div>
			</div>

			<div className="w-full h-full col-span-2 row-span-2 col-start-5 row-start-1 flex items-center justify-center max-lg:col-span-1 max-lg:col-start-2 max-lg:row-span-1">
				<Timer duration={3600} size={20} />
			</div>

			<div className="w-full h-full col-span-4 row-span-1 col-start-1 row-start-2 max-lg:col-span-2">
				<h1 className="text-3xl font-bold">{`Part ${part.partNumber}`}</h1>
				<div className="w-full text-lg font-bold">{`Reading the paragraph below and answer question ${part.startQuestion} - ${part.endQuestion}`}</div>
			</div>

			<div className="w-full h-full col-span-2 row-span-2 col-start-10 row-start-1 flex items-center justify-center max-md:hidden">
				<Player
					src="/animation/cheer.json"
					className="player"
					loop
					autoplay
					style={{ height: "100px", width: "100px" }}
				/>
			</div>
		</div>
	);
}

// <button className="w-fit h-fit text-lg font-semibold p-1 px-2 bg-red-100 hover:bg-red-900 hover:text-white duration-200  border-2 border-solid border-red-800 max-lg:w-1/2">
// 	Nộp bài
// </button>
