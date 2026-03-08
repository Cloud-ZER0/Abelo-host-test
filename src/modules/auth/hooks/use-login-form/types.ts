import {
	type HandleSubmitResult,
	type UseFormResult,
} from "@/modules/shared/hooks/use-form";

export interface LoginFormOptions {
	username: string;
	password: string;
}

export interface UseLoginFormReturnValue extends Omit<
	UseFormResult<LoginFormOptions>,
	"handleSubmit"
> {
	onSubmit: HandleSubmitResult;
	isPending: boolean;
}
