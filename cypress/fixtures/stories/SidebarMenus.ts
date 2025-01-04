import type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu";
import { icons } from "@/plugins/Icons";

export const sidebarMenus: ISidebarMenu[] = [
	{
		text: "Dashboard",
		isLabel: true,
		icon: icons.outline.home,
	},
	{
		text: "Dashboard",
		icon: icons.outline.home,
		action: "/dashboard",
	},
	{
		text: "Users",
		icon: icons.outline.dollar,
		action: "/users",
		children: [
			{
				text: "User List",
				action: "/users/list",
			},
			{
				text: "New User",
				action: "/users/add",
			},
		],
	},
];
