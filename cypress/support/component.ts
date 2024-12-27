import { languageConfigs } from "#/cypress/fixtures/mocks/LanguageTranslations";
import { initI18n } from "@/plugins/I18N";
import { useThemeStore } from "@/stores/ThemeStore";
import "@/styles/theme.css";
import "cypress-file-upload";
import { mount } from "cypress/react18";
import "./commands";

declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}

// Temayı başlatma
useThemeStore.getState().initTheme();

// Lokalizasyonu başlatma
const initialLocalization = async () => {
	await initI18n(languageConfigs);
};
initialLocalization();

// Tooltip bileşenini renderlama
Cypress.Commands.add("mount", (component, options = {}) => {
	return mount(component, options);
});
