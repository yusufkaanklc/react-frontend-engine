import { IconBox } from "@/components/IconBox";
import type { IDialogChild } from "@/interfaces/components/dialog/IDialogChild";
import { icons } from "@/plugins/Icons.tsx";
import classNames from "classnames";
import type { ReactNode } from "react";

export const DialogHeader = ({
	handleDialogClose,
	children,
	styleClass,
	className = "",
	closeIcon = icons.outline.x,
}: IDialogChild & { closeIcon?: ReactNode; handleDialogClose?: () => void }) => {
	const dialogHeaderStyle = classNames(
		{ [`flex items-center gap-4 justify-between ${className}`]: !styleClass || styleClass.defaultStyleActive },
		styleClass?.customStyle,
	);

	return (
		<div className={dialogHeaderStyle} data-testid="dialog-header">
			<h4 className={"text-h4 text-color-primary"}>{children}</h4>
			<IconBox color={"color-primary"} onClick={handleDialogClose} isHoverable>
				{closeIcon}
			</IconBox>
		</div>
	);
};
