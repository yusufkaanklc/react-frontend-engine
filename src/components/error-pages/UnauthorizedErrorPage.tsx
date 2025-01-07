import { redirectNative } from "@/actions/client/RedirectNative";
import { Button } from "@/components/Button";
import { Card } from "@/components/card/Card";
import { CardBody } from "@/components/card/CardBody";
import type { ICard } from "@/interfaces/components/card/ICard";
import { useThemeStore } from "@/stores/ThemeStore";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

export const UnauthorizedErrorPage = () => {
	const theme = useThemeStore((state) => state.theme);

	const { t } = useTranslation();

	const cardStyles: ICard["styleClass"] = {
		card: {
			defaultStyleActive: true,
			customStyle: "md:max-w-[40rem] mx-5 md:mx-0 w-full",
		},
		cardBody: {
			defaultStyleActive: true,
			customStyle: "flex flex-col items-center gap-8",
		},
	};

	const handleButtonClick = () => {
		redirectNative({ type: "internal", url: "/" });
	};

	return (
		<div
			className={classNames(
				"flex items-center flex-1 justify-center py-10 overflow-x-hidden bg-fixed bg-cover bg-center h-screen w-full ",
				{
					"bg-unauthorized-page-bg-light": theme === "light",
					"bg-unauthorized-page-bg-dark": theme === "dark",
				},
			)}
		>
			<Card styleClass={cardStyles}>
				<CardBody className="py-10 lg:py-15">
					<div className="text-center">
						<h1 className="text-h3 mb-4">{t("theme.error.unauthorized.title")}</h1>
						<p className="text-subtitle2 opacity-70">{t("theme.error.unauthorized.subtitle")}</p>
					</div>
					<img
						className="md:max-h-[25rem] md:max-w-[25rem] max-h-[15rem] max-w-[15rem]"
						src="/public/media/error-pages/unauthorized/vector.webp"
						alt="unauthorized-vector"
					/>
					<Button onClick={handleButtonClick}>{t("theme.error.unauthorized.button_text")}</Button>
				</CardBody>
			</Card>
		</div>
	);
};
