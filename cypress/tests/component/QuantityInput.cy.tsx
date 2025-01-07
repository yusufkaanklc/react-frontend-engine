import { QuantityInput } from "@/components/inputs/QuantityInput";
import { remToPx } from "@/utils/RemToPx";

const commonButtonStyles = {
	cursor: "pointer",
	width: remToPx(2.5),
	height: remToPx(2.5),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

describe("QuantityInput Component", () => {
	beforeEach(() => {
		// Test öncesi komponenti monte ediyoruz
		cy.mount(<QuantityInput value={1} onChange={cy.stub().as("onChange")} />);
	});

	context("rendering", () => {
		it("should render correctly quantity input container", () => {
			cy.getByTestId("quantity-input-container").should("be.visible");
			cy.getByTestId("quantity-input-container").haveCSS({
				display: "inline-flex",
				alignItems: "center",
				borderRadius: remToPx(0.5),
			});
		});

		it("should render correctly quantity input decrement button", () => {
			cy.getByTestId("quantity-input-decrement").should("be.visible").haveCSS(commonButtonStyles);
		});

		it("should render correctly quantity input increment button", () => {
			cy.getByTestId("quantity-input-increment").should("be.visible").haveCSS(commonButtonStyles);
		});

		it("should render correctly quantity input field", () => {
			cy.getByTestId("quantity-input").should("be.visible").and("have.value", "1");
		});
	});

	context("Functional Properties", () => {
		it("should render correctly default value", () => {
			cy.getByTestId("quantity-input").should("have.value", "1");
		});

		it("should increment value when increment button is clicked", () => {
			cy.getByTestId("quantity-input-increment").click();
			cy.getByTestId("quantity-input").should("have.value", "2");
			cy.get("@onChange").should("have.been.calledWith", 2);
		});

		it("should decrement value when decrement button is clicked", () => {
			cy.getByTestId("quantity-input-decrement").click();
			cy.getByTestId("quantity-input").should("have.value", "0");
			cy.get("@onChange").should("have.been.calledWith", 0);
		});

		it("should not go below minimum value", () => {
			// First decrease to 0
			cy.getByTestId("quantity-input-decrement").click();
			// Click decrement button again
			cy.getByTestId("quantity-input-decrement").click({ force: true });
			// Value should still be 0
			cy.getByTestId("quantity-input").should("have.value", "0");
			// Decrement button should be disabled
			cy.getByTestId("quantity-input-decrement").should("be.disabled");
		});

		it("should not exceed maximum value", () => {
			cy.mount(<QuantityInput value={999} onChange={cy.stub().as("onChange")} />);
			// Artırma butonuna tıklıyoruz
			cy.getByTestId("quantity-input-increment").click({ force: true });
			// Değer hala 999 olmalı
			cy.getByTestId("quantity-input").should("have.value", "999");
			// Artırma butonu disabled olmalı
			cy.getByTestId("quantity-input-increment").should("be.disabled");
		});

		it("input alanına manuel değer girildiğinde çalışmalı", () => {
			cy.getByTestId("quantity-input").clear().type("5");
			cy.getByTestId("quantity-input").should("have.value", "5");
			cy.get("@onChange").should("have.been.calledWith", 5);
		});

		it("değer silinebilmeli", () => {
			cy.getByTestId("quantity-input").clear();
			cy.getByTestId("quantity-input").should("have.value", "");
		});

		it("özel min/max değerleriyle çalışmalı", () => {
			cy.mount(<QuantityInput value={5} min={5} max={10} onChange={cy.stub().as("onChange")} />);

			// Minimum değerdeyken azaltma butonu disabled olmalı
			cy.getByTestId("quantity-input-decrement").should("be.disabled");

			// 10'a kadar artırabiliriz
			cy.getByTestId("quantity-input-increment").click().click().click().click().click();
			cy.getByTestId("quantity-input").should("have.value", "10");

			// Maximum değerdeyken artırma butonu disabled olmalı
			cy.getByTestId("quantity-input-increment").should("be.disabled");
		});

		it("should handle decimal values correctly", () => {
			cy.getByTestId("quantity-input").clear().type("1.5");
			cy.getByTestId("quantity-input").should("have.value", "1");
		});

		it("should handle non-numeric input correctly", () => {
			cy.getByTestId("quantity-input").clear().type("abc");
			cy.getByTestId("quantity-input").should("have.value", "");
		});
	});
});
