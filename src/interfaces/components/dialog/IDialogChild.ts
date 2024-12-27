import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig";
import type { ReactNode } from "react";

export interface IDialogChild {
	styleClass?: ICustomStylesConfig;
	children: ReactNode;
	className?: string;
}
