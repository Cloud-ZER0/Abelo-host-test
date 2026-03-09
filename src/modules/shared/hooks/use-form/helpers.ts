export function createTypedRecord<T extends object>(
	obj: T,
): Record<keyof T, string> {
	const result: Record<string, string> = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			result[key] = String(obj[key]);
		}
	}

	return result as Record<keyof T, string>;
}
