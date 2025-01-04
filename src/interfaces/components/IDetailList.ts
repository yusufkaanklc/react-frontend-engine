import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";

export interface IDetailList {
	data: IDetailListData[];
	options?: IDetailListOptions;
}

export interface IDetailListData {
	title: string;
	value: string;
}

export type IDetailListStyleClass =
	| "detail-list-container"
	| "detail-list"
	| "detail-list-item"
	| "detail-list-title"
	| "detail-list-value";

export interface IDetailListOptions {
	striped?: boolean;
	styleClass?: Record<IDetailListStyleClass, ICustomStylesConfig>;
	bordered?: boolean;
	className?: string;
}
