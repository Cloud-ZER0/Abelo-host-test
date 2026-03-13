"use server";

import { axiosClient, type ActionError, type UserResponse } from "@/config/axios";
import { getErrorMsg } from "@/config/axios/helpers";
import { BASE_ACCESS_TOKEN_EXPIRES } from "@/config/constants";
import { type User } from "@/modules/user/store/user-store";

import { setUserCookies } from "../utils/set-user-cookies";

export interface LoginActionOptions {
	username: string;
	password: string;
}

interface ActionSuccess {
	success: true;
	user: User;
}

export interface LoginActionResponse {
	data: ActionSuccess | ActionError;
}

export const loginAction = async ({
	username,
	password,
}: LoginActionOptions): Promise<LoginActionResponse> => {
	try {
		const { data } = await axiosClient.post<UserResponse>("/auth/login", {
			username,
			password,
			expiresInMins: BASE_ACCESS_TOKEN_EXPIRES,
		});

		await setUserCookies({
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
		});

		return {
			data: {
				success: true,
				user: {
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
				},
			},
		};
	} catch (error) {
		return {
			data: {
				success: false,
				message: getErrorMsg(error),
			},
		};
	}
};
