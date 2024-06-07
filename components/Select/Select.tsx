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
			className={`relative border-2 rounded-md min-w-fit w-full cursor-pointer bg-white shadow-sm
			${open ? "border-red-500 ring-1 ring-red-500" : "border"}
			`}>
			<div
				onClick={openDropdown}
				onBlur={onBlur}
				className="flex flex-row items-center justify-start gap-2 px-2 py-2 control">
				<input
					ref={inputRef}
					type="text"
					placeholder={
						input == ""
							? defaultPlaceholder
							: option[currentOption].label
					}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					className={`w-full text-base border-none outline-none cursor-pointer mr-auto
					${input == "" ? "placeholder-gray-400" : "placeholder-black"}`}
				/>

				<span className="w-0 h-5 border border-gray-200" />

				<FaAngleDown
					size={20}
					className={`hover:text-gray-500 ${
						open ? "text-gray-500" : "text-gray-200"
					}`}
				/>
			</div>

			{open && (
				<div className="w-full absolute left-0 top-12 max-h-[162px] border-2 border-red-400 overflow-hidden rounded-md shadow-md shadow-gray-100 option bg-white">
					<div
						className={`flex flex-col w-full overflow-y-scroll  max-h-[162px]`}>
						{option.map((item, index) => {
							if (!containSearchValue(item.label)) return null;

							return (
								<div
									key={index}
									onClick={() =>
										selectValue(item.value, index)
									}
									className={`${input == item.value ? "bg-red-200" : ""} w-full px-3 py-2 h-fit hover:bg-red-200`}>
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
