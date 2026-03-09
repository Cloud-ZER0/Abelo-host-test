"use server";

import { cookies } from "next/headers";

import { type UserResponose } from "@/config/axios";
import { axiosClient } from "@/config/axios/config";
import { getErrorMsg } from "@/config/axios/helpers";
import { COOKIE_ACCSESS_TOKEN } from "@/config/constants";
import { type User } from "@/modules/user/store/user-store";

export interface AuthActionResponse {
	success: boolean;
	message?: string;
	user?: User;
}

export const authAction = async (): Promise<AuthActionResponse> => {
	try {
		const cookiesStore = await cookies();

		const token = cookiesStore.get(COOKIE_ACCSESS_TOKEN);

		if (token == undefined) {
			return {
				success: false,
				message: "No accessToken was found",
			};
		}

		const { data } = await axiosClient.get<UserResponose>("/auth/me", {
			headers: {
				Authorization: `Bearer ${token.value}`,
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
		const message = getErrorMsg(error);

		return {
			success: false,
			message,
		};
	}
};
