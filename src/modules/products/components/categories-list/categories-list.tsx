import { clsx } from "clsx";
import Link from "next/link";
import React from "react";

import { type ProductCategory } from "@/config/axios";

import { NotFound } from "../not-found";

import styles from "./categories-list.module.scss";

export interface ProductCategoriesListProps {
	className?: string;
	categories?: ProductCategory[];
}

export const CategoriesList = ({
	categories,
	className,
}: ProductCategoriesListProps) => {
	return (
		<NotFound items={categories} text="Categories not found">
			{({ items }) => (
				<div className={clsx(styles.root, className)}>
					{items.map((item, key) => (
						<Link className={styles.item} key={key} href={`/${item.slug}`}>
							{item.name}
						</Link>
					))}
				</div>
			)}
		</NotFound>
	);
};
