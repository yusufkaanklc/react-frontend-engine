import { screens } from "@/styles/tailwind/Screens.ts";

export type IMediaQuerySizes = keyof typeof screens;

/**
 * Bir string değerinden sayısal değeri çıkaran yardımcı fonksiyon.
 * Örneğin, "640px" gibi bir değeri 640'a dönüştürür.
 *
 * @param {string} str - Sayısal değeri içeren string (örneğin: "640px")
 * @returns {number} - String içindeki sayısal değer
 */
export const extractNumberFromString = (str: string): number => {
	const match = str.match(/(\d+)/); // String içindeki sayıları yakala
	return match ? Number.parseInt(match[0], 10) : 0; // Sayıyı parse et ve geri döndür
};

/**
 * Ekran boyutunu kontrol eden ve verilen medya sorgusuna göre uygun boyutu döndüren fonksiyon.
 *
 * Eğer `media` bir dizi ise, her bir öğe için ekran genişliğini kontrol eder ve her boyut için bir boolean döndürür.
 * Eğer `media` tek bir öğe ise, ekran genişliğine göre tek bir boolean döndürür.
 *
 * @param {IMediaQuerySizes | IMediaQuerySizes[]} media - Tek bir boyut ya da bir dizi boyut.
 * @returns {Record<IMediaQuerySizes, boolean> | boolean | null} -
 *         Ekran genişliğine göre her bir boyut için boolean bir nesne ya da tek bir boolean döndürür,
 *         eşleşme yoksa null döndürülür.
 */
export const mediaQueryUtil = (
	media: IMediaQuerySizes | IMediaQuerySizes[],
): Record<IMediaQuerySizes, boolean> | boolean | null => {
	const currentScreenWidth = window.innerWidth; // Mevcut ekran genişliğini al

	// `screens` objesindeki her bir ekran boyutunu sayısal değere dönüştürüp bir nesne oluştur
	const screensValues = Object.keys(screens).reduce(
		(acc, key) => {
			acc[key as IMediaQuerySizes] = extractNumberFromString(screens[key as IMediaQuerySizes]); // Sayı değeri olarak ekle
			return acc;
		},
		{} as Record<IMediaQuerySizes, number>, // Ekran boyutlarının sayısal değerleri
	);

	// Eğer 'media' bir dizi ise, her bir öğe için kontrol yap
	if (Array.isArray(media)) {
		// Medya boyutlarını kontrol et ve sonuçları bir nesne olarak döndür
		return media.reduce(
			(acc, mediaItem) => {
				acc[mediaItem] = currentScreenWidth >= screensValues[mediaItem]; // Ekran genişliğine göre boolean döndür
				return acc;
			},
			{} as Record<IMediaQuerySizes, boolean>, // Başlangıçta boş bir nesne oluştur
		);
	}

	if (typeof media === "undefined" || media === null) return null;

	// Eğer 'media' tek bir öğe ise, ekran genişliği ile bu öğeyi karşılaştır
	return currentScreenWidth >= screensValues[media]; // Ekran genişliği verilen boyutu geçiyorsa true döndür
};
