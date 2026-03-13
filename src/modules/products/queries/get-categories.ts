"use server";

import {
	axiosClient,
	getErrorMsg,
	type CategoriesResponse,
	type ProductCategory,
} from "@/config/axios";

import { type QueryResponseError, type QueryResponseSuccess } from "./types";

export interface GetCategoriesQuery {
	data: QueryResponseSuccess<ProductCategory[]> | QueryResponseError;
}

export const getCategoriesQuery = async (): Promise<GetCategoriesQuery> => {
	try {
		const { data } = await axiosClient.get<CategoriesResponse>(
			"/products/categories",
		);

		return {
			data: {
				success: true,
				items: data,
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
