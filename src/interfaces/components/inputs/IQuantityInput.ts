import type { ISize } from "@/interfaces/types/IMetrics";
import type { InputHTMLAttributes } from "react";

export interface IQuantityInput extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size"> {
	value?: number;
	min?: number;
	isInvalid?: boolean;
	size?: ISize;
	max?: number;
	onChange?: (value: number | string) => void;
}
