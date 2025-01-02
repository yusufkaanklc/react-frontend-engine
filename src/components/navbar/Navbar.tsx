import { IconBox } from "@/components/IconBox";
import { Input } from "@/components/inputs/Input";
import { LanguageChanger } from "@/components/navbar/LanguageChanger";
import { Notifications } from "@/components/navbar/Notifications.tsx";
import { UserMenu } from "@/components/navbar/UserMenu";
import type { INavbar } from "@/interfaces/components/navbar/INavbar.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useLanguageStore } from "@/stores/LanguageStore.ts";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import classNames from "classnames";

export const Navbar = ({ extraComponents, isThemeSwitcherActive = true, userMenuData, notifications }: INavbar) => {
	const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
	const currentTheme = useThemeStore((state) => state.theme);
	const languages = useLanguageStore((state) => state.languages);
	const toggleTheme = useThemeStore((s) => s.toggleTheme);

	const handleMobileMenuTriggerClick = () => {
		setSidebarCollapsed({ isLocked: sidebarCollapsed.isLocked, status: !sidebarCollapsed.status });
	};

	const handleThemeChange = () => {
		toggleTheme();
	};

	// todo: onKeyDown
	return (
		<div
			data-testid={"navbar"}
			className={classNames("h-full flex items-center justify-between gap-4 px-4 lg:px-10", {
				"shadow-3 bg-common-white": currentTheme === "light",
				"bg-sidebar-default": currentTheme === "dark",
			})}
		>
			<div
				onClick={handleMobileMenuTriggerClick}
				onKeyDown={() => {}}
				data-testid={"mobile-menu-trigger"}
				className={"block md:hidden"}
			>
				<IconBox isHoverable color={"color-primary"}>
					{icons.outline.bars_3}
				</IconBox>
			</div>
			<div className={"hidden md:flex items-center gap-5 w-1/2"}>
				<label htmlFor={"search-input"} data-testid={"search-input-label"}>
					<IconBox color={"color-primary"} isHoverable>
						{icons.outline.search}
					</IconBox>
				</label>
				<Input id={"search-input"} data-testid={"search-input"} className={"w-full"} placeholder={"Arama yap..."} />
			</div>
			<div className={"flex items-center gap-2 md:gap-4 border-l border-custom-divider pl-4"}>
				{isThemeSwitcherActive && (
					<IconBox color={"color-primary"} isHoverable onClick={handleThemeChange}>
						{currentTheme === "light" ? (
							<span data-testid="sun-icon">{icons.outline.sun}</span>
						) : (
							<span data-testid="moon-icon">{icons.outline.moon}</span>
						)}
					</IconBox>
				)}
				{notifications && <Notifications />}
				{languages && languages.length > 0 && <LanguageChanger />}
				{userMenuData && userMenuData.menus.length > 0 && <UserMenu data={userMenuData} />}
				{extraComponents?.map((content) => content)}
			</div>
		</div>
	);
};
