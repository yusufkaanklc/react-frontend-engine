import { storageTypes } from "@/enums/Storage.ts";
import { themeTypes } from "@/enums/Theme.ts";
import type { IThemeStore } from "@/interfaces/stores/IThemeStore.ts";
import type { ITheme } from "@/interfaces/types/ITheme.ts";
import { create } from "zustand";

const html = document.querySelector("html");

const changeAttribute = (newTheme: string) => {
	if (!html) return;
	html.removeAttribute("data-mode");
	html.setAttribute("data-mode", newTheme);
	html.classList.add("bg-paper-default");
};

const getInitialTheme = (): ITheme => {
	const prefersDarkScheme =
		typeof window.matchMedia === "function" ? window.matchMedia("(prefers-color-scheme: dark)").matches : "dark";
	const savedTheme = localStorage.getItem(storageTypes.THEME_STORAGE);

	if (savedTheme && themeTypes.includes(savedTheme)) {
		return savedTheme as ITheme;
	}

	return prefersDarkScheme ? "dark" : "light";
};

export const useThemeStore = create<IThemeStore>((set) => ({
	theme: getInitialTheme(),

	initTheme: () => {
		const initialTheme = getInitialTheme();
		changeAttribute(initialTheme);
		set({ theme: initialTheme });
	},

	toggleTheme: () =>
		set((state) => {
			const newTheme = state.theme === "light" ? "dark" : "light";
			changeAttribute(newTheme);
			localStorage.setItem(storageTypes.THEME_STORAGE, newTheme);
			return { theme: newTheme };
		}),
}));
