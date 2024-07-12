"use client";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { SearchAddition, SearchCriteria } from "@/app/interface/interfaces";
import { FaAngleRight } from "react-icons/fa";
import { useUserData } from "../context/UserProvider";
import { BsTrash } from "react-icons/bs";
import { FaSearchPlus } from "react-icons/fa";

export default function SearchAdditionButton() {
	const filterRef = useRef<HTMLDetailsElement>(null);

	const { searchAddition, setSearchAddition } = useUserData();

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
			<div className="absolute flex flex-col w-48 gap-2 p-2 bg-white border rounded-md shadow-md h-fit dark:shadow-black-night dark:border-black-night dark:bg-pot-black top-12 left-2 items-center">
				<InputNumberOfPage
					searchAddition={searchAddition}
					setSearchAddition={setSearchAddition}
				/>
				<InputUserPerPage
					searchAddition={searchAddition}
					setSearchAddition={setSearchAddition}
				/>
				<hr className="border w-11/12"></hr>
				<AddSortButton
					searchAddition={searchAddition}
					setSearchAddition={setSearchAddition}
				/>
			</div>
		</details>
	);
}

interface ComponentProps {
	searchAddition: SearchAddition;
	setSearchAddition: Dispatch<SetStateAction<SearchAddition>>;
}

function InputNumberOfPage({
	searchAddition,
	setSearchAddition,
}: ComponentProps) {
	const [numberOfPages, setNumberOfPages] = useState<number>(
		searchAddition.page || 1
	);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNumberOfPages(parseInt(e.target.value));
	};

	const onLoseFocus = () => {
		setSearchAddition({
			...searchAddition,
			page: numberOfPages || 1,
		});
	};

	return (
		<div
			tabIndex={-1}
			onBlur={() => onLoseFocus()}
			className="border-gray-200 dark:border-gray-400 w-full border-2 rounded-md outline-none h-fit ring-0  font-bold dark:bg-pot-black p-1 flex flex-row justify-start has-[:focus]:border-foreground-blue dark:has-[:focus]:border-foreground-red">
			<input
				type="number"
				onChange={(e) => onChangeValue(e)}
				value={numberOfPages}
				className="w-1/3 h-full p-1 text-base border-0 outline-none bg-inherit ring-0 group text-center"
				placeholder="1"
			/>
			<span className="w-2/3 text-center">pages</span>
		</div>
	);
}

function InputUserPerPage({
	searchAddition,
	setSearchAddition,
}: ComponentProps) {
	const [userPerPage, setUserPerPage] = useState<number>(
		searchAddition.size || 1
	);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserPerPage(parseInt(e.target.value));
	};

	const onLoseFocus = () => {
		setSearchAddition({
			...searchAddition,
			size: userPerPage || 1,
		});
	};

	return (
		<div
			tabIndex={-1}
			onBlur={() => onLoseFocus()}
			className="border-gray-200 dark:border-gray-400 w-full border-2 rounded-md outline-none h-fit ring-0 font-bold dark:bg-pot-black p-1 flex flex-row items-center start has-[:focus]:border-foreground-blue dark:has-[:focus]:border-foreground-red">
			<input
				type="number"
				onChange={(e) => onChangeValue(e)}
				value={userPerPage}
				className="w-1/3 h-full p-1 text-base border-0 outline-none bg-inherit ring-0 group text-center"
				placeholder="1"
			/>
			<span className="w-2/3 whitespace-nowrap text-center">
				users / page
			</span>
		</div>
	);
}

function AddSortButton({ searchAddition, setSearchAddition }: ComponentProps) {
	const sortRef = useRef<HTMLDetailsElement>(null);

	return (
		<details ref={sortRef} className="relative w-full h-fit group">
			<summary className="w-full list-none h-fit">
				<div className="flex items-center justify-between w-full p-1 font-bold border-2 rounded-md hover:border-foreground-blue dark:hover:border-foreground-red hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white dark:hover:text-gray-200 group-open:bg-foreground-blue dark:group-open:bg-foreground-red group-open:text-white text-center">
					Add Sort Option
					<FaAngleRight size={25} className="" />
				</div>
			</summary>
		</details>
	);
}

