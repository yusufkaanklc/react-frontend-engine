import { Pill } from "@/components/Pill";
import type { IPill } from "@/interfaces/components/IPill";
import { error } from "@/styles/tailwind/colors/Error";
import { primary } from "@/styles/tailwind/colors/Primary";
import { secondary } from "@/styles/tailwind/colors/Secondary";
import { success } from "@/styles/tailwind/colors/Success";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";

// Test kurulumu için yardımcı fonksiyon
const setup = (props: Omit<IPill, "children">) => {
	return cy.mount(
		<div className="flex items-center justify-center h-screen">
			<Pill {...props}>test</Pill>
		</div>,
	);
};

describe("Pill Component", () => {
	beforeEach(() => {
		// Her test öncesi iPhone X viewport'unu ayarla
		cy.viewport("iphone-x");
	});

	context("Size variants", () => {
		// Boyut varyantları testleri
		it("should render with 'sm' size", () => {
			// Küçük boyut testi
			setup({ size: "sm" });
			cy.getByTestId("pill").haveCSS({
				padding: `${remToPx(0.125)}px ${remToPx(0.5)}px`,
				fontSize: `${remToPx(0.75)}px`,
			});
		});

		it("should render with 'md' size (default)", () => {
			// Orta boyut testi (varsayılan)
			setup({});
			cy.getByTestId("pill").haveCSS({
				padding: `${remToPx(0.25)}px ${remToPx(0.75)}px`,
				fontSize: `${remToPx(0.875)}px`,
			});
		});

		it("should render with 'lg' size", () => {
			// Büyük boyut testi
			setup({ size: "lg" });
			cy.getByTestId("pill").haveCSS({
				padding: `${remToPx(0.375)}px ${remToPx(1)}px`,
				fontSize: `${remToPx(0.875)}px`,
			});
		});
	});

	context("Color variants", () => {
		// Renk varyantları testleri
		it("should render with primary color (default)", () => {
			// Birincil renk testi (varsayılan)
			setup({});
			cy.getByTestId("pill").haveCSS({
				backgroundColor: getCSSVariableValue(primary.light),
				borderColor: getCSSVariableValue(primary.dark),
			});
		});

		it("should render with secondary color", () => {
			// İkincil renk testi
			setup({ colorScheme: "secondary" });
			cy.getByTestId("pill").haveCSS({
				backgroundColor: getCSSVariableValue(secondary.light),
				borderColor: getCSSVariableValue(secondary.dark),
			});
		});

		it("should render with success color", () => {
			// Başarı rengi testi
			setup({ colorScheme: "success" });
			cy.getByTestId("pill").haveCSS({
				backgroundColor: getCSSVariableValue(success.light),
				borderColor: getCSSVariableValue(success.dark),
			});
		});

		it("should render with error color", () => {
			// Hata rengi testi
			setup({ colorScheme: "error" });
			cy.getByTestId("pill").haveCSS({
				backgroundColor: getCSSVariableValue(error.light),
				borderColor: getCSSVariableValue(error.dark),
			});
		});
	});
});
