"use client";

import { clsx } from "clsx";

import { Button } from "@/modules/shared/components/controls/button";
import { useUser } from "@/modules/user/context/hooks/use-user";

import { NotFound } from "../not-found";
import { ProductCard, type ProductCardProps } from "../product-card";

import styles from "./products-list.module.scss";

export interface ProducstListProps {
	products?: ProductCardProps[];
	className?: string;
}

export const ProductsList = ({ products, className }: ProducstListProps) => {
	const { isAuthorized } = useUser();

	return (
		<NotFound items={products}>
			{({ items }) => (
				<section className={clsx(styles.root, className)}>
					{items.map((product, key) => (
						<ProductCard key={key} {...product}>
							{isAuthorized && <Button>Add to cart</Button>}
						</ProductCard>
					))}
				</section>
			)}
		</NotFound>
	);
};
