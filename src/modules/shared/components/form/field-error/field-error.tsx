import { clsx } from "clsx";
import { type PropsWithChildren } from "react";

import styles from "./field-error.module.scss";

export interface FieldErrorProps {
	className?: string;
}

export function FieldError({
	className,
	children,
}: PropsWithChildren<FieldErrorProps>) {
	return <span className={clsx(styles.text, className)}>{children}</span>;
}
