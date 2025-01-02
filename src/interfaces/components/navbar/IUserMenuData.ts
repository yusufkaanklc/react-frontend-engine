import type { ReactNode } from "react";

export interface IUserMenu {
	icon: ReactNode | string;
	text: string;
	action: string | (() => void);
}

export type IUserMenuData = {
	username: string;
	avatar?: string;
	email: string;
	menus: IUserMenu[];
};
