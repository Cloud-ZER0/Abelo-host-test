import React from "react";

import { CategoriesList } from "../../components/categories-list";
import { ErrorHandler } from "../../components/error-handler";
import { ProductsList } from "../../components/products-list";
import { getCategoriesQuery } from "../../queries/get-categories";
import { getProductsQuery } from "../../queries/get-products";

import styles from "./producst-page.module.scss";

interface Params {
	params: Promise<{ slug?: string }>;
}

export const ProductsPage = async ({ params }: Params) => {
	const { slug } = await params;

	const [{ data: maybeProducts }, { data: maybeCategories }] =
		await Promise.all([getProductsQuery({ slug }), getCategoriesQuery()]);

	return (
		<main className={styles.main}>
			<ErrorHandler data={maybeCategories}>
				{({ data: categories }) => <CategoriesList categories={categories} />}
			</ErrorHandler>
			<ErrorHandler data={maybeProducts}>
				{({ data: products }) => <ProductsList products={products} />}
			</ErrorHandler>
		</main>
	);
};
