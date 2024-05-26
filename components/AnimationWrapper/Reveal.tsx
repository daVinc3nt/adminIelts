"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

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
	const contentRef = useRef();
	const inView = useInView(contentRef, { once: true });
	const animationControl = useAnimation();

	useEffect(() => {
		if (inView) {
			animationControl.start("visible");
		}
	}, [inView]);

	return (
		<div ref={contentRef} style={{ position: "relative", width, overflow }}>
			<motion.div
				variants={variants}
				initial={direction}
				animate={animationControl}
				transition={{ duration: 0.2, delay: 0.1 }}>
				{children}
			</motion.div>
		</div>
	);
}

const variants = {
	right2left: { opacity: 0, x: 200 },
	left2right: { opacity: 0, x: -200 },
	top2bot: { opacity: 0, y: -200 },
	bot2top: { opacity: 0, y: 200 },
	visible: { opacity: 1, x: 0, y: 0 },
};
