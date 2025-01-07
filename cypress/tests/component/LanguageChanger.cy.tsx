import { languageConfigs } from "#/cypress/fixtures/stories/LanguageTranslations";
import { LanguageChanger } from "@/components/navbar/LanguageChanger";
import type { ILanguageData } from "@/interfaces/stores/ILanguageStore";
import { useLanguageStore } from "@/stores/LanguageStore";

const selectedLanguage = useLanguageStore.getState().selectedLanguage;
const languages = useLanguageStore.getState().languages;

const setup = (languages: ILanguageData[] | null, selectedLanguage: ILanguageData | null) => {
	// Mock language store
	useLanguageStore.setState({
		selectedLanguage,
		languages,
	});
	cy.mount(
		<div className="flex justify-end">
			<LanguageChanger />
		</div>,
	);
};

const turkishFlag = "./cypress/fixtures/flags/turkey-flag-icon.png";
const englishFlag = "./cypress/fixtures/flags/united-kingdom-flag-icon.png";

describe("LanguageChanger", () => {
	context("Rendering", () => {
		it("renders correctly with selected language", () => {
			setup(languages, languageConfigs[1]);

			cy.getByTestId("language-changer").should("be.visible");
			cy.contains("English").should("be.visible");
			cy.get("img").should("have.attr", "src", englishFlag);
		});
	});

	context("Dropdown functionality", () => {
		it("displays language options when clicked", () => {
			setup(languages, selectedLanguage);

			cy.getByTestId("language-changer").click();
			cy.contains("Türkçe").should("be.visible");
			cy.contains("English").should("be.visible");
		});

		it("changes language when an option is clicked", () => {
			setup(languages, selectedLanguage);

			cy.getByTestId("language-changer").click();
			cy.contains("Türkçe").click();

			cy.contains("Türkçe").should("be.visible");
			cy.get("img").should("have.attr", "src", turkishFlag);
		});
	});

	context("Selected language behavior", () => {
		it("does not trigger change for the current language", () => {
			setup(languages, selectedLanguage);

			cy.getByTestId("language-changer").click();
			cy.contains("English").click();

			cy.getByTestId("language-changer").should("be.visible");
			cy.contains("English").should("be.visible");
		});
	});
});
