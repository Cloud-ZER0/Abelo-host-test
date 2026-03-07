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
