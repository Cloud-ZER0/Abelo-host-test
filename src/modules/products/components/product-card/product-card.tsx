import { clsx } from "clsx";
import Image from "next/image";
import { type PropsWithChildren } from "react";

import styles from "./product-card.module.scss";

export interface ProductCardProps {
	img: string;
	title: string;
	category: string;
	price: number;
	className?: string;
}

export const ProductCard = ({
	category,
	img,
	price,
	title,
	children: button,
	className,
}: PropsWithChildren<ProductCardProps>) => {
	return (
		<div className={clsx(styles.root, className)}>
			<div className={styles.imgWrapper}>
				<Image src={img} alt={title} fill className={styles.img} />
			</div>
			<div className={styles.info}>
				<h3 className={styles.title}>{title}</h3>
				<span className={styles.category}>{category}</span>
				<span className={styles.price}>{price}$</span>
			</div>
			{button}
		</div>
	);
};
