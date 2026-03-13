import { type ActionError } from "@/config/axios";

export interface QueryResponseSuccess<T> {
	success: true;
	items: T;
}

export type QueryResponseError = ActionError;
