"use client";
import { useEffect, useRef } from "react";

export const useHorizontallScroll = () => {
	const divRef = useRef();
	useEffect(() => {
		if (divRef.current) {
			const div = divRef.current as HTMLElement;
			const onWheel = (e: WheelEvent) => {
				e.preventDefault();
				if (e.deltaY == 0) return;
				div.scrollTo({
					left: div.scrollLeft + e.deltaY * 4,
					behavior: "smooth",
				});
			};
			div.addEventListener("wheel", onWheel);

			return () => div.removeEventListener("wheel", onWheel);
		}
	}, [divRef]);

	return divRef;
};
