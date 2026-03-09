"use server";

import { axiosClient, type UserResponose } from "@/config/axios";
import { getErrorMsg } from "@/config/axios/helpers";
import { BASE_ACCESS_TOKEN_EXPIRES } from "@/config/constants";
import { type User } from "@/modules/user/store/user-store";

import { setUserCookies } from "../utils/set-user-cookies";

export interface LoginActionOptions {
	username: string;
	password: string;
}

export interface LoginActionResponse {
	user?: User;
}

export const loginAction = async ({
	username,
	password,
}: LoginActionOptions): Promise<LoginActionResponse> => {
	try {
		const { data } = await axiosClient.post<UserResponose>("/auth/login", {
			username,
			password,
			expiresInMins: BASE_ACCESS_TOKEN_EXPIRES,
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
	} catch (error) {
		throw new Error(getErrorMsg(error));
	}
};
