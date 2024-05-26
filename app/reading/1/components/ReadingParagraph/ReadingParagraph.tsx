"use client";
import React, { useEffect, useState, useRef } from "react";

interface ReadingParagraphProps {
	highLight: boolean;
	title: string;
	paragraph: string;
}

export default function ReadingParagraph({
	highLight,
	title,
	paragraph,
}: ReadingParagraphProps) {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleSelection = () => {
			const selection = window.getSelection();
			if (
				selection &&
				selection.rangeCount > 0 &&
				selection.toString().trim() &&
				highLight
			) {
				const range = selection.getRangeAt(0);

				const span = document.createElement("span");
				span.style.backgroundColor = "#fca5a5";
				try {
					range.surroundContents(span);
				} catch {}

				selection.removeAllRanges();
			}
		};

		if (highLight) {
			contentRef.current?.addEventListener("mouseup", handleSelection);
			contentRef.current?.addEventListener("touchend", handleSelection);
		} else {
			contentRef.current?.removeEventListener("mouseup", handleSelection);
			contentRef.current?.removeEventListener(
				"touchend",
				handleSelection
			);
		}

		return () => {
			contentRef.current?.removeEventListener("mouseup", handleSelection);
			contentRef.current?.removeEventListener(
				"touchend",
				handleSelection
			);
		};
	}, [highLight]);

	return (
		<div
			ref={contentRef}
			className="w-full h-full col-span-6 bg-primary flex flex-col lg:overflow-y-scroll gap-4 p-2 max-lg:col-span-full">
			<div className="w-full h-fit text-2xl font-bold">{title}</div>
			<div
				className="w-full h-fit whitespace-pre-wrap"
				dangerouslySetInnerHTML={{ __html: paragraph }}></div>
		</div>
	);
}
