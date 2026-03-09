import { type ProductCardProps } from "../components/product-card";
import { type Product } from "../queries/types";

export const mapProducts = (products: Product[]): ProductCardProps[] => {
	return products.map((product) => ({
		category: product.category,
		img: product.thumbnail,
		price: product.price,
		title: product.title,
	}));
};
