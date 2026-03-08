import { clsx } from "clsx";
import { type ComponentPropsWithRef, type ReactNode } from "react";

import styles from "./fiedl-label.module.scss";

export type FieldLabelVariants = "default" | "error";

export type FieldLabelRootProps = ComponentPropsWithRef<"label"> & {
	variant?: FieldLabelVariants;
};

export function FieldLabelRoot({
	ref,
	className,
	children,
	...props
}: FieldLabelRootProps) {
	return (
		<label ref={ref} className={clsx(styles.root, className)} {...props}>
			{children}
		</label>
	);
}

export type FieldLabelTextProps = ComponentPropsWithRef<"span"> & {
	variant?: FieldLabelVariants;
};

export function FieldLabelText({
	ref,
	className,
	children,
	variant = "default",
	...props
}: FieldLabelTextProps) {
	return (
		<span
			ref={ref}
			className={clsx(
				styles.labelText,
				className,
				variant === "error" && styles.error,
			)}
			{...props}
		>
			{children}
		</span>
	);
}

export interface FieldLabelProps extends Omit<FieldLabelRootProps, "children"> {
	label?: ReactNode;
	children?: ReactNode;
}

export function FieldLabel({
	ref,
	className,
	label,
	children,
	variant,
	...props
}: FieldLabelProps) {
	return (
		<FieldLabelRoot ref={ref} className={className} {...props}>
			<FieldLabelText variant={variant}>{label}</FieldLabelText>
			{children}
		</FieldLabelRoot>
	);
}
