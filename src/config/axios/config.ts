import { getEnv } from "../env";

export const backendUrl = getEnv("NEXT_PUBLIC_BACKEND_URL")
	.required()
	.asString();

export const cookieAccessToken = getEnv("COOKIE_ACCESS_TOKEN")
	.required()
	.asString();
export const cookieRefreshToken = getEnv("COOKIE_REFRESH_TOKEN")
	.required()
	.asString();
