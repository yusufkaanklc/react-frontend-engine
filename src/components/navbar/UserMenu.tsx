import { redirectNative } from "@/actions/client/RedirectNative.ts";
import { Avatar } from "@/components/Avatar";
import { IconBox } from "@/components/IconBox";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { DropdownItem } from "@/components/dropdown/DropdownItem";
import { DropdownTrigger } from "@/components/dropdown/DropdownTrigger";
import type { IDropdownStyle } from "@/interfaces/components/dropdown/IDropdown.ts";
import type { IUserMenu, IUserMenuData } from "@/interfaces/components/navbar/INavbar";
import { useTranslation } from "react-i18next";

export const UserMenu = ({ data }: { data: IUserMenuData }) => {
	const dropdownStyleConfig: IDropdownStyle = {
		trigger: {
			defaultStyleActive: false,
			customStyle: "cursor-pointer",
		},
		menu: {
			defaultStyleActive: true,
			customStyle: "mt-4",
		},
	};

	const handleMenuClick = (action: IUserMenu["action"]) => {
		if (typeof action === "string") {
			return redirectNative({ url: action, type: "internal" });
		}
		action();
	};

	const { t } = useTranslation();

	return (
		<div data-testid={"user-menu"}>
			<Dropdown size={"lg"} styleClass={dropdownStyleConfig} position={"bottom-left"}>
				<DropdownTrigger data-tooltip-id={"global-tooltip"} data-tooltip-content={t("theme.navbar.user_menu_tooltip")}>
					<Avatar image={data.avatar ?? "/media/man2.webp"} alt={"user"} />
				</DropdownTrigger>
				<DropdownItem styleClass={{ defaultStyleActive: false, customStyle: "p-3" }}>
					<h4 className={"text-h4"}>{data.username}</h4>
					<p className={"text-subtitle2"}>{data.email}</p>
				</DropdownItem>
				{data.menus.length > 0 &&
					data.menus.map((menu, index) => (
						<DropdownItem key={index.toString()}>
							<div onKeyDown={() => {}} onClick={() => handleMenuClick(menu.action)} className={"flex items-center gap-4"}>
								<IconBox>{menu.icon}</IconBox>
								<p>{t(menu.text)}</p>
							</div>
						</DropdownItem>
					))}
			</Dropdown>
		</div>
	);
};
