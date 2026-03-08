"use server";

import { cookies } from "next/headers";

import { axiosClinet } from "@/config/axios/axios";
import * as config from "@/config/axios/config";

import {
	type LoginActionResult,
	type LoginUserOptions,
	type SetUserCookiesOptions,
	type UserResponose,
} from "./login-action.types";

const setUserCookies = async ({
	accessToken,
	refreshToken,
}: SetUserCookiesOptions) => {
	const cookiesStore = await cookies();

	cookiesStore.set(config.cookieAccessToken, accessToken);
	cookiesStore.set(config.cookieRefreshToken, refreshToken);
};

export const loginAction = async ({
	username,
	password,
}: LoginUserOptions): Promise<LoginActionResult> => {
	try {
		const { data } = await axiosClinet.post<UserResponose>("/auth/login", {
			username,
			password,
			expiresInMins: 30,
		});

		await setUserCookies({
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
		});

		return {
			user: {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
			},
		};
	} catch {
		throw new Error("An erorr occured");
	}
};
