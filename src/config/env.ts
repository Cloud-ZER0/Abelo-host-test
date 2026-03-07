import envVar, { type ExtensionFn } from "env-var";

const asIntStrictlyPositive: ExtensionFn<number> = (value) => {
	const n = Number.parseInt(value, 10);

	if (Number.isNaN(n) || n.toString(10) !== value) {
		throw new Error("should be a valid integer");
	}

	if (n <= 0) {
		throw new Error("should be a strictly positive integer (> 0)");
	}

	return n;
};

// eslint-disable-next-line import-x/no-named-as-default-member
const env = envVar.from(
	Object.fromEntries(Object.entries(process.env).filter(([, v]) => v !== "")),
	{
		asIntStrictlyPositive,
	},
);

export const getEnv = env.get.bind(env);
