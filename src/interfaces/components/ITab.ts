import type { ISize } from "@/interfaces/types/IMetrics";

export interface ITabItem {
	value: string;
	label: string;
}

export interface ITab {
	direction?: "horizontal" | "vertical";
	tabs: ITabItem[];
	size?: ISize;
	className?: string;
	selectedTab: string;
	onChange?: (selectedTab: string) => void;
}
