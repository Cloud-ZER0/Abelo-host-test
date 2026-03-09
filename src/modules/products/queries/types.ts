export interface QueryResponseSuccess<T> {
	success: true;
	items: T;
}

export interface QueryResponseError {
	success: false;
	message: string;
}
