import type { ISize } from "@/interfaces/types/IMetrics.ts";
import type { HTMLAttributes } from "react";

export interface IRadioBox extends HTMLAttributes<HTMLInputElement> {
	size?: ISize;
	name: string;
	value?: any;
	checked?: boolean;
	isInvalid?: boolean;
	readOnly?: boolean;
}
