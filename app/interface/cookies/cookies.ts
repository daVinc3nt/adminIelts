import Cookies from "js-cookie";

export const getSid = () => {
	return Cookies.get("sid");
};

export const getIsLogin = () => {
	return Cookies.get("isLogin");
};
