"use client";

import { Button } from "@/modules/shared/components/controls/button";
import { FieldLabel } from "@/modules/shared/components/form/field-label";
import { FormInput } from "@/modules/shared/components/form/form-input";

import { useLoginForm } from "../../hooks/use-login-form";

import styles from "./loginf-form.module.scss";

export const LoginForm = () => {
	const { onSubmit, isPending, ...form } = useLoginForm();

	return (
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		<form onSubmit={onSubmit} className={styles.root}>
			<FieldLabel>
				<FormInput
					register={form.register}
					name="username"
					placeholder="username"
					errors={form.formState.errors}
				/>
			</FieldLabel>
			<FieldLabel>
				<FormInput
					register={form.register}
					placeholder="password"
					errors={form.formState.errors}
					name="password"
					type="password"
				/>
			</FieldLabel>
			<Button disabled={isPending}>Submit</Button>
		</form>
	);
};
