"use client";

import { useCallback, useState } from "react";

import {
	type ActionData,
	type UseActionOptions,
	type UseActionResult,
} from "./types";

export const useAction = <Args, ReturnValue>(
	action: UseActionOptions<Args, ReturnValue>,
): UseActionResult<Args, ReturnValue> => {
	const [isPending, setIsPending] = useState(false);

	const executeAsync = useCallback(
		async (args: Args): Promise<ActionData<ReturnValue>> => {
			const data: ActionData<ReturnValue> = {
				data: undefined,
				serverError: undefined,
			};
			setIsPending(true);
			try {
				const response = await action(args);
				data.data = response;
			} catch (error) {
				data.serverError =
					error instanceof Error ? error.message : "An error occured";
			} finally {
				setIsPending(false);
			}
			return data;
		},

		[action],
	);

	return {
		isPending,
		executeAsync,
	};
};
