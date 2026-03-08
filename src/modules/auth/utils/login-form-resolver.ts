import {
	type FormFieldError,
	type UseFormOptions,
} from "@/modules/shared/hooks/use-form";

import { type LoginFormOptions } from "../hooks/use-login-form";

type ResloverType = UseFormOptions<LoginFormOptions>["resolver"];
type ErrorType = FormFieldError<LoginFormOptions>;

export const loginFormResolver: ResloverType = ({ formData }) => {
	const errors: ErrorType[] = [];

	if (formData.username.length === 0) {
		errors.push({
			name: "username",
			type: "required",
			message: "This field is required",
		});
	}

	if (formData.password.length === 0) {
		errors.push({
			name: "password",
			type: "required",
			message: "This field is required",
		});
	}

	if (formData.username.length < 3) {
		errors.push({
			name: "username",
			type: "min-length",
			message: "Atleast 3 characters",
		});
	}

	if (formData.password.length < 3) {
		errors.push({
			name: "password",
			type: "min-length",
			message: "Atleast 3 characters",
		});
	}

	return errors;
};
