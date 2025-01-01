import { IconBox } from "@/components/IconBox";
import { icons } from "@/plugins/Icons.tsx";

export const Notifications = () => {
	return (
		<div data-testid={"notifications"}>
			<IconBox color={"color-primary"} isHoverable>
				{icons.outline.bell}
			</IconBox>
		</div>
	);
};
