export const pathCompare = (list: string[]): boolean => {
	// Gelen path'i normalize et (URL ise pathname'i al, başındaki ve sonundaki slash'leri temizle)
	const normalizedPath = window.location.pathname
		.replace(/^https?:\/\//, "") // http:// veya https:// kaldır
		.replace(/^\/+|\/+$/g, ""); // baştaki ve sondaki slash'leri temizle

	// Liste içindeki her path ile karşılaştır
	return list.some((listPath) => {
		const normalizedListPath = listPath.replace(/^https?:\/\//, "").replace(/^\/+|\/+$/g, "");

		return normalizedPath === normalizedListPath;
	});
};
