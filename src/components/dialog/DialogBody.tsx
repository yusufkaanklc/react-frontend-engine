import type { IDialogChild } from "@/interfaces/components/dialog/IDialogChild";
import classNames from "classnames";

export const DialogBody = ({ children, className = "", styleClass }: IDialogChild) => {
	const dialogBodyStyle = classNames(
		{ [`pr-2 flex-1 overflow-hidden overflow-y-auto h-auto ${className}`]: !styleClass || styleClass.defaultStyleActive },
		styleClass?.customStyle,
	);

	return (
		<div data-testid="dialog-body" className={dialogBodyStyle}>
			{children}
		</div>
	);
};
