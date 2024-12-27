import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import type { ReactNode } from "react";

export type IDialogTypes = "modal" | "drawer";

export interface IDialog {
	id: string;
	size?: ISize;
	closeToClickOutside?: boolean;
	children?: ReactNode;
	styleClass?: {
		dialog?: ICustomStylesConfig;
		dialogHeader?: ICustomStylesConfig;
		dialogBody?: ICustomStylesConfig;
		dialogAction?: ICustomStylesConfig;
	};
	className?: string;
	type?: IDialogTypes;
	isOpen?: boolean;
	onOpened?: () => void;
	onClosed?: () => void;
}
