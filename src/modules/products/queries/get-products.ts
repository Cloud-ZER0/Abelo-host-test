"use server";

import { getErrorMsg, type ProductsResponse } from "@/config/axios";
import { axiosClient } from "@/config/axios/config";
import { BASE_PRODUCTS_LIMIT } from "@/config/constants";

import { type ProductCardProps } from "../components/product-card";
import { mapProducts } from "../utils/map-products";
import { type QueryResponseError, type QueryResponseSuccess } from "./types";

export interface GetProductsQueryResponse {
	data: QueryResponseSuccess<ProductCardProps[]> | QueryResponseError;
}

export interface GetProductsQueryOptions {
	slug?: string;
	limit?: number;
}

export const getProductsQuery = async ({
	slug,
	limit = BASE_PRODUCTS_LIMIT,
}: GetProductsQueryOptions): Promise<GetProductsQueryResponse> => {
	const url = slug != undefined ? `/products/category/${slug}` : "/products";

	try {
		const { data } = await axiosClient.get<ProductsResponse>(url, {
			params: {
				limit,
			},
		});

		return {
			data: {
				success: true,
				items: mapProducts(data.products),
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
