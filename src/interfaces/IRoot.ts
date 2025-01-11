import type { ILanguage } from "@/interfaces/ILanguage.ts";
import type { IAnnouncementConfig } from "@/interfaces/components/IAnnouncement";
import type { ICustomRouteObject } from "@/interfaces/plugins/ICustomRouteObject";

export interface IRootConfigs {
	pageTitlePrefix?: string;
	translations?: ILanguage[];
	isTooltipEnabled?: boolean;
	isToastEnabled?: boolean;
	isThemeEnabled?: boolean;
	isCrumbActive?: boolean;
	announcement?: IAnnouncementConfig;
}

export interface IRoot {
	routes: ICustomRouteObject[];
	configs: IRootConfigs;
}
