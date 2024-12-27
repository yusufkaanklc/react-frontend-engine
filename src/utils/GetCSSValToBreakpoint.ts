import { type IMediaQuerySizes, mediaQueryUtil } from "@/utils/MediaQueryUtil";

export const getCSSValToBreakpoint = (breakpoints: Partial<Record<IMediaQuerySizes, string>>) => {
	// Aktif breakpoint'leri al
	const activeBreakpoints = mediaQueryUtil(Object.keys(breakpoints) as IMediaQuerySizes[]) as Record<IMediaQuerySizes, boolean>;

	// Sıralama düzeni
	const order: IMediaQuerySizes[] = ["sm", "md", "lg", "xl", "2xl"];

	// Aktif breakpoint yoksa hiçbir şey döndürme
	if (!activeBreakpoints) return;

	const filteredMediaQueries = order.filter(
		(item) => activeBreakpoints[item] && typeof breakpoints[item] !== "undefined" && breakpoints[item] !== null,
	);

	// Aktif breakpoint'leri filtrele ve döndür
	return breakpoints[filteredMediaQueries.slice(filteredMediaQueries.length - 1, filteredMediaQueries.length)[0]];
};
