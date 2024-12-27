/**
 * Byte cinsinden verilen bir boyutu megabayta çevirir.
 * @param {number} size - Boyut (byte).
 * @returns {number} Boyut (MB).
 */
export const sizeToMB = (size: number): number => {
	return Number.parseFloat((size / (1024 * 1024)).toFixed(3));
};
