import { redirectNative } from "@/actions/client/RedirectNative.ts";
import { IconBox } from "@/components/IconBox";
import type { ISidebarItem } from "@/interfaces/components/sidebar/ISidebarItem";
import type { ISidebarMenuAction } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import { keyboardUtil } from "@/utils/KeyboardUtil.ts";
import classNames from "classnames";
import { type JSX, useCallback } from "react";
import { useTranslation } from "react-i18next";

/**
 * Menüyü render eden yardımcı fonksiyon. Menü öğelerini sıralı bir liste olarak render eder.
 *
 * @param {ISidebarMenuItem} menu - Render edilecek menü öğesi.
 * @param isChild
 * @returns {JSX.Element} Menü öğesi elemanını döner.
 */
export const SidebarItem = ({ isActivated = false, menu, isChild = false }: ISidebarItem): JSX.Element => {
	const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);

	const { t } = useTranslation();

	// Menü öğesine tıklandığında yönlendirme işlemi için `useCallback` kullanımı
	const handleMenuClick = useCallback((action?: ISidebarMenuAction) => {
		if (typeof action === "string") {
			return redirectNative({ url: action, type: "internal" });
		}
		action?.();
	}, []);

	return (
		<li
			data-testid={"sidebar-item-container"}
			className="flex items-center gap-2"
			onKeyDown={(e) => keyboardUtil({ e, key: "Enter", callback: () => handleMenuClick(menu.action) })}
			onClick={() => handleMenuClick(menu.action)}
		>
			<div
				data-testid={"sidebar-item-child-dot"}
				data-is-child={isChild}
				data-activated={isActivated}
				className={classNames(
					"hidden min-w-3 min-h-3 border border-primary-main rounded-full",
					"data-[activated='true']:bg-primary-main data-[is-child='true']:block",
				)}
			/>
			<div
				data-testid={"sidebar-item"}
				data-activated={isActivated}
				data-is-child={isChild}
				className={classNames(
					"flex rounded-lg items-center overflow-hidden w-full px-2 py-2.5 mb-4",
					"data-[is-child='true']:mb-0 data-[is-child='false']:mt-1",
					"text-sidebar-item-color hover:text-sidebar-item-active-color",
					"data-[activated='true']:text-sidebar-item-active-color",
					"data-[activated='true']:bg-sidebar-item-active",
					"data-[activated='false']:hover:bg-sidebar-item-hover",
				)}
			>
				{menu.icon && (
					<IconBox
						data-activated={isActivated}
						color={"text-sidebar-item-color"}
						className={"data-[activated='true']:text-sidebar-item-active-color hover:text-sidebar-item-active-color"}
					>
						{menu.icon}
					</IconBox>
				)}
				{menu.text && menu.text !== "" && (
					<span
						data-testid={"sidebar-item-text"}
						data-sidebar-collapsed={sidebarCollapsed.status}
						className={classNames(
							"text-nowrap truncate leading-5 text-body2 opacity-100",
							"transition-all duration-300", // Tüm geçişlere animasyon uygulanacak
							"data-[sidebar-collapsed='true']:md:scale-x-0 origin-left data-[sidebar-collapsed='true']:md:opacity-0", // collapsed durumunda width 0 ve opacity 0 olacak
							{ "ml-4": menu.icon && !sidebarCollapsed.status }, // margin sağda icon varsa
						)}
					>
						{t(menu.text)}
					</span>
				)}
			</div>
		</li>
	);
};
