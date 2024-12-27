import type { IAvatar } from "@/interfaces/components/IAvatar.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import classNames from "classnames";

// Boyut haritası (Tailwind CSS sınıfları)
const sizeMap: Record<ISize, string> = {
	sm: "w-8 h-8",
	md: "w-12 h-12",
	lg: "w-16 h-16",
	xl: "w-20 h-20",
	"2xl": "w-28 h-28",
};

export const Avatar = ({ image, size = "md", alt = "Avatar", rounded = "full", className, ...props }: IAvatar) => {
	// Map üzerinden boyut sınıfını al
	const avatarSize = sizeMap[size];

	return (
		<div
			data-testid={"avatar-container"}
			{...props}
			className={classNames(
				"overflow-hidden",
				avatarSize,
				{
					[`rounded-${rounded}`]: rounded !== "sm",
					rounded: rounded === "sm",
				},
				className,
			)}
		>
			{image && (
				<img
					data-testid={"avatar-image"}
					src={image}
					alt={alt}
					className="object-cover w-full h-full" // Resmi sığdırmak için cover
				/>
			)}
		</div>
	);
};
