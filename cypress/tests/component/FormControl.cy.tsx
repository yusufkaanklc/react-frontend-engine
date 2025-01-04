import { FormControl } from "@/components/form/FormControl";
import { Input } from "@/index";
import type { IFormControl } from "@/interfaces/components/form/IFormControl";
import { color } from "@/styles/tailwind/colors/Color";
import { error } from "@/styles/tailwind/colors/Error";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";

const setup = (props: Omit<IFormControl, "children">) => {
	cy.mount(
		<FormControl {...props}>
			<Input data-testid="form-control-input" />
		</FormControl>,
	);
};

describe("FormControl Component Tests", () => {
	// Label doğru metin ve stile sahip olmalı
	it("should render the label with correct text and style", () => {
		setup({ error: undefined, isRequired: true, label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control-label")
			.should("exist")
			.and("have.text", "Test Label")
			.haveCSS({
				color: getCSSVariableValue(color.primary),
				fontSize: `${remToPx(0.875)}px`,
			});

		setup({ error: "Error Text", isRequired: true, label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control-label").haveCSS({ color: getCSSVariableValue(error.dark) });
	});

	// Zorunlu alan göstergesi olan yıldız karakteri doğru şekilde render edilmeli
	it("should render the required asterisk next to the label", () => {
		setup({ error: "Error Text", label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control-asterisk").should("not.exist");

		setup({ error: "Error Text", label: "Test Label", isRequired: true, className: "custom-class" });

		cy.getByTestId("form-control-asterisk")
			.should("exist")
			.and("have.text", "*")
			.haveCSS({
				color: getCSSVariableValue(error.dark),
				fontSize: `${remToPx(0.875)}px`,
			});
	});

	// Hata mesajı, error özelliği sağlandığında görüntülenmeli
	it("should display the error message when error prop is set", () => {
		setup({ error: "This field is required", label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control-error")
			.should("exist")
			.and("have.text", "This field is required")
			.haveCSS({
				color: getCSSVariableValue(error.dark),
				fontSize: `${remToPx(0.75)}px`,
			});
	});

	// Error özelliği sağlanmadığında hata mesajı görünmemeli
	it("should not display the error message when no error is provided", () => {
		setup({ error: undefined, label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control-error").should("not.exist");
	});

	// Container özel bir class aldığında bu class uygulanmalı
	it("should apply custom class to the container", () => {
		setup({ error: undefined, label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control").should("have.class", "custom-class");
	});

	// Çocuk bileşen (input) doğru şekilde render edilmeli
	it("should render the children (input) correctly", () => {
		setup({ error: undefined, label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control-input").should("exist");
	});

	// Container "flex" sınıfını içermeli
	it("should apply 'flex' class to the container", () => {
		setup({ error: undefined, label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control").should("have.class", "flex");
	});

	// Label doğru boşluklara sahip olmalı
	it("should render the label with proper spacing", () => {
		setup({ error: undefined, label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control-label-box").haveCSS({
			display: "flex",
			gap: "4px",
		});
	});

	// Hata olduğunda "data-invalid" özelliği doğru ayarlanmalı
	it("should show correct data-invalid attribute when there is an error", () => {
		setup({ label: "Test Label", error: "Error Text", className: "custom-class" });

		cy.getByTestId("form-control-label").should("have.attr", "data-invalid", "true");
	});

	// Hata olmadığında "data-invalid" özelliği false olarak ayarlanmalı
	it("should not show the 'data-invalid' attribute when there is no error", () => {
		setup({ error: undefined, label: "Test Label", className: "custom-class" });

		cy.getByTestId("form-control-label").should("have.attr", "data-invalid", "false");
	});

	// Error mesajları yalnızca error dolu olduğunda render edilmeli
	it("should render error messages only when error is non-empty", () => {
		setup({ label: "Test Label", error: "", className: "custom-class" });

		cy.getByTestId("form-control-error").should("not.exist");
	});

	// Zorunlu alan doğru şekilde işlenmeli
	it("should handle the required field correctly", () => {
		setup({ error: undefined, label: "Test Label", isRequired: true, className: "custom-class" });

		cy.getByTestId("form-control-asterisk")
			.should("exist")
			.and("have.text", "*")
			.haveCSS({
				color: getCSSVariableValue(error.dark),
			});
	});
});
