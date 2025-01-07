/**
 * REM birimini piksel (px) birimine çevirir.
 *
 * @param {number} rem - Dönüştürülecek REM değeri
 * @param {number} [rootFontSize=16] - Kök font boyutu (varsayılan: 16px)
 * @returns {(string|number|undefined)} - Format belirtilmişse string (örn: "16px"), belirtilmemişse sayısal değer döner.
 * Geçersiz giriş durumunda undefined döner.
 *
 * @example
 * remToPx(1)           // 16
 * remToPx(1, 16)       // "16px"
 * remToPx(1.5)         // 24
 * remToPx(null)        // undefined
 */
export function remToPx(rem: number, rootFontSize = 16): string | number | undefined {
	if (typeof rem === "undefined" || rem === null) return;
	return `${rem * rootFontSize}px`;
}
