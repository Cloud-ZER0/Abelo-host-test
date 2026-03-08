import { type ChangeEvent, type SubmitEvent } from "react";

type InputChangeEvent = ChangeEvent<HTMLInputElement, HTMLInputElement>;

export type FormFieldValues<Form> = Record<keyof Form, string>;

export interface FormFieldError<T extends object> {
	name: keyof T;
	type: string;
	message?: string;
}

export interface UseFormOptions<Form extends object> {
	initialValue: Form;
	resolver: ({
		formData,
	}: {
		formData: FormFieldValues<Form>;
	}) => FormFieldError<Form>[];
}

export interface RegisterOptions<Form extends object> {
	name: keyof Form;
}

export interface RegisterReturnValue {
	onChange: (e: InputChangeEvent) => void;
	value: string;
}

export type HandleSubmitOptions<Form> = (
	formData: FormFieldValues<Form>,
) => void | Promise<void>;

export type HandleSubmitResult = (
	e: SubmitEvent<HTMLFormElement>,
) => void | Promise<void>;

export type FormError<Form> = Record<
	keyof Form,
	| {
			type: string;
			message?: string;
	  }[]
	| undefined
>;

export interface UseFormResult<Form extends object> {
	register: ({ name }: RegisterOptions<Form>) => RegisterReturnValue;
	formState: {
		errors: FormError<Form>;
		values: FormFieldValues<Form>;
		setError: (value: FormFieldError<Form>) => void;
		clear: (value?: { name: keyof Form }) => void;
	};
	handleSubmit: (callback: HandleSubmitOptions<Form>) => HandleSubmitResult;
}
