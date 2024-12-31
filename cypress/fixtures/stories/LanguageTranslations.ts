import type { ILanguage } from "@/interfaces/ILanguage";
import { enTranslations } from "@/locales/en/translations";
import { trTranslations } from "@/locales/tr/translations";
export const languageConfigs: ILanguage[] = [
	{
		slug: "tr",
		name: "Türkçe",
		flag: "../flags/turkey-flag-icon.png",
		is_default: true,
		is_fallback: true,
		translations: trTranslations,
	},
	{
		slug: "en",
		name: "English",
		flag: "../flags/united-kingdom-flag-icon.png",
		is_default: false,
		is_fallback: false,
		translations: enTranslations,
	},
];
