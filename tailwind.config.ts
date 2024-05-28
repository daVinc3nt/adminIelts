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
			animation: {
				tada: "tada 1s ease-in-out infinite",
			},
			keyframes: {
				tada: {
					"0%": { transform: "scale(1)" },
					"10%": { transform: "scale(0.9) rotate(-3deg)" },
					"20%": { transform: "scale(0.9) rotate(-3deg)" },
					"30%": { transform: "scale(1.1) rotate(3deg)" },
					"40%": { transform: "scale(1.1) rotate(-3deg)" },
					"50%": { transform: "scale(1.1) rotate(3deg)" },
					"60%": { transform: "scale(1.1) rotate(-3deg)" },
					"70%": { transform: "scale(1.1) rotate(3deg)" },
					"80%": { transform: "scale(1.1) rotate(-3deg)" },
					"90%": { transform: "scale(1.1) rotate(3deg)" },
					"100%": { transform: "scale(1) rotate(0)" },
				},
			},
			transitionTimingFunction: {
				sync: "cubic-bezier(0, 1, 0, 1)",
			},
			colors: {
				primary: "#F8F9FA",
			},
			transitionProperty: {
				"max-height": "max-height",
			},
			backgroundImage: {
				reading: "url('../public/background/reading.png')",
				listening: "url('../public/background/listening.jpg')",
				writing: "url('../public/background/writing.jpg')",
				speaking: "url('../public/background/speaking.jpeg')",
			},
		},
	},
	plugins: [],
};
export default config;