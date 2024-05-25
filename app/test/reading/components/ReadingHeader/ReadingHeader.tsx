import { Dispatch, SetStateAction } from "react";
import Switch from "@/components/Switch/Switch";
import Timer from "@/components/Timer/Timer";

interface HeaderInterface {
	value: boolean;
	setValue: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ value, setValue }: HeaderInterface) {
	return (
		<div className="w-full min-h-fit gap-4 grid grid-cols-9 max-lg:grid-cols-3">
			<div className="flex flex-row gap-4 items-center col-span-3">
				<Switch
					id="hightlight"
					size={6}
					value={value}
					setValue={setValue}
				/>
				<div className="font-semibold text-sm">Enable highlight</div>
			</div>

			<div className="w-fit h-fit mr-auto ml-auto col-span-3">
				<Timer duration={60} />
			</div>

			<div className="col-span-3 flex justify-end max-md:hidden"></div>
		</div>
	);
}

// <button className="w-fit h-fit text-lg font-semibold p-1 px-2 bg-red-100 hover:bg-red-900 hover:text-white duration-200  border-2 border-solid border-red-800 max-lg:w-1/2">
// 	Nộp bài
// </button>
