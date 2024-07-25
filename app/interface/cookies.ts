import Cookies from "js-cookie";

export const getSid = () => {
	Cookies.set(
		"testsid",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MmU4MWRkLTIzMWEtNDFhNi1iOWVjLTM5NTY3Nzc3ODcxNyIsInJvbGVzIjpbXSwiaWF0IjoxNzIxODk4MDIwLCJleHAiOjE3NTM0MzQwMjB9.9Ut8K9PDmQt8hBgWYgxHbtvbwO6TICtqmMvhOTdkSac"
	);
	return Cookies.get("testsid");
};
