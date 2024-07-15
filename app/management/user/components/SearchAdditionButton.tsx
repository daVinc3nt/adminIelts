"use client";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { SearchAddition } from "@/app/interface/interfaces";
import { FaAngleRight } from "react-icons/fa";
import { useUserData } from "../context/UserDataProvider";
import { BsTrash } from "react-icons/bs";
import { FaSearchPlus } from "react-icons/fa";
import Select from "@/components/Select/Select";

export default function SearchAdditionButton() {
	const filterRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				filterRef.current &&
				!filterRef.current.contains(event.target as Node)
			) {
				filterRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<details
			ref={filterRef}
			className="relative h-full cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="flex flex-row items-center justify-center h-full gap-2 px-4 font-bold text-white duration-200 rounded-md dark:text-gray-200 w-fit borde-0 whitespace-nowrap bg-foreground-blue dark:bg-foreground-red">
					Addition
					<FaSearchPlus strokeWidth="3" size={20} />
				</div>
			</summary>
			<div className="absolute z-10 flex flex-col items-center w-48 gap-2 p-2 bg-white border rounded-md shadow-md h-fit dark:shadow-black-night dark:border-black-night dark:bg-gray-22 top-12 left-2">
				<InputUserPerPage />
				<hr className="w-11/12 border dark:border-gray-400"></hr>
				<AddSortButton />
			</div>
		</details>
	);
}

function InputUserPerPage() {
	const inputRef = useRef<HTMLInputElement>(null);

	const { searchAddition, setSearchAddition, setUserInforList } =
		useUserData();

	const [userPerPage, setUserPerPage] = useState<number | "">(
		searchAddition.size || undefined
	);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			setUserPerPage("");
			return;
		}
		setUserPerPage(parseInt(e.target.value));
	};

	const onLoseFocus = () => {
		if (searchAddition.size === userPerPage) return;
		setSearchAddition({
			...searchAddition,
			size: userPerPage || 1,
		});
		setUserInforList([]);
	};

	return (
		<div
			tabIndex={-1}
			onFocus={() => inputRef.current?.focus()}
			onBlur={() => onLoseFocus()}
			className="border-gray-200 dark:border-gray-400 w-full border-2 rounded-md outline-none h-fit ring-0 font-bold dark:bg-pot-black p-1 flex flex-row items-center start has-[:focus] dark:text-gray-400 :border-foreground-blue dark:has-[:focus]:border-foreground-red">
			<input
				type="number"
				ref={inputRef}
				onChange={(e) => onChangeValue(e)}
				value={userPerPage}
				className="w-1/3 h-full p-1 text-base text-center border-0 outline-none bg-inherit ring-0 group"
				placeholder="1"
			/>
			<span className="w-2/3 text-center whitespace-nowrap">
				users / page
			</span>
		</div>
	);
}

function AddSortButton() {
	const sortRef = useRef<HTMLDetailsElement>(null);

	const [sortOption, setSortOption] = useState<string[]>(["", "ASC"]);

	const { searchAddition, setSearchAddition } = useUserData();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sortRef.current &&
				!sortRef.current.contains(event.target as Node)
			) {
				sortRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const addSortOption = () => {
		if (sortOption[0] == "") {
			alert("Please select a field to sort");
			return;
		}

		setSearchAddition({
			...searchAddition,
			sort: [...searchAddition.sort, sortOption as any],
		});

		clear();
		if (sortRef.current) {
			sortRef.current.open = false;
		}
	};

	const clear = () => {
		setSortOption(["", "ASC"]);
	};

	return (
		<details ref={sortRef} className="relative w-full h-fit group">
			<summary className="w-full list-none h-fit">
				<div className="flex items-center justify-between w-full py-1 pl-2 pr-1 font-bold text-center border-2 rounded-md text-pot-black dark:text-gray-400 hover:text-white group-open:text-white dark:group-open:text-gray-200 group-open:bg-foreground-blue group-open:border-foreground-blue dark:border-gray-400 dark:group-open:border-foreground-red dark:group-open:bg-foreground-red hover:bg-foreground-blue dark:hover:bg-foreground-red hover:border-foreground-blue dark:hover:border-foreground-red">
					Sort Option
					<FaAngleRight size={25} className="" />
				</div>
			</summary>
			<div className="absolute z-10 flex flex-col w-56 gap-2 p-2 bg-white border rounded-md shadow-md h-fit dark:shadow-black-night dark:border-black-night dark:bg-gray-22 -top-2 left-48">
				<SelectFieldButton
					sortOption={sortOption}
					setSortOption={setSortOption}
				/>

				<div className="flex flex-row w-full gap-2">
					<div
						onClick={() => setSortOption([sortOption[0], "ASC"])}
						className={`flex items-center justify-between w-full py-1 pl-2 pr-1 font-bold text-center border-2 rounded-md hover:border-foreground-blue dark:hover:border-foreground-red hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white dark:hover:text-gray-200 ${sortOption[1] == "ASC" ? "bg-foreground-blue dark:bg-foreground-red text-white dark:border-foreground-red border-foreground-blue" : "text-pot-black dark:text-gray-400 dark:border-gray-400"}`}>
						Ascending
					</div>
					<div
						onClick={() => setSortOption([sortOption[0], "DESC"])}
						className={`flex items-center justify-between w-full py-1 pl-2 pr-1 font-bold text-center border-2 rounded-md hover:border-foreground-blue dark:hover:border-foreground-red hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white dark:hover:text-gray-200 ${sortOption[1] == "DESC" ? "bg-foreground-blue dark:bg-foreground-red text-white dark:border-foreground-red border-foreground-blue" : "text-pot-black dark:text-gray-400 dark:border-gray-400"}`}>
						Descending
					</div>
				</div>

				<div className="flex flex-row justify-between w-full mt-4 h-fit">
					<button
						onClick={() => clear()}
						className="p-2 rounded-md bg-mecury-gray dark:bg-pot-black">
						<BsTrash size={25} className="" />
					</button>

					<button
						onClick={() => addSortOption()}
						className="p-2 font-bold text-white duration-200 rounded-md w-fit h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
						Add option
					</button>
				</div>
			</div>
		</details>
	);
}

const fields = [
	{ label: "First Name", value: "firstName" },
	{ label: "Last Name", value: "lastName" },
	{ label: "Username", value: "username" },
	{ label: "Email", value: "email" },
];

interface FieldProps {
	sortOption: string[];
	setSortOption: Dispatch<SetStateAction<string[]>>;
}

function SelectFieldButton({ sortOption, setSortOption }: FieldProps) {
	const fieldRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				fieldRef.current &&
				!fieldRef.current.contains(event.target as Node)
			) {
				fieldRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const onSelectField = (field: string) => {
		setSortOption([field, sortOption[1]]);
		if (fieldRef.current) {
			fieldRef.current.open = false;
		}
	};

	// get the label of searchCiteria field using fields array
	const fieldLabel = fields.find(
		(field) => field.value == sortOption[0]
	)?.label;

	return (
		<details ref={fieldRef} className="relative w-full h-fit">
			<summary className="w-full list-none h-fit">
				<div
					className={`flex items-center justify-between w-full py-1 pl-2 pr-1 font-bold text-center border-2 rounded-md border-foreground-blue dark:border-foreground-red ${sortOption[0] != "" ? "bg-foreground-blue text-white dark:text-gray-200 dark:bg-foreground-red" : "text-black dark:text-gray-400"}`}>
					{sortOption[0] == "" ? "Select Field" : fieldLabel}
					<FaAngleRight size={25} className="" />
				</div>
			</summary>
			<div className="absolute flex flex-wrap w-56 gap-2 p-2 bg-white border rounded-md shadow-md -top-2 left-56 h-fit dark:bg-pot-black dark:shadow-black-night dark:border-black-night">
				{fields.map((field, index) => {
					return (
						<div
							key={index}
							onClick={() => onSelectField(field.value)}
							className="flex flex-row items-center justify-center p-1 font-bold text-black duration-200 border-2 rounded-md h-fit w-fit hover:text-white dark:text-gray-200 borde-0 whitespace-nowrap hover:bg-foreground-blue dark:hover:bg-foreground-red border-foreground-blue dark:border-foreground-red">
							{field.label}
						</div>
					);
				})}
			</div>
		</details>
	);
}

