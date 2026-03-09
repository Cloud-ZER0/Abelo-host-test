import { clsx } from "clsx";
import React from "react";

import styles from "./not-found.module.scss";

export interface NotFoundProps<T extends object> {
	className?: string;
	text?: string;
	items?: T[];
	children: ({ items }: { items: T[] }) => React.ReactNode;
}

export const NotFound = <T extends object>({
	children,
	items,
	className,
	text,
}: NotFoundProps<T>) => {
	if (items == undefined || items.length === 0) {
		return (
			<h1 className={clsx(styles.title, className)}>
				{text ?? "Nothing found"}
			</h1>
		);
	}

	return children({ items });
};
