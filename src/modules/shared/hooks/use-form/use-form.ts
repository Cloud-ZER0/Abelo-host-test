"use client";

import { useCallback, useState } from "react";

import {
	type FormError,
	type FormFieldValues,
	type UseFormOptions,
	type UseFormResult,
} from "./types";
import { createTypedRecord } from "./use-form.helpers";

export const useForm = <Form extends object>({
	resolver,
	initialValue,
}: UseFormOptions<Form>): UseFormResult<Form> => {
	const [form, setForm] = useState<FormFieldValues<Form>>(
		createTypedRecord(initialValue),
	);

	const [wasValidated, setWasValidated] = useState(false);

	const [formErrors, setFormErrors] = useState<FormError<Form>>(
		{} as FormError<Form>,
	);

	const validateField = useCallback(
		(name: keyof Form, value: string) => {
			const errors = resolver({ formData: { ...form, [name]: value } });
			const fieldErrors = errors.filter((error) => error.name === name);

			setFormErrors((prev) => ({
				...prev,
				[name]: fieldErrors.length > 0 ? fieldErrors : undefined,
			}));
		},
		[resolver, form],
	);

	const register: UseFormResult<Form>["register"] = useCallback(
		({ name }) => {
			return {
				value: form[name],
				onChange(e) {
					if (wasValidated) {
						validateField(name, e.target.value);
					}

					setForm((form) => {
						return { ...form, [name]: e.target.value };
					});
				},
			};
		},
		[form, validateField, wasValidated],
	);

	const handleSubmit: UseFormResult<Form>["handleSubmit"] = (callback) => {
		return async (e) => {
			e.preventDefault();

			setFormErrors({} as FormError<Form>);

			const validationResult = resolver({ formData: form });

			if (validationResult.length > 0) {
				setFormErrors((formErrors) => {
					let temp = { ...formErrors };

					for (const { name, ...info } of validationResult) {
						if (temp[name] != undefined) {
							temp = {
								...temp,
								[name]: [
									...temp[name].filter(({ type }) => type !== info.type),
									{ ...info },
								],
							};
						} else {
							temp = { ...temp, [name]: [{ ...info }] };
						}
					}

					return { ...temp };
				});

				setWasValidated(true);

				return;
			}

			await callback(form);
		};
	};

	const clear: UseFormResult<Form>["formState"]["clear"] = useCallback(
		(value) => {
			if (value != undefined) {
				setForm((form) => ({ ...form, [value.name]: "" }));
			} else {
				setForm(createTypedRecord(initialValue));
				setWasValidated(false);
			}
		},
		[initialValue],
	);

	const setError: UseFormResult<Form>["formState"]["setError"] = useCallback(
		({ name, type, message }) => {
			setFormErrors((formErrors) => {
				if (formErrors[name] != undefined) {
					return {
						...formErrors,
						[name]: [
							...formErrors[name].filter((err) => err.type !== type),
							{ type, message },
						],
					};
				} else {
					return {
						...formErrors,
						[name]: [{ type, message }],
					};
				}
			});
		},
		[],
	);

	return {
		register,
		formState: {
			errors: formErrors,
			values: form,
			clear,
			setError,
		},

		handleSubmit,
	};
};
