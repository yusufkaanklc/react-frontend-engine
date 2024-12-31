import { Checkbox } from "@/components/inputs/Checkbox";
import { error } from "@/styles/tailwind/colors/Error";
import { red } from "@/styles/tailwind/colors/Red";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";

describe("Checkbox Component", () => {
	it("should render checkbox with default props", () => {
		cy.mount(<Checkbox name="test-checkbox" />);

		// Checkbox etiketinin render edildiğini kontrol et
		cy.getByTestId("checkbox-label").should("exist");

		// Checkbox input öğesinin mevcut olduğunu ve görünmeyen şekilde olduğunu doğrula
		cy.getByTestId("checkbox-input").should("exist").should("have.attr", "type", "checkbox");

		// Checkbox'ın varsayılan olarak işaretlenmediğini kontrol et
		cy.getByTestId("checkbox-input").should("not.be.checked");
		cy.getByTestId("checkbox-check").should("not.exist");
	});

	it("should toggle checkbox state when clicked", () => {
		cy.mount(<Checkbox name="test-checkbox" checked={false} />);

		// Checkbox'ın başlangıçta işaretlenmediğini kontrol et
		cy.getByTestId("checkbox-input").should("not.be.checked");
		cy.getByTestId("checkbox-check").should("not.exist");

		// Checkbox'ı tıklayarak durumunu değiştir
		cy.getByTestId("checkbox-label").trigger("click");

		cy.wait(500);

		// Checkbox'ın şimdi işaretlendiğini doğrula
		cy.getByTestId("checkbox-input").should("be.checked");
		cy.getByTestId("checkbox-check").should("exist");
	});

	it("should apply custom color when checked", () => {
		const customColor = "red-500";
		cy.mount(<Checkbox name="test-checkbox" color={customColor} checked={true} />);

		// Checkbox işaretli olduğunda etiketin doğru arka plan rengini aldığını doğrula
		cy.getByTestId("checkbox-label").haveCSS({ backgroundColor: getCSSVariableValue(red[500]) });
	});

	it("should apply invalid state styling", () => {
		cy.mount(<Checkbox name="test-checkbox" isInvalid={true} />);

		// Checkbox'ın geçersiz olduğunu belirten border rengini doğrula
		cy.getByTestId("checkbox-label").should("have.attr", "data-invalid", "true");
		cy.getByTestId("checkbox-label").haveCSS({ border: `1px solid ${getCSSVariableValue(error.dark)}` });
	});

	it("should handle value change", () => {
		cy.mount(<Checkbox name="test-checkbox" checked={false} value={true} />);

		// Değer true olduğunda checkbox'ın işaretlendiğini doğrula
		cy.getByTestId("checkbox-input").should("be.checked");
	});
});
