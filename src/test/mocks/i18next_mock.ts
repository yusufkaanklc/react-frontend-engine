import i18next, { type i18n } from "i18next";
import { vi } from "vitest";

const mockI18next = {
	...i18next,
	use: vi.fn().mockReturnThis(), // Chaining destekler
	init: vi.fn().mockResolvedValue(true), // init genelde Promise döner
	changeLanguage: vi.fn().mockResolvedValue(true), // Dil değiştirme Promise ile desteklenir
	addResources: vi.fn(), // Yeni kaynak ekleme
} as i18n;

export default mockI18next;
