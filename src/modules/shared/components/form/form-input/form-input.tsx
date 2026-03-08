import { clsx } from "clsx";

import {
	type FormError,
	type RegisterReturnValue,
} from "@/modules/shared/hooks/use-form";

import { Input, type InputProps } from "../../controls/input";
import { FieldError } from "../field-error";

import styles from "./form-input.module.scss";

export type FormInputProps<T extends object> = Omit<
	InputProps,
	"variant" | "name"
> & {
	register: ({ name }: { name: keyof T }) => RegisterReturnValue;
	name: keyof T;
	errors: FormError<T>;
};

export function FormInput<T extends object>({
	className,
	errors,
	register,
	name,
	...props
}: FormInputProps<T>) {
	const hasErros = errors[name] != undefined && errors[name].length > 0;

	return (
		<div className={styles.root}>
			<Input
				className={clsx(styles.root, className)}
				variant={hasErros ? "error" : "default"}
				{...register({ name })}
				{...props}
			/>
			{hasErros && (
				<div className={styles.errors}>
					{errors[name]?.map(
						(error, key) =>
							error.message != undefined && (
								<FieldError key={key}>{error.message}</FieldError>
							),
					)}
				</div>
			)}
		</div>
	);
}
