/**
 * Converts a rem value to pixels based on the root font size.
 *
 * @param rem - The rem value to convert.
 * @param rootFontSize - The root font size in pixels (default is 16px).
 * @returns The equivalent pixel value.
 */
export function remToPx(rem: number, rootFontSize = 16): number {
	return rem * rootFontSize;
}
