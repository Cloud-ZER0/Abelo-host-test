import { type User } from "../store/user-store.types";

export interface LoginUserOptions {
	username: string;
	password: string;
}

export interface UserResponose {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	accessToken: string;
	refreshToken: string;
}

export interface LoginActionResult {
	user?: User;
}

export interface SetUserCookiesOptions {
	accessToken: string;
	refreshToken: string;
}
