import type { InputHTMLAttributes } from "react";

export interface IQuantityInput extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
	value?: number;
	min?: number;
	max?: number;
	onChange?: (value: number | string) => void;
}
