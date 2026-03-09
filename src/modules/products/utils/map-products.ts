import { type Product } from "@/config/axios";

import { type ProductCardProps } from "../components/product-card";

export const mapProducts = (products: Product[]): ProductCardProps[] => {
	return products.map((product) => ({
		category: product.category,
		img: product.thumbnail,
		price: product.price,
		title: product.title,
	}));
};
