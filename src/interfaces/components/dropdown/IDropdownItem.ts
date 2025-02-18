import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import type { HTMLAttributes, ReactNode } from "react";

export interface IDropdownItem extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	isSelectedMenu?: boolean;
	styleClass?: ICustomStylesConfig;
}
