import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import type { ReactNode } from "react";

export type IDialogTypes = "modal" | "drawer";

export interface IDialogStyles {
	dialog?: ICustomStylesConfig;
	header?: ICustomStylesConfig;
	body?: ICustomStylesConfig;
	action?: ICustomStylesConfig;
};

export interface IDialog {
	id: string;
	size?: ISize;
	closeToClickOutside?: boolean;
	children?: ReactNode;
	styleClass?:IDialogStyles
	className?: string;
	type?: IDialogTypes;
	isOpen?: boolean;
	onOpened?: () => void;
	onClosed?: () => void;
}
