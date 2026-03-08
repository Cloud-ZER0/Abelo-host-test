import { clsx } from "clsx";
import { type ButtonHTMLAttributes, type ReactNode, type Ref } from "react";

import styles from "./button.module.scss";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	ref?: Ref<HTMLButtonElement>;
	className?: string;
	variant?: ButtonVariant;
	children?: ReactNode;
}

export function Button({
	ref,
	className,
	variant = "primary",
	children,
	...props
}: ButtonProps) {
	const variantClass = clsx({
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		[styles.variantPrimary!]: variant === "primary",
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		[styles.variantSecondary!]: variant === "secondary",
	});

	return (
		<button
			{...props}
			ref={ref}
			className={clsx(styles.base, variantClass, className)}
		>
			{children}
		</button>
	);
}
