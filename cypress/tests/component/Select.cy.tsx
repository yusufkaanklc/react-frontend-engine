import { languageConfigs } from "#/cypress/fixtures/stories/LanguageTranslations";
import { Select } from "@/components/inputs/Select";
import type { IOption, ISelect } from "@/interfaces/components/form/inputs/ISelect";
import { initI18n } from "@/plugins/I18N";
import { color } from "@/styles/tailwind/colors/Color";
import { common } from "@/styles/tailwind/colors/Common";
import { primary } from "@/styles/tailwind/colors/Primary";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import i18next from "i18next";

const defaultOptions: IOption[] = [
	{ value: "option-1", label: "Option 1" },
	{ value: "option-2", label: "Option 2" },
];

const i18nStart = async () => {
	// i18n (çok dilli destek) başlatılır
	await initI18n(languageConfigs);
};

const setup = (props: ISelect) => {
	// Select bileşeni mount edilir
	cy.mount(
		<div className="h-screen flex items-center justify-center">
			<Select {...props} id="test-select" name="test-select" />
		</div>,
	);
};

describe("Select Component", () => {
	let onChangeMock: sinon.SinonStub;

	before(() => {
		// Testler başlamadan önce i18n başlatılır ve onChange fonksiyonu mock'lanır
		i18nStart();
		onChangeMock = cy.stub();
	});

	beforeEach(() => {
		// Her test öncesinde mock fonksiyonu resetlenir
		onChangeMock.resetHistory();
	});

	it("should render the select", () => {
		// Select bileşeninin düzgün render edilip edilmediği kontrol edilir
		setup({});

		const selectContainer = cy.getByTestId("select-container");
		selectContainer.should("be.visible").and("have.attr", "data-toggle", "false");

		const selectInput = cy.getByTestId("select-input");
		selectInput.should("be.visible").and("have.value", i18next.t("theme.select.no_select_label"));
	});

	it("should render dropdown and toggle correctly when trigger with click", () => {
		// Dropdown menüsünün tıklanarak açılmasının ve menü seçeneklerinin doğru şekilde render edilmesinin kontrolü
		setup({ options: defaultOptions });

		const selectContainer = cy.getByTestId("select-container");
		selectContainer.click();

		const selectMenu = cy.getByTestId("select-menu");
		selectMenu.should("be.visible");

		const selectOption = cy.getByTestId("select-option");
		selectOption.should("have.length", 3);

		selectOption.each((option, index) => {
			// Menüdeki her seçeneğin doğru içerik ve CSS özelliklerine sahip olup olmadığını kontrol et
			switch (index) {
				case 0:
					cy.wrap(option).should("have.text", i18next.t("theme.select.no_select_label"));
					cy.wrap(option).haveCSS({
						backgroundColor: getCSSVariableValue(primary.main),
						color: getCSSVariableValue(common.white),
					});
					break;
				case 1:
					cy.wrap(option).should("have.text", defaultOptions[0].label);
					cy.wrap(option).haveCSS({
						color: getCSSVariableValue(color.primary),
					});
					break;
				case 2:
					cy.wrap(option).should("have.text", defaultOptions[1].label);
					cy.wrap(option).haveCSS({
						color: getCSSVariableValue(color.primary),
					});
					break;
			}
		});
	});

	it("should render empty options text correctly based on empty options prop", () => {
		// Boş seçenek listesi olduğunda, boş seçenek mesajının doğru şekilde render edilmesi
		setup({});

		const selectContainer = cy.getByTestId("select-container");
		selectContainer.click();

		const selectNoOption = cy.getByTestId("select-no-option");
		selectNoOption.should("be.visible").and("have.text", i18next.t("theme.select.no_option_found_label"));
	});

	it("should handle option select correctly", () => {
		// Seçeneklerin doğru bir şekilde seçilmesi ve onChange fonksiyonunun çağrılması kontrol edilir
		setup({ options: defaultOptions, onChange: onChangeMock });

		const selectContainer = cy.getByTestId("select-container");
		selectContainer.click();

		const selectOption = cy.getByTestId("select-option");
		selectOption.eq(1).click();

		const selectInput = cy.getByTestId("select-input");
		selectInput.should("have.value", defaultOptions[0].label);

		// Seçilen seçeneğin CSS özellikleri kontrol edilir
		cy.getByTestId("select-option")
			.should("not.be.visible")
			.eq(1)
			.haveCSS({
				backgroundColor: getCSSVariableValue(primary.main),
				color: getCSSVariableValue(common.white),
			});

		// onChange fonksiyonunun doğru parametre ile çağrıldığından emin olunur
		cy.wrap(onChangeMock).should("have.been.calledOnceWith", "option-1");
	});

	it("should filter options based on search input", () => {
		// Arama input'u kullanılarak seçeneklerin filtrelenmesi
		setup({ options: defaultOptions, isSearchable: true });

		const noSelectLabelLength = i18next.t("theme.select.no_select_label").length;

		const selectInput = cy.getByTestId("select-input");

		// İlk başta no select label'ının silinmesi sağlanır
		for (let b = 0; b < noSelectLabelLength; b++) {
			selectInput.type("{backspace}");
		}

		const selectOption = cy.getByTestId("select-option");

		selectOption.should("have.length", 3);

		// Bir seçenek seçilir
		selectOption.eq(1).click();

		// Arama input'una backspace tuşuna basılır
		selectInput.type("{backspace}");

		// Seçenek sayısı azalır
		cy.getByTestId("select-option").should("have.length", 2);

		// 'noop' yazılır ve seçenekler filtrelenir
		selectInput.type("noop");

		cy.getByTestId("select-option").should("have.length", 0);

		// 'Hiç seçenek bulunamadı' mesajının görünür olduğu kontrol edilir
		const noOptionFound = cy.getByTestId("select-no-option");
		noOptionFound.should("be.visible");
	});

	it("should navigate through options using keyboard arrows", () => {
		// Ok tuşlarıyla seçenekler arasında geçiş yapılabilmesi kontrol edilir
		setup({ options: defaultOptions, isSearchable: true });

		const selectInput = cy.getByTestId("select-input");

		selectInput.click();

		// İlk seçenek seçilir
		cy.getByTestId("select-option")
			.eq(0)
			.haveCSS({
				backgroundColor: getCSSVariableValue(primary.main),
				color: getCSSVariableValue(common.white),
			});

		// Aşağı ok tuşu ile bir sonraki seçeneğe geçilir
		selectInput.type("{downarrow}");

		cy.getByTestId("select-option")
			.eq(1)
			.haveCSS({
				backgroundColor: getCSSVariableValue(primary.main),
				color: getCSSVariableValue(common.white),
			});

		// Yukarı ok tuşu ile bir önceki seçeneğe geri dönülür
		selectInput.type("{uparrow}");

		cy.getByTestId("select-option")
			.eq(0)
			.haveCSS({
				backgroundColor: getCSSVariableValue(primary.main),
				color: getCSSVariableValue(common.white),
			});

		// Enter tuşu ile seçenek seçilir
		selectInput.type("{enter}");

		// Seçilen değerin input'a yazıldığı kontrol edilir
		selectInput.should("have.value", i18next.t("theme.select.no_select_label"));
	});
});
