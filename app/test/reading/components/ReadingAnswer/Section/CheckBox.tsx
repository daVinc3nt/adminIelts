interface CheckBoxProps {
	checked: boolean;
}

export default function CheckBox({ checked }: CheckBoxProps) {
	return (
		<input
			type="checkbox"
			checked={checked}
			readOnly
			className="w-4 h-4 cursor-pointer appearance-none rounded-full border-2 border-red-200 duration-300 checked:border-red-200 checked:bg-red-500"
		/>
	);
}
