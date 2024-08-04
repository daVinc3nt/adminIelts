export default function MenuBar() {
	return (
		<div className="flex w-full flex-row gap-2 cursor-pointer">
			<span className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				Save & exit
			</span>
			<span className="px-1 rounded-md hover:text-white dark:hover:bg-foreground-red hover:bg-foreground-blue">
				Save
			</span>
		</div>
	);
}
