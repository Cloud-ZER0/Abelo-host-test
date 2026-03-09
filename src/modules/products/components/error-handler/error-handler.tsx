import { clsx } from "clsx";
import React from "react";

import {
	type QueryResponseError,
	type QueryResponseSuccess,
} from "../../queries/types";

import styles from "./error-handler.module.scss";

export interface ErrorHandlerProps<T> {
	data: QueryResponseSuccess<T> | QueryResponseError;
	children: ({ data }: { data: T }) => React.ReactNode;
	className?: string;
	customInfoComponent?: React.ReactNode;
}

export const ErrorHandler = <T,>({
	children,
	data,
	className,
	customInfoComponent,
}: ErrorHandlerProps<T>) => {
	if (!data.success) {
		return (
			customInfoComponent ?? (
				<h1 className={clsx(styles.root, className)}>{data.message}</h1>
			)
		);
	}

	return <>{children({ data: data.items })}</>;
};
