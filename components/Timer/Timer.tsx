"use client";
import { useState, useEffect } from "react";

interface TimerProps {
	duration: number; // In minute
}

export default function Timer({ duration }: TimerProps) {
	const [time, setTime] = useState<number>(duration * 60);

	const timeString = (): string => {
		let minutes = Math.floor(time / 60).toString();
		let seconds = Math.floor(time % 60).toString();

		if (parseInt(minutes) < 10) {
			minutes = "0" + minutes;
		}
		if (parseInt(seconds) < 10) {
			seconds = "0" + seconds;
		}

		return "" + minutes + ":" + seconds;
	};

	useEffect(() => {
		const intervalID = setInterval(() => {
			setTime((prevTime) => (prevTime >= 0 ? prevTime - 1 : 0));
		}, 1000);

		// Super importance!
		return () => clearInterval(intervalID);
	}, []);

	return (
		<div
			className={`${time <= 300 ? "text-red-500" : ""} text-2xl font-bold`}>
			{timeString()}
		</div>
	);
}
