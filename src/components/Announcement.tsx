import { IconBox } from "@/components/IconBox";
import type { IAnnouncement } from "@/interfaces/components/IAnnouncement";
import { icons } from "@/plugins/Icons";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Announcement = ({
	id,
	isClosable = true,
	content,
	isActive: isActiveProp = true,
	colorScheme = "primary",
	className = "",
}: IAnnouncement) => {
	const [isActive, setIsActive] = useState(isActiveProp);

	const handleClose = () => {
		setIsActive(false);
	};

	useEffect(() => {
		setIsActive(isActiveProp);
	}, [isActiveProp]);

	if (!isActive) return null;

	return (
		<div
			id={id}
			data-testid={`announcement-${id}`}
			className={classNames(
				`flex items-center justify-between w-full px-4 gap-4 bg-${colorScheme}-main text-white`,
				{ "py-3": !isClosable, "py-2": isClosable },
				className,
			)}
		>
			{content !== null ? (
				typeof content === "object" && "to" in content ? (
					<Link to={content.to} className="text-body2" data-testid={`announcement-${id}-link`}>
						{content.label}
					</Link>
				) : typeof content === "string" ? (
					<span data-testid={`announcement-${id}-content`} className="text-body2">
						{content}
					</span>
				) : (
					content
				)
			) : null}

			{isClosable && (
				<IconBox color={"white"} size="md" isHoverable onClick={handleClose}>
					{icons.outline.x}
				</IconBox>
			)}
		</div>
	);
};
