import type { IColorVariants } from "@/interfaces/types/IMetrics";
import type { ReactNode } from "react";

export interface IAnnouncement {
	id: string;
	isClosable?: boolean;
	colorScheme?: IColorVariants;
	className?: string;
	isActive?: boolean;
	content:
		| string
		| {
				to: string;
				label: string;
		  }
		| ReactNode;
}

export interface IAnnouncementConfig {
	position?: "top" | "bottom";
	blacklist?: string[];
	list: IAnnouncement[];
}
