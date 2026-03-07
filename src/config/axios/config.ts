import { getEnv } from "../env";

export const backendUrl = getEnv("NEXT_PUBLIC_BACKEND_URL")
	.required()
	.asString();
