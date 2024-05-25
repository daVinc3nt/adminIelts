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
				"174": "43rem",
				"176": "44rem",
				"180": "45rem",
				"192": "48rem",
			},
			colors: {
				primary: "#F8F9FA",
			},
		},
	},
	plugins: [],
};
export default config;
