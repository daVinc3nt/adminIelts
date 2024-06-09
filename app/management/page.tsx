export default function Page() {
	return (
		<div className="flex w-full h-screen p-4 overflow-auto">
			<div className="flex flex-col justify-start w-full h-full gap-4 overflow-auto">
				<div className="w-full overflow-auto bg-black h-fit">
					<span className="text-6xl text-white">Bla bL</span>
				</div>
				<div className="w-full overflow-auto bg-black h-fit">
					<span className="text-6xl text-white">Bla bL</span>
				</div>
				<div className="w-full overflow-auto bg-black h-fit">
					<span className="text-6xl text-white">Bla bL</span>
				</div>
				<div className="flex flex-row flex-1 w-full gap-4 overflow-auto">
					<div className="grid w-full h-full grid-cols-12 gap-4 overflow-x-hidden">
						<div className="relative flex flex-col items-center w-full h-full col-span-7 gap-8 pb-40 overflow-y-scroll">
							{Array.from({ length: 10 }).map((_, i) => (
								<div
									key={i}
									className="flex-none w-full h-20 bg-red-400"></div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
