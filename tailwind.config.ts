import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			spacing: {
				"104": "26rem",
				"112": "28rem",
				"128": "32rem",
				"144": "36rem",
				"160": "40rem",
				"176": "44rem",
			},
			colors: {
				primary: "#FFFFFF",
				"foreground-red": "#CB0000",
				"background-red": "#D8000014",
				"foreground-blue": "#160092",
				"background-blue": "#01012d",
				"pot-black": "#161616",
				"foreground-gray": "#A4A4A4",
				"background-gray": "#2729291A",
				"foreground-orange": "#F7B301",
				"background-orange": "#F7B3011A",
				"black-night": "#0F0F0F",
				"mecury-gray": "#ebebeb",
				"gray-22": "#222222",
			},
		},
	},
	darkMode: "class",
	plugins: [
		require("tailwind-scrollbar-hide"),
		require("autoprefixer"),
	],
};
export default config;