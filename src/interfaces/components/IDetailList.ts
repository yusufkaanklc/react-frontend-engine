import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import type { CSSProperties } from "react";

export interface IDetailList {
	data: IDetailListData[];
	options?: IDetailListOptions;
}

export interface IDetailListData {
	title: string;
	value: string;
}

export type IDetailListStyleClass = "detail-list" | "detail-list-item" | "detail-list-title" | "detail-list-value";

export interface IDetailListOptions {
	striped?: boolean;
	styleClass?: Record<IDetailListStyleClass, ICustomStylesConfig>;
	bordered?: boolean;
	className?: string;
	style?: CSSProperties;
}
