// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isUndefined = (value: any) => {
	return typeof value === "undefined";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isNull = (value: any) => {
	return value === null;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isEmpty = (value: any) => {
	return typeof value === "string" ? value === "" : Array.isArray(value) ? value.length === 0 : Object.keys(value).length === 0;
};
