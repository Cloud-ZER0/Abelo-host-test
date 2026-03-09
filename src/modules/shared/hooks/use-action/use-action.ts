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
			const result: ActionData<ReturnValue> = {
				data: undefined,
				serverError: undefined,
			};
			setIsPending(true);
			try {
				const response = await action(args);

				if (
					typeof response === "object" &&
					response != null &&
					"data" in response
				) {
					const { data } = response as {
						data: { success: boolean; message: string };
					};
					if (!data.success) {
						result.serverError = data.message;
					} else {
						result.data = response;
					}
				} else {
					result.data = response;
				}
			} catch (error) {
				result.serverError =
					error instanceof Error
						? error.message
						: "An unexpected error occurred";
			} finally {
				setIsPending(false);
			}
			return result;
		},

		[action],
	);

	return {
		isPending,
		executeAsync,
	};
};
