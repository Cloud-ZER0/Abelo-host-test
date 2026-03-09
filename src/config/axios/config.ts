import axios from "axios";

import { getEnv } from "../env";

export const baseURL = getEnv("NEXT_PUBLIC_BACKEND_URL").required().asString();

export const axiosClient = axios.create({
	baseURL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});
