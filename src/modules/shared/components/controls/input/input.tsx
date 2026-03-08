import { clsx } from "clsx";
import { type InputHTMLAttributes, type Ref } from "react";

import styles from "./input.module.scss";

export type InputVariant = "default" | "error";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	ref?: Ref<HTMLInputElement>;
	variant?: InputVariant;
}

export function Input({
	ref,
	className,
	variant = "default",
	...props
}: InputProps) {
	const variantClass = clsx({
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		[styles.variantDefault!]: variant === "default",
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		[styles.variantError!]: variant === "error",
	});

	return (
		<input
			ref={ref}
			className={clsx(styles.root, variantClass, className)}
			{...props}
		/>
	);
}
