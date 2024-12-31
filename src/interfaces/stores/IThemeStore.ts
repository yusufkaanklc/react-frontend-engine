import type { ITheme } from "@/interfaces/types/ITheme.ts";

export interface IThemeStore {
	theme: ITheme;
	toggleTheme: () => void;
	setTheme: (theme: ITheme) => void;
	initTheme: () => void;
}
