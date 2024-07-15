"use client";
import { useRef, useState } from "react";
import Select from "@/components/Select/Select";

import {
	BarPlot,
	ChartsAxisHighlight,
	ChartsTooltip,
	ChartsXAxis,
	ChartsYAxis,
	HighlightedContext,
	LinePlot,
	PiePlot,
	ResponsiveChartContainer,
	pieArcLabelClasses,
} from "@mui/x-charts";

export default function Home() {
	const [searchValue, setSearchValue] = useState<string>("");
	const [selectedValue, setSelectedValue] = useState<string>("All");
	const [currentTest, setCurrentTest] = useState<number>(-1);
	const svgRef = useRef<SVGSVGElement>(null);

	return (
		<div className="flex h-fit p-4 bg-gray-100 items-center justify-center">
			<div className="flex flex-col w-11/12 h-full gap-4 items-center overflow-auto">
				<div className="flex w-full gap-8 h-fit">
					<span className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">
						IELTS TEST MANAGEMENT
					</span>
				</div>

				<div className="grid w-full h-fit grid-cols-12 gap-8">
					<div className="w-full h-full col-span-2">
						<Select
							input={selectedValue}
							onChangeInput={setSelectedValue}
							option={selectOption}
						/>
					</div>
					<div className="w-full h-full col-span-6 col-start-4"></div>
				</div>

				<div className="flex flex-row h-112 w-full gap-8 overflow-auto">
					<div className="w-96 h-full bg-white border rounded-lg shadow-md">
						<ResponsiveChartContainer
							colors={["#f87171"]}
							series={[
								{
									arcLabel: (item) => `${item.value}`,
									type: "pie",
									data: data as any,
									highlightScope: {
										faded: "global",
										highlighted: "item",
									},
									faded: {
										innerRadius: 10,
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
							}}>
							<PiePlot />
							<ChartsTooltip />
						</ResponsiveChartContainer>
					</div>
				</div>

				<div className="flex w-full h-128 p-4 bg-white rounded-lg shadow-md border">
					<ResponsiveChartContainer
						colors={["#f87171"]}
						series={[
							{
								type: "line",
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
						<LinePlot />
						<ChartsTooltip />
						<ChartsXAxis
							label="Question number"
							position="bottom"
						/>
						<ChartsYAxis label="Wrong frequency" position="left" />
						<ChartsAxisHighlight />
					</ResponsiveChartContainer>
				</div>
			</div>
		</div>
	);
}
const selectOption = [
	{ value: "All", label: "All" },
	{ value: "Reading Test", label: "Reading Test" },
	{ value: "Listening Test", label: "Listening Test" },
	{ value: "Speaking Test", label: "Speaking Test" },
	{ value: "Writing Test", label: "Writing Test" },
];

const data = [
	{ label: "RA =< 10", value: 30 },
	{ label: "10 < RA <= 20", value: 300 },
	{ label: "20 < RA <= 30", value: 350 },
	{ label: "30 < RA <= 40", value: 200 },
];

const generateXlabels = () => {
	const xLabels = [];
	for (let i = 0; i < wrongFreqData.length; i++) {
		xLabels.push(`Question ${i + 1}`);
	}
	return xLabels;
};

const wrongFreqData = [
	1, 5, 1, 3, 4, 6, 9, 4, 10, 20, 12, 17, 13, 7, 2, 3, 10, 18, 0, 1, 13, 16,
	15, 14, 13, 12, 7, 10, 9, 4, 16, 15, 19, 10, 12, 17, 20, 20, 41, 30,
];
