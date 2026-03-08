export interface UseActionOptions<Args, ReturnValue> {
	action: (arg: Args) => Promise<ReturnValue>;
}

export interface ActionData<ReturnValue> {
	data?: ReturnValue;
	serverError?: string;
}

export interface UseActionResult<Args, ReturnValue> {
	executeAsync: (arg: Args) => Promise<ActionData<ReturnValue>>;
	isPending: boolean;
}
