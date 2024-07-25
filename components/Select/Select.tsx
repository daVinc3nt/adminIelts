"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface Props {
	input: any;
	onChangeInput: (value: any) => void;
	option: {
		value: any;
		label: string;
	}[];
	placeholder?: string;
}

export default function Select({
	input,
	onChangeInput,
	option,
	placeholder,
}: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const [currentOption, setCurrentOption] = useState<number>(0);

	const inputRef = useRef<HTMLInputElement>(null);

	const defaultPlaceholder = placeholder ? placeholder : "Select...";

	const openDropdown = () => {
		if (open) {
			setOpen(false);
			if (inputRef.current) inputRef.current.blur();
		} else {
			setOpen(true);
			if (inputRef.current) inputRef.current.focus();
		}
	};

	const containSearchValue = (value: string) => {
		if (searchValue == "") return true;
		return value.toLowerCase().includes(searchValue.toLowerCase());
	};

	const onBlur = () => {
		setTimeout(() => {
			setOpen(false);
			setSearchValue("");
		}, 150);
	};

	const resetValue = () => {
		onChangeInput("");
		setCurrentOption(-1);
	};

	const selectValue = (value: string, index: number) => {
		onChangeInput(value);
		setCurrentOption(index);
	};

	return (
		<div
			className={`relative border-2 rounded-md min-w-fit w-full cursor-pointer bg-white dark:bg-pot-black shadow-md
			${open ? "border-foreground-blue dark:border-foreground-red" : "border-transparent"}
			`}>
			<div
				onClick={openDropdown}
				onBlur={onBlur}
				className="flex flex-row items-center justify-start gap-2 px-2 py-1 control">
				<input
					ref={inputRef}
					type="text"
					placeholder={
						input === ""
							? defaultPlaceholder
							: option[currentOption].label
					}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					className={`w-full text-base border-none outline-none cursor-pointer mr-auto bg-white dark:bg-pot-black placeholder-black dark:placeholder-gray-200 text-black dark:text-gray-200`}
				/>

				<span className="w-0 h-5 border border-gray-200" />

				<FaAngleDown
					size={20}
					className={`hover:text-gray-400 ${
						open ? "text-gray-400" : "text-gray-200"
					}`}
				/>
			</div>

			{open && (
				<div className="absolute left-0 w-full overflow-hidden bg-white rounded-md shadow-md top-10 h-fit option dark:bg-gray-22">
					<div
						className={`flex flex-col w-full overflow-y-scroll  h-fit scrollbar-hide`}>
						{option.map((item, index) => {
							if (!containSearchValue(item.label)) return null;

							return (
								<div
									key={index}
									onClick={() =>
										selectValue(item.value, index)
									}
									className={`${input === item.value ? "bg-foreground-blue dark:bg-foreground-red text-white" : "text-black hover:text-white"} w-full px-3 py-1 h-fit hover:bg-foreground-blue dark:hover:bg-foreground-red  dark:text-gray-200`}>
									{item.label}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
