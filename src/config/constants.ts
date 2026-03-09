export type NAVIGATION_LINK_NAME = "login" | "main";

export type NAVIGATION_LINKS_T = Record<
	NAVIGATION_LINK_NAME,
	{ title: string; href: string }
>;

export const NAVIGATION_LINKS: NAVIGATION_LINKS_T = {
	login: {
		href: "/login",
		title: "login",
	},
	main: {
		href: "/",
		title: "main",
	},
};

export const BASE_PRODUCTS_LIMIT = 12;

export const COOKIE_ACCSESS_TOKEN = "accessToken";
export const COOKIE_REFRESH_TOKEN = "refreshToken";

export const BASE_ACCESS_TOKEN_EXPIRES = 30;
