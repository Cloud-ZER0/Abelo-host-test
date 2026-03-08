import { useAction } from "@/modules/shared/hooks/use-action";
import { useForm } from "@/modules/shared/hooks/use-form";

import { loginAction } from "../../actions/login-action";
import { loginFormResolver } from "../../utils";
import { type LoginFormOptions, type UseLoginFormReturnValue } from "./types";

export const useLoginForm = (): UseLoginFormReturnValue => {
	const { isPending, executeAsync: login } = useAction({ action: loginAction });

	const form = useForm<LoginFormOptions>({
		initialValue: {
			username: "",
			password: "",
		},
		resolver: loginFormResolver,
	});

	console.log("@@", form.formState.errors);

	const onSubmit = form.handleSubmit(async (credentials) => {
		const { data, serverError } = await login(credentials);

		form.formState.clear();

		if (serverError != undefined) {
			const type = "server_error";
			form.formState.setError({ name: "password", type, message: serverError });
			form.formState.setError({ name: "username", type });
			return;
		}

		if (data?.user == undefined) {
			const type = "unknown_error";
			form.formState.setError({ name: "username", type });
			form.formState.setError({
				name: "password",
				type,
				message: "an error occured",
			});
			return;
		}
	});

	return {
		...form,
		onSubmit,
		isPending,
	};
};
