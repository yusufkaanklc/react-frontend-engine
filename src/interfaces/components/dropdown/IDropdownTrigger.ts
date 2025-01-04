import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import type { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from "react";

export interface IDropdownTrigger extends HTMLAttributes<HTMLButtonElement> {
	isOpen?: boolean;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
	styleClass?: ICustomStylesConfig;
	children: ReactNode | string;
}
