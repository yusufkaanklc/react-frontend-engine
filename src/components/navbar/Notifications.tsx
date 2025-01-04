import { IconBox } from "@/components/IconBox";
import { icons } from "@/plugins/Icons.tsx";
import { useTranslation } from "react-i18next";

export const Notifications = () => {
	const { t } = useTranslation();
	return (
		<div
			data-testid={"notifications"}
			data-tooltip-id={"global-tooltip"}
			data-tooltip-content={t("theme.navbar.notifications_tooltip")}
		>
			<IconBox color={"color-primary"} isHoverable>
				{icons.outline.bell}
			</IconBox>
		</div>
	);
};
