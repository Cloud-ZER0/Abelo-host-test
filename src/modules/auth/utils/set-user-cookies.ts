"use server";

import { cookies } from "next/headers";

import { COOKIE_ACCSESS_TOKEN, COOKIE_REFRESH_TOKEN } from "@/config/constants";

export interface SetUserCookiesOptions {
	accessToken: string;
	refreshToken: string;
}

export const setUserCookies = async ({
	accessToken,
	refreshToken,
}: SetUserCookiesOptions) => {
	const cookiesStore = await cookies();
	cookiesStore.set(COOKIE_ACCSESS_TOKEN, accessToken);
	cookiesStore.set(COOKIE_REFRESH_TOKEN, refreshToken);
};
