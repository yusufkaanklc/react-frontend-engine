import { IconBox } from "@/components/IconBox";
import type { IAnnouncement } from "@/interfaces/components/IAnnouncement";
import { icons } from "@/plugins/Icons";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Duyuru bileşeni
 * Sayfanın üst kısmında görüntülenen, kapatılabilir veya sabit duyuru/bildirim bileşeni
 * @param {string} id - Duyurunun benzersiz kimliği
 * @param {boolean} isClosable - Duyurunun kapatılabilir olup olmadığı
 * @param {string | { to: string, label: string } | React.ReactNode} content - Duyuru içeriği
 * @param {boolean} isActive - Duyurunun görünür olup olmadığı
 * @param {string} colorScheme - Duyurunun renk şeması ('primary', 'secondary', vs.)
 * @param {string} className - Ek CSS sınıfları
 */
export const Announcement = ({
	id,
	isClosable = true,
	content,
	isActive: isActiveProp = true,
	colorScheme = "primary",
	className = "",
}: IAnnouncement) => {
	// Duyurunun görünürlük durumunu tutan state
	const [isActive, setIsActive] = useState(isActiveProp);

	// Kapatma butonuna tıklandığında çalışacak fonksiyon
	const handleClose = () => {
		setIsActive(false);
	};

	// isActiveProp değiştiğinde state'i güncelle
	useEffect(() => {
		setIsActive(isActiveProp);
	}, [isActiveProp]);

	// Duyuru aktif değilse null döndür
	if (!isActive) return null;

	return (
		<div
			id={id}
			data-testid={`announcement-${id}`}
			className={classNames(
				`flex items-center justify-between w-full px-4 gap-4 bg-${colorScheme}-main text-white`,
				// Kapatılabilir olup olmamasına göre padding değerini ayarla
				{ "py-3": !isClosable, "py-2": isClosable },
				className,
			)}
		>
			{/* İçerik kontrolü ve render işlemi */}
			{content !== null ? (
				typeof content === "object" && "to" in content ? (
					// Link içeriği için
					<Link to={content.to} className="text-body2" data-testid={`announcement-${id}-link`}>
						{content.label}
					</Link>
				) : typeof content === "string" ? (
					// String içerik için
					<span data-testid={`announcement-${id}-content`} className="text-body2">
						{content}
					</span>
				) : (
					// React node içerik için
					content
				)
			) : null}

			{/* Kapatma butonu */}
			{isClosable && (
				<span data-testid={`announcement-${id}-closable`}>
					<IconBox color={"white"} size="md" isHoverable onClick={handleClose}>
						{icons.outline.x}
					</IconBox>
				</span>
			)}
		</div>
	);
};
