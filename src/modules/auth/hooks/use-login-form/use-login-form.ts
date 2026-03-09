import { useRouter } from "next/navigation";

import { useAction } from "@/modules/shared/hooks/use-action";
import { useForm } from "@/modules/shared/hooks/use-form";
import { useUser } from "@/modules/user/context/hooks/use-user";

import { loginAction } from "../../actions/login";
import { loginFormResolver } from "../../resolvers/login-form-resolver";
import { type LoginFormOptions, type UseLoginFormReturnValue } from "./types";

export const useLoginForm = (): UseLoginFormReturnValue => {
	const { isPending, executeAsync: login } = useAction(loginAction);
	const { setUser } = useUser();
	const router = useRouter();
	const form = useForm<LoginFormOptions>({
		initialValue: {
			username: "",
			password: "",
		},
		resolver: loginFormResolver,
	});

	const onSubmit = form.handleSubmit(async (credentials) => {
		const { data: result, serverError } = await login(credentials);

		if (serverError != undefined) {
			const type = "server_error";
			form.formState.setError({ name: "password", type, message: serverError });
			form.formState.setError({ name: "username", type });
			return;
		}

		// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
		if (result == undefined || !result.data.success) {
			const type = "unknown_error";
			form.formState.setError({ name: "username", type });
			form.formState.setError({
				name: "password",
				type,
				message: "An error occured",
			});
			return;
		}
		form.formState.clear();
		setUser(result.data.user);
		router.push("/");
	});

	return {
		...form,
		onSubmit,
		isPending,
	};
};
