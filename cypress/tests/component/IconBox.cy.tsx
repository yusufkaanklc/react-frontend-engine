// Gerekli importlar
import { IconBox } from "@/components/IconBox";
import type { IIconBox } from "@/interfaces/components/IIconBox";
import { icons } from "@/plugins/Icons";
import { color } from "@/styles/tailwind/colors/Color";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";

// Test bileşenini hazırlayan yardımcı fonksiyon
const setup = (props: Omit<IIconBox, "children">) => {
	cy.mount(<IconBox {...props}>{icons.outline.home}</IconBox>);
};

describe("IconBox Bileşeni", () => {
	// Varsayılan özelliklere göre stil kontrolü
	it("varsayılan özelliklere göre doğru stilleri göstermelidir", () => {
		setup({});
		cy.getByTestId("icon-box").haveCSS({
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			cursor: "pointer",
			borderRadius: `${remToPx(0.5)}px`,
			color: getCSSVariableValue(color.primary),
		});

		cy.getByTestId("icon-box-child")
			.haveCSS({ width: `${remToPx(1.5)}px`, height: `${remToPx(1.5)}px` })
			.find("svg")
			.should("be.visible");
	});

	// Renk özelliğine göre stil kontrolü
	it("renk özelliğine göre doğru stilleri göstermelidir", () => {
		setup({ color: "color-secondary" });
		cy.getByTestId("icon-box").haveCSS({
			color: getCSSVariableValue(color.secondary),
		});
	});

	// Boyut özelliğine göre stil kontrolü
	it("boyut özelliğine göre doğru stilleri göstermelidir", () => {
		setup({ size: "lg" });
		cy.getByTestId("icon-box-child").haveCSS({ width: `${remToPx(2.5)}px`, height: `${remToPx(2.5)}px` });
	});

	// Köşe yuvarlaklığı özelliğine göre stil kontrolü
	it("köşe yuvarlaklığı özelliğine göre doğru stilleri göstermelidir", () => {
		setup({ radius: "xl" });
		cy.getByTestId("icon-box").haveCSS({ borderRadius: `${remToPx(0.75)}px` });
	});

	// Özel CSS sınıfı özelliğine göre stil kontrolü
	it("özel CSS sınıfı özelliğine göre doğru stilleri göstermelidir", () => {
		setup({ className: "custom-class" });
		cy.getByTestId("icon-box").should("have.class", "custom-class");
	});

	// Hover durumu özelliğine göre stil kontrolü
	it("hover durumu özelliğine göre doğru stilleri göstermelidir", () => {
		setup({ isHoverable: true });
		cy.getByTestId("icon-box").haveCSS({ transform: "matrix(1, 0, 0, 1, 0, 0)", padding: `${remToPx(0.5)}px` });
	});
});
