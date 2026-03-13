"use server";

import { cookies } from "next/headers";

import { type UserResponse } from "@/config/axios";
import { axiosClient } from "@/config/axios/config";
import { getErrorMsg } from "@/config/axios/helpers";
import { COOKIE_ACCESS_TOKEN } from "@/config/constants";
import { type User } from "@/modules/user/store/user-store";

export interface AuthActionResponse {
	success: boolean;
	message?: string;
	user?: User;
}

export const authAction = async (): Promise<AuthActionResponse> => {
	const cookiesStore = await cookies();
	const token = cookiesStore.get(COOKIE_ACCESS_TOKEN)?.value;

	try {
		const { data } = await axiosClient.get<UserResponse>("/auth/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return {
			success: true,
			user: {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
			},
		};
	} catch (error) {
		return {
			success: false,
			message: getErrorMsg(error),
		};
	}
};
