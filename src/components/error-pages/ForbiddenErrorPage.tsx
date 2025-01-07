import { redirectNative } from "@/actions/client/RedirectNative";
import { Button } from "@/components/Button";
import { Card } from "@/components/card/Card";
import { CardBody } from "@/components/card/CardBody";
import type { ICard } from "@/interfaces/components/card/ICard";
import { useThemeStore } from "@/stores/ThemeStore";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

export const ForbiddenErrorPage = () => {
	// Tema durumunu global store'dan al
	const theme = useThemeStore((state) => state.theme);

	// Çeviri hook'unu başlat
	const { t } = useTranslation();

	// Card bileşeni için stil tanımlamaları
	const cardStyles: ICard["styleClass"] = {
		card: {
			defaultStyleActive: true,
			customStyle: "md:max-w-[40rem] mx-5 md:mx-0 w-full", // Kartın genişlik ve margin ayarları
		},
		cardBody: {
			defaultStyleActive: true,
			customStyle: "flex flex-col items-center gap-8", // İçeriği dikey ve ortalı hizala
		},
	};

	// Ana sayfaya yönlendirme fonksiyonu
	const handleButtonClick = () => {
		redirectNative({ type: "internal", url: "/" });
	};

	return (
		// Ana kapsayıcı - Arka plan resmini ve içeriği konumlandırır
		<div
			className={classNames(
				"flex items-center flex-1 justify-center py-10 overflow-x-hidden bg-fixed bg-cover bg-center h-screen w-full ",
				{
					// Tema durumuna göre arka plan resmini değiştir
					"bg-forbidden-page-bg-light": theme === "light",
					"bg-forbidden-page-bg-dark": theme === "dark",
				},
			)}
		>
			<Card styleClass={cardStyles}>
				<CardBody className="py-10 lg:py-15">
					{/* Başlık ve alt başlık bölümü */}
					<div className="text-center">
						<h1 className="text-h3 mb-4">{t("theme.error.forbidden.title")}</h1>
						<p className="text-subtitle2 opacity-70">{t("theme.error.forbidden.subtitle")}</p>
					</div>
					{/* Hata sayfası görseli */}
					<img
						className="md:max-h-[25rem] md:max-w-[25rem] max-h-[15rem] max-w-[15rem]"
						src="/public/media/error-pages/forbidden/vector.webp"
						alt="forbidden-vector"
					/>
					{/* Ana sayfaya dönüş butonu */}
					<Button onClick={handleButtonClick}>{t("theme.error.forbidden.button_text")}</Button>
				</CardBody>
			</Card>
		</div>
	);
};
