"use client";

import { useState } from "react";
import { TestInfor } from "./interface";
import {
	PieChart,
	pieArcLabelClasses,
	BarChart,
	DefaultizedPieValueType,
	ResponsiveChartContainer,
	BarPlot,
	ChartsTooltip,
	ChartsXAxis,
	ChartsYAxis,
} from "@mui/x-charts";
import { motion } from "framer-motion";

interface Props {
	testInfor: TestInfor;
	gradeData: {
		label: string;
		value: number;
	}[];
	wrongFreqData: number[];
}

export default function TestDescription({
	testInfor,
	gradeData,
	wrongFreqData,
}: Props) {
	if (!testInfor) return null;

	const [currentSection, setCurrentSection] = useState<number>(0);

	const section = ["Description", "Pie Chart", "Bar Chart"];

	const Description = () => {
		return (
			<div className="flex flex-col w-full h-full">
				<div className="flex flex-row w-full gap-4 h-full">
					<div className="flex flex-col items-start justify-start w-full h-full overflow-y-scroll">
						<span className="w-full p-2 text-base h-fit">
							<b>Author: </b>
							{testInfor.author}
						</span>
						<span className="w-full p-2 text-base h-fit">
							<b>Date created: </b>
							{testInfor.dateCreated}
						</span>
						<span className="w-full p-2 text-base h-fit">
							<b>Last modified: </b>
							{testInfor.lastModified}
						</span>
						<span className="w-full p-2 text-base h-fit">
							<b>Description: </b>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Euismod in pellentesque massa
							placerat duis. Vulputate eu scelerisque felis
							imperdiet proin. Nunc vel risus commodo viverra
							maecenas accumsan lacus. At consectetur lorem donec
							massa. Adipiscing bibendum est ultricies integer
							quis auctor elit sed. Commodo ullamcorper a lacus
							vestibulum sed arcu. Sed faucibus turpis in eu. Dui
							id ornare arcu odio. Ut placerat orci nulla
							pellentesque dignissim enim sit. Adipiscing
							tristique risus nec feugiat in fermentum posuere.
							Quis lectus nulla at volutpat diam ut venenatis
							tellus in. Sed blandit libero volutpat sed cras. Ac
							tortor vitae purus faucibus ornare. Nulla
							pellentesque dignissim enim sit amet. Ultricies
							integer quis auctor elit sed vulputate mi. Metus
							vulputate eu scelerisque felis imperdiet. Augue
							mauris augue neque gravida. Sed viverra ipsum nunc
							aliquet. Tempor nec feugiat nisl pretium fusce id.
							Lacinia at quis risus sed vulputate odio ut enim
							blandit. Et odio pellentesque diam volutpat commodo.
							Vel eros donec ac odio tempor. Tortor aliquam nulla
							facilisi cras fermentum odio. Praesent semper
							feugiat nibh sed pulvinar proin gravida. Scelerisque
							felis imperdiet proin fermentum leo vel orci. Neque
							convallis a cras semper auctor. Enim neque volutpat
							ac tincidunt vitae semper quis.
						</span>
					</div>
				</div>
			</div>
		);
	};

	const PieChartComponent = () => {
		const TOTAL = gradeData
			.map((item) => item.value)
			.reduce((a, b) => a + b, 0);

		const getArcLabel = (params: DefaultizedPieValueType) => {
			const percent = params.value / TOTAL;
			return `${(percent * 100).toFixed(0)}%`;
		};

		return (
			<PieChart
				colors={[
					"#f87171",
					"#fbbf24",
					"#34d399",
					"#60a5fa",
					"#818cf8",
					"#d946ef",
				]}
				series={[
					{
						arcLabel: getArcLabel as any,
						data: gradeData,
						highlightScope: {
							faded: "global",
							highlighted: "item",
						},
						faded: {
							innerRadius: 30,
							additionalRadius: -10,
							color: "gray",
						},
					},
				]}
				sx={{
					[`& .${pieArcLabelClasses.root}`]: {
						fill: "white",
						fontWeight: "bold",
					},
				}}
				margin={{ left: -100 }}
			/>
		);
	};

	const BarChartComponent = () => {
		//Generate xLabels based on the number of questions
		const generateXlabels = () => {
			const xLabels = [];
			for (let i = 0; i < wrongFreqData.length; i++) {
				xLabels.push(`Question ${i + 1}`);
			}
			return xLabels;
		};

		return (
			<ResponsiveChartContainer
				colors={["#f87171"]}
				series={[
					{
						type: "bar",
						data: wrongFreqData as any,
						label: "Wrong frequency" as any,
					},
				]}
				xAxis={[
					{
						data: generateXlabels(),
						scaleType: "band",
					},
				]}>
				<BarPlot />
				<ChartsTooltip />
				<ChartsXAxis label="Question number" position="bottom" />
				<ChartsYAxis label="Wrong frequency" position="left" />
			</ResponsiveChartContainer>
		);
	};

	const RenderSection = () => {
		switch (currentSection) {
			case 0:
				return <Description />;
			case 1:
				return <PieChartComponent />;
			case 2:
				return <BarChartComponent />;
			default:
				return <Description />;
		}
	};

	return (
		<div className="flex flex-col flex-1 items-center bg-white border rounded-lg shadow-md overflow-hidden p-4 h-full">
			<div className="flex flex-row w-full h-fit gap-4 mb-2">
				{section.map((item, index) => {
					return (
						<div
							key={index}
							className="flex flex-col items-center justify-between w-fit h-full col-span-1 text-base font-semibold cursor-pointer gap-2"
							onClick={() => setCurrentSection(index)}>
							<span className="text-base font-semibold">
								{item}
							</span>
							{currentSection === index && (
								<motion.hr
									layoutId="bar"
									className="w-full border border-red-400"
								/>
							)}
						</div>
					);
				})}
			</div>
			<div className="w-full px-2 text-2xl font-bold h-fit">
				{testInfor.testName}
			</div>

			<div className="flex flex-col flex-1 w-full overflow-y-auto">
				<RenderSection />
			</div>

			<div className="flex justify-end w-full h-fit">
				<button className="px-4 py-1 font-semibold text-white bg-red-400 rounded-lg w-fit h-fit">
					Edit test
				</button>
			</div>
		</div>
	);
}
