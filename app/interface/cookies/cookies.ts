import Cookies from "js-cookie";

export const getSid = () => {
	const sid = Cookies.get("sid");
	const gid = Cookies.get("gid");
	if (sid) {
		Cookies.remove("gid");
		return sid;
	}
	return gid;
};

export const getIsLogin = () => {
	const isLogin = Cookies.get("isLogin");
	return isLogin === "true";
};

export const setLogin = (isLogin: boolean) => {
	Cookies.set("isLogin", isLogin);
};

export const deleteSid = () => {
	Cookies.remove("sid");
	Cookies.remove("gid");
};
