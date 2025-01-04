import type { IDropdownItem } from "@/interfaces/components/dropdown/IDropdownItem.ts";
import classNames from "classnames";

export const DropdownItem = ({ isSelectedMenu = false, styleClass, children, ...props }: IDropdownItem) => {
	return (
		<div
			data-testid={"dropdown-item"}
			className={classNames(
				{
					[`text-body2 p-3 cursor-pointer ${isSelectedMenu ? "bg-primary-main text-white" : "hover:bg-action-hover text-color-primary"} `]:
						typeof styleClass?.defaultStyleActive === "undefined" || styleClass?.defaultStyleActive === null
							? true
							: styleClass.defaultStyleActive,
				},
				styleClass?.customStyle,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
