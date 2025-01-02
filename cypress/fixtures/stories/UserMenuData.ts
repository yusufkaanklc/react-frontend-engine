import type { IUserMenuData } from "@/interfaces/components/navbar/INavbar";
import { icons } from "@/plugins/Icons";

export const userMenuData: IUserMenuData = {
	username: "John Doe",
	email: "john.doe@example.com",
	avatar: "./cypress/fixtures/images/man2.webp",
	menus: [
		{
			text: "Notifications",
			icon: icons.outline.bell,
			action: "/notifications",
		},
		{
			text: "Settings",
			icon: icons.outline.dollar,
			action: "/settings",
		},
	],
};
