"use client";
import { useEffect, useRef } from "react";

interface Props {
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	value?: string;
	onChangeInput?: any;
	defaultRows?: number;
	required?: boolean;
	autoComplete?: "on" | "off";
}

export default function TextArea({
	className,
	disabled,
	placeholder,
	value,
	onChangeInput,
	defaultRows,
	required,
	autoComplete,
}: Props) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textAreaRef.current) {
			const target = textAreaRef.current;
			target.style.height = "inherit";
			target.style.height = `${target.scrollHeight}px`;
		}
	}, [textAreaRef]);

	return (
		<textarea
			ref={textAreaRef}
			rows={defaultRows ? defaultRows : 1}
			value={value}
			required={required}
			autoComplete={autoComplete}
			onChange={(e) => {
				if (onChangeInput) onChangeInput(e.target.value);
				const target = e.target as HTMLTextAreaElement;
				target.style.height = "inherit";
				target.style.height = `${target.scrollHeight}px`;
			}}
			placeholder={placeholder}
			spellCheck={false}
			disabled={disabled}
			className={
				"w-full h-fit px-2 py-1  overflow-hidden border border-gray-400 border-solid rounded-md outline-none resize-none focus:outline " +
				className
			}
		/>
	);
}
