import { type AxiosError } from ".";

export const getErrorMsg = (error: unknown): string => {
	if (typeof error === "object" && error != null && "isAxiosError" in error) {
		const axiosError = error as AxiosError;
		if (axiosError.response.status === 401) {
			return "Incorrect email or password";
		}

		if (axiosError.code === "ERR_NETWORK") {
			return "Network error. Check your internet connection.";
		}

		if (axiosError.code === "ECONNABORTED") {
			return "The server timed out waiting for a response.";
		}

		return axiosError.response.data?.message ?? "An error occured";
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "An error occured";
};
