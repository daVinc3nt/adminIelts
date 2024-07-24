"use client";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { SearchCriteria } from "@/app/interface/interfaces";
import { TbFilterPlus } from "react-icons/tb";
import { FaAngleRight } from "react-icons/fa";
import { useUserManagement } from "../provider/UserManagementProvider";
import { BsTrash } from "react-icons/bs";

export default function FilterButton() {
	const filterRef = useRef<HTMLDetailsElement>(null);
	const [searchCiteria, setSearchCriteria] =
		useState<SearchCriteria | null>();
	const [step, setStep] = useState<number>(0);

	const { searchCiterias, setSearchCiterias } = useUserManagement();

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

	const addFilter = () => {
		if (!searchCiteria) return;
		if (searchCiteria.value === "") {
			alert("Value cannot be empty");
			return;
		}
		setSearchCiterias([...searchCiterias, searchCiteria as SearchCriteria]);
		setSearchCriteria(null);
		setStep(0);
		if (filterRef.current) {
			filterRef.current.open = false;
		}
	};

	const clear = () => {
		setSearchCriteria(null);
		setStep(0);
	};

	return (
		<details
			ref={filterRef}
			className="relative h-full cursor-pointer w-fit">
			<summary className="h-full list-none">
				<div className="flex flex-row items-center justify-center h-full gap-2 px-4 font-bold text-white duration-200 rounded-md dark:text-gray-200 w-fit borde-0 whitespace-nowrap bg-foreground-blue dark:bg-foreground-red">
					Filter
					<TbFilterPlus strokeWidth="3" size={20} />
				</div>
			</summary>
			<div className="absolute flex flex-col w-[214px] gap-2 p-2 bg-white border rounded-md shadow-md h-fit dark:shadow-black-night dark:border-black-night dark:bg-gray-22 top-12 left-2 z-10">
				<SelectFieldButton
					searchCiteria={searchCiteria as any}
					setSearchCriteria={setSearchCriteria as any}
					step={step}
					setStep={setStep}
				/>
				<SelectOperator
					searchCiteria={searchCiteria as any}
					setSearchCriteria={setSearchCriteria as any}
					step={step}
					setStep={setStep}
				/>
				<InputValue
					searchCiteria={searchCiteria as any}
					setSearchCriteria={setSearchCriteria as any}
					step={step}
					setStep={setStep}
				/>

				<div className="flex flex-row justify-between w-full mt-4 h-fit">
					<button
						onClick={() => clear()}
						className="p-2 rounded-md bg-mecury-gray dark:bg-gray-22">
						<BsTrash size={25} className="" />
					</button>

					<button
						onClick={() => addFilter()}
						className="p-2 font-bold text-white duration-200 rounded-md w-fit h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
						Add filter
					</button>
				</div>
			</div>
		</details>
	);
}

interface ComponentProps {
	searchCiteria: SearchCriteria;
	setSearchCriteria: Dispatch<SetStateAction<SearchCriteria>>;
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
}

function SelectFieldButton({
	searchCiteria,
	setSearchCriteria,
	step,
	setStep,
}: ComponentProps) {
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

	const fields = [
		{ label: "First Name", value: "firstName" },
		{ label: "Last Name", value: "lastName" },
		{ label: "Username", value: "username" },
		{ label: "Email", value: "email" },
		{ label: "Role", value: "role" },
	];

	const onSelectField = (field: string) => {
		setSearchCriteria({ field: field, operator: "~", value: "" });
		setStep(1);
		if (fieldRef.current) {
			fieldRef.current.open = false;
		}
	};

	// get the label of searchCiteria field using fields array
	const label = fields.find(
		(field) => field.value === searchCiteria?.field
	)?.label;

	return (
		<details ref={fieldRef} className="relative w-full h-fit group">
			<summary className="w-full list-none h-fit">
				<div
					className={`flex items-center justify-between w-full p-1 font-bold border-2 rounded-md hover:border-foreground-blue dark:hover:border-foreground-red hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white dark:hover:text-gray-200 group-open:bg-foreground-blue dark:group-open:bg-foreground-red group-open:text-white ${step == 0 ? "border-foreground-blue dark:border-foreground-red" : "border-gray-200 dark:border-gray-400 dark:text-gray-400"} ${searchCiteria ? "" : "text-gray-400"}`}>
					{searchCiteria ? label : "Select field"}
					<FaAngleRight size={25} className="" />
				</div>
			</summary>
			<div className="absolute w-56 bg-white border rounded-md shadow-md -top-2 left-[214px] h-fit dark:bg-pot-black dark:shadow-black-night dark:border-black-night p-2 flex flex-wrap gap-2">
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

function SelectOperator({
	searchCiteria,
	setSearchCriteria,
	step,
	setStep,
}: ComponentProps) {
	const operatorRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				operatorRef.current &&
				!operatorRef.current.contains(event.target as Node)
			) {
				operatorRef.current.open = false;
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const operators = [
		{ label: "Contain", value: "~" },
		{ label: "Not Contain", value: "!~" },
		{ label: "Equal", value: "=" },
		{ label: "Not Equal", value: "!=" },
		{ label: "Is Set", value: "isSet" },
		{ label: "Is Not Set", value: "isNotSet" },
		{ label: "Smaller", value: "<" },
		{ label: "Smaller or Equal", value: "<=" },
		{ label: "Larger", value: ">" },
		{ label: "Larger or Equal", value: ">=" },
	];

	const onSelectField = (operator: string) => {
		if (!searchCiteria) return;
		setSearchCriteria({ ...searchCiteria, operator: operator as any });
		setStep(2);
		if (operatorRef.current) {
			operatorRef.current.open = false;
		}
	};

	const open = () => {
		if (searchCiteria) return;
		if (operatorRef.current) {
			operatorRef.current.open = true;
		}
	};

	const label = operators.find(
		(field) => field.value === searchCiteria?.operator
	)?.label;

	return (
		<details
			onClick={() => open()}
			ref={operatorRef}
			className="relative w-full h-fit group">
			<summary className="w-full list-none h-fit">
				<div
					className={`flex items-center justify-between w-full p-1 font-bold border-2 rounded-md hover:border-foreground-blue dark:hover:border-foreground-red hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white dark:hover:text-gray-200 group-open:bg-foreground-blue dark:group-open:bg-foreground-red group-open:text-white ${step == 1 ? "border-foreground-blue dark:border-foreground-red" : "border-gray-200 dark:border-gray-400 dark:text-gray-400"} ${searchCiteria ? "" : "text-gray-400"}`}>
					{searchCiteria ? label : "Select Operator"}
					<FaAngleRight size={25} className="" />
				</div>
			</summary>
			<div className="absolute w-72  bg-white border rounded-md shadow-md -top-2 left-[214px] h-fit dark:bg-pot-black dark:shadow-black-night dark:border-black-night p-2 flex flex-wrap gap-2">
				{operators.map((operator, index) => {
					return (
						<div
							key={index}
							onClick={() => onSelectField(operator.value)}
							className="flex flex-row items-center justify-center h-full p-1 font-bold text-black duration-200 border-2 rounded-md w-fit hover:text-white dark:text-gray-200 borde-0 whitespace-nowrap hover:bg-foreground-blue dark:hover:bg-foreground-red border-foreground-blue dark:border-foreground-red">
							{operator.label}
						</div>
					);
				})}
			</div>
		</details>
	);
}

function InputValue({
	searchCiteria,
	setSearchCriteria,
	step,
}: ComponentProps) {
	const onChangeValue = (value: string) => {
		if (!searchCiteria) return;
		setSearchCriteria({ ...searchCiteria, value: value });
	};

	return (
		<input
			onChange={(e) => {
				e.preventDefault();
				onChangeValue(e.target.value);
			}}
			value={searchCiteria?.value || ""}
			type="text"
			disabled={step != 2}
			className={`${step == 2 ? "border-foreground-blue dark:border-foreground-red" : "border-gray-200 dark:border-gray-400 focus:border-foreground-blue dark:focus:border-foreground-red"} w-full p-1 border-2 rounded-md outline-none h-fit ring-0 focus:ring-1 focus:ring-foreground-blue dark:focus:ring-foreground-red font-bold dark:bg-gray-22`}
			placeholder="Value"
		/>
	);
}
