"use client";

import { useCallback, useState } from "react";

import {
	type ActionData,
	type UseActionOptions,
	type UseActionResult,
} from "./types";

export const useAction = <Args, ReturnValue>({
	action,
}: UseActionOptions<Args, ReturnValue>): UseActionResult<Args, ReturnValue> => {
	const [isPending, setIsPending] = useState(false);
	const [actionData, setActiondata] = useState<ActionData<ReturnValue>>({
		data: undefined,
		serverError: undefined,
	});

	const executeAsync = useCallback(
		async (args: Args): Promise<ActionData<ReturnValue>> => {
			setIsPending(true);
			try {
				const data = await action(args);
				setActiondata({ data });
			} catch {
				setActiondata({ serverError: "An server error occured" });
			} finally {
				setIsPending(false);
			}
			return actionData;
		},

		[action, actionData],
	);

	return {
		isPending,
		executeAsync,
	};
};
