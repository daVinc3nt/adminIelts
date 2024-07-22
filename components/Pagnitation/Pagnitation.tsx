import {
	createTheme,
	Pagination as MuiPagination,
	ThemeProvider,
} from "@mui/material";
import { create } from "domain";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface PaginationProps {
	numberOfPages: number;
	page: number;
	handleChangePage: (
		event: React.ChangeEvent<unknown>,
		value: number
	) => void;
}

export default function Pagination({
	numberOfPages,
	page,
	handleChangePage,
}: PaginationProps) {
	const { theme } = useTheme();
	const [isDark, setIsDark] = useState<boolean>(false);

	useEffect(() => {
		setIsDark(theme === "dark");
	}, [theme]);

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
		},
	});

	const lightTheme = createTheme({});

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<MuiPagination
				count={numberOfPages}
				page={page}
				variant="outlined"
				shape="rounded"
				onChange={handleChangePage}
			/>
		</ThemeProvider>
	);
}
