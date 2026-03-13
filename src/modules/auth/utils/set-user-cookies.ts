"use server";

import { cookies } from "next/headers";

import {
	BASE_ACCESS_TOKEN_EXPIRES,
	COOKIE_ACCESS_TOKEN,
	COOKIE_REFRESH_TOKEN,
} from "@/config/constants";

export interface SetUserCookiesOptions {
	accessToken: string;
	refreshToken: string;
}

export const setUserCookies = async ({
	accessToken,
	refreshToken,
}: SetUserCookiesOptions) => {
	const cookiesStore = await cookies();
	cookiesStore.set(COOKIE_ACCESS_TOKEN, accessToken, {
		maxAge: 60 * BASE_ACCESS_TOKEN_EXPIRES,
		httpOnly: true,
		path: "/",
	});
	cookiesStore.set(COOKIE_REFRESH_TOKEN, refreshToken, {
		httpOnly: true,
		path: "/",
	});
};
