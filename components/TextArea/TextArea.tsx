import { useEffect, useRef } from "react";

interface Props {
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	value?: string;
	onChangeInput?: any;
	defaultRows?: number;
}

export default function TextArea({
	className,
	disabled,
	placeholder,
	value,
	onChangeInput,
	defaultRows,
}: Props) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textAreaRef.current) {
			const target = textAreaRef.current;
			target.style.height = "inherit";
			target.style.height = `${target.scrollHeight}px`;
		}
	}, []);

	return (
		<textarea
			ref={textAreaRef}
			rows={defaultRows ? defaultRows : 1}
			value={value}
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
				"w-full h-fit px-2 py-1 overflow-hidden border border-gray-400 border-solid rounded-md outline-none resize-none focus:border-blue-400 focus:outline focus:ring-1 focus:ring-blue-400 " +
				className
			}
		/>
	);
}
