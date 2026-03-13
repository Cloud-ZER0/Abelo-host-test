"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from "@/config/constants";

export const logoutAction = async (): Promise<void> => {
	const cookiesStore = await cookies();

	cookiesStore.delete(COOKIE_ACCESS_TOKEN);
	cookiesStore.delete(COOKIE_REFRESH_TOKEN);

	redirect("/login");
};
