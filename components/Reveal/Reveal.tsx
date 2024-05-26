"use client";
import { motion, useInView } from "framer-motion";

interface Props {
	children: JSX.Element;
	width?: "fit-content" | "100%";
	overflow?: "hidden" | "visible";
	direction: "left2right" | "right2left" | "top2bot" | "bot2top";
}

export default function Reveal({
	children,
	width,
	overflow,
	direction,
}: Props) {
	return (
		<div style={{ position: "relative", width, overflow }}>
			<motion.div
				variants={variants}
				initial={direction}
				animate="visible"
				transition={{ duration: 0.5, delay: 0.25 }}>
				{children}
			</motion.div>
		</div>
	);
}

const variants = {
	right2left: { opacity: 0, x: 75 },
	left2right: { opacity: 0, x: -75 },
	top2bot: { opacity: 0, y: -75 },
	bot2top: { opacity: 0, y: 75 },
	visible: { opacity: 1, x: 0, y: 0 },
};
