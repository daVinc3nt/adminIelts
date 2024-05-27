"use client";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const formatRemainingTime = (time) => {
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = time % 60;

	return `${minutes}:${seconds}`;
};

function enableBeforeUnload() {
	window.onbeforeunload = function (e) {
		alert("Bạn có chắc muốn thoát bài thi chứ?");
	};
}
function disableBeforeUnload() {
	window.onbeforeunload = null;
}
const renderTime = ({ remainingTime }) => {
	if (remainingTime === 0) {
		return <div className="timer">Too lale...</div>;
	}

	return (
		<div className="timer">
			<div className="text">Remaining time</div>
			<div className="value">{formatRemainingTime(remainingTime)}</div>
		</div>
	);
};
export default function Pie({ duration, size }) {
	const [timeRemaining, setTimeRemaining] = useState(duration); // Thời gian còn lại (tính bằng giây)
	// const [isPaused, setIsPaused] = useState(false); // Trạng thái tạm dừng
	// Hàm khởi tạo timer
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (timeRemaining > 0) {
				if (window) {
					localStorage.setItem(
						"timer",
						(timeRemaining - 1).toString()
					);
					setTimeRemaining(parseInt(localStorage.getItem("timer")));
				}
			} else {
				clearInterval(intervalId);
			}
		}, 1000); // Cập nhật mỗi giây
		return () => clearInterval(intervalId); // Xóa interval khi component unmount
	}, [timeRemaining]);

	// Hàm toggle trạng thái tạm dừng
	// const togglePause = () => {
	//   setIsPaused(!isPaused);
	// };

	const formatTime = () => {
		const minutes = Math.floor(timeRemaining / 60);
		const seconds = timeRemaining % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};
	// This could be useState, useOptimistic, or other state
	useEffect(() => {
		const onBeforeUnload = (ev: Event) => {
			ev.preventDefault();
		};
		window.addEventListener("beforeunload", onBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", onBeforeUnload);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div
				onKeyDown={() => {
					window.onbeforeunload = () => {
						return true;
					};
				}}
				className={`relative size-24 lg:size-24  ${timeRemaining / duration < 0.1 ? "animate-tada" : ""}`}>
				<svg
					className="size-full"
					width="36"
					height="36"
					viewBox="0 0 36 36"
					xmlns="http://www.w3.org/2000/svg">
					<circle
						cx="18"
						cy="18"
						r="16"
						fill="none"
						className="stroke-current text-gray-200"
						strokeWidth="2"></circle>

					<g className="origin-center -rotate-90 transform duration-200 ease-linear transition-all">
						<circle
							cx="18"
							cy="18"
							r="16"
							fill="none"
							className={`stroke-current text-red-400 duration-200 ease-linear transition-all`}
							strokeWidth="2"
							strokeDasharray="100"
							strokeDashoffset={
								(timeRemaining / duration) * 100
							}></circle>
					</g>
				</svg>
				<div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
					<span className="text-center text-xs lg:text-xl font-bold text-gray-800">
						{formatTime()}
					</span>
				</div>
			</div>
		</>
	);
}
