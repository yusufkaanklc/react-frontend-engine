import type { IDialogChild } from "@/interfaces/components/dialog/IDialogChild";
import classNames from "classnames";

export const DialogAction = ({ children, className = "", styleClass }: IDialogChild) => {
	const dialogActionStyle = classNames(
		{ [`flex items-center justify-end gap-4 ${className}`]: !styleClass || styleClass.defaultStyleActive },
		styleClass?.customStyle,
	);

	return (
		<div data-testid="dialog-action" className={dialogActionStyle}>
			{children}
		</div>
	);
};
