import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { baseURL, type RefreshTokenResponse } from "./config/axios";
import {
	BASE_ACCESS_TOKEN_EXPIRES,
	COOKIE_ACCSESS_TOKEN,
	COOKIE_REFRESH_TOKEN,
} from "./config/constants";

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get(COOKIE_ACCSESS_TOKEN)?.value;
	const refreshToken = request.cookies.get(COOKIE_REFRESH_TOKEN)?.value;

	const { pathname } = request.nextUrl;

	if (accessToken != undefined && pathname === "/login") {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (accessToken == undefined && refreshToken == undefined) {
		return NextResponse.next();
	}

	if (accessToken == undefined) {
		try {
			const res = await fetch(`${baseURL}/auth/refresh`, {
				method: "POST",
				body: JSON.stringify({ refreshToken }),
				headers: { "Content-Type": "application/json" },
			});

			const data = (await res.json()) as RefreshTokenResponse;

			const response = NextResponse.next();

			response.cookies.set(COOKIE_ACCSESS_TOKEN, data.accessToken, {
				httpOnly: true,
				maxAge: 60 * BASE_ACCESS_TOKEN_EXPIRES,
				path: "/",
			});
			response.cookies.set(COOKIE_REFRESH_TOKEN, data.refreshToken, {
				httpOnly: true,
				path: "/",
			});

			request.cookies.set(COOKIE_ACCSESS_TOKEN, data.accessToken);

			return response;
		} catch {
			const response = NextResponse.next();
			response.cookies.delete(COOKIE_ACCSESS_TOKEN);
			response.cookies.delete(COOKIE_REFRESH_TOKEN);
			return response;
		}
	}

	return NextResponse.next();
}
