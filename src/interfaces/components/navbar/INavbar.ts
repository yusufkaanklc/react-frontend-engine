import type { IUserMenuData } from "@/interfaces/components/navbar/IUserMenuData.ts";
import type { ReactNode } from "react";

export interface INavbar {
	userMenuData?: IUserMenuData;
	notifications?: any; //Todo bildirimler veri tipi ayarlanacak
	isThemeSwitcherActive?: boolean;
	extraComponents?: ReactNode[];
}
