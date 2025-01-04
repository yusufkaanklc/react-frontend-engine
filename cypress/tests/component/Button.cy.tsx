import { buttonColorScheme, buttonSizeScheme } from "@/components/Button";
import { Button } from "@/index";
import type { IButton } from "@/interfaces/components/IButton";

// Test için button component'ini hazırlayan yardımcı fonksiyon
const setup = (props: Omit<IButton, "children">) => {
	cy.mount(<Button {...props}>Test</Button>);
};

describe("Button Component", () => {
	// Temel render testleri
	context("Rendering", () => {
		it("varsayılan özelliklerle butonun doğru stillerde görüntülenmesi", () => {
			setup({});

			cy.getByTestId("button")
				.should("have.class", "rounded-md")
				.should("have.class", "shadow-2")
				.should("have.class", buttonColorScheme("dark").contained.primary)
				.should("have.class", buttonSizeScheme.md);
		});
	});

	// Primary renk şeması varyantları testleri
	context("Primary Variants", () => {
		it("contained", () => {
			setup({ variant: "contained", colorScheme: "primary" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").contained.primary);
		});

		it("outlined", () => {
			setup({ variant: "outlined", colorScheme: "primary" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").outlined.primary);
		});

		it("underlined", () => {
			setup({ variant: "underlined", colorScheme: "primary" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").underlined.primary);
		});
	});

	// Secondary renk şeması varyantları testleri
	context("Secondary Variants", () => {
		it("contained", () => {
			setup({ variant: "contained", colorScheme: "secondary" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").contained.secondary);
		});

		it("outlined", () => {
			setup({ variant: "outlined", colorScheme: "secondary" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").outlined.secondary);
		});

		it("underlined", () => {
			setup({ variant: "underlined", colorScheme: "secondary" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").underlined.secondary);
		});
	});

	// Başarı renk şeması varyantları testleri
	context("Success Variants", () => {
		it("contained", () => {
			setup({ variant: "contained", colorScheme: "success" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").contained.success);
		});

		it("outlined", () => {
			setup({ variant: "outlined", colorScheme: "success" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").outlined.success);
		});

		it("underlined", () => {
			setup({ variant: "underlined", colorScheme: "success" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").underlined.success);
		});
	});

	// Uyarı renk şeması varyantları testleri
	context("Warning Variants", () => {
		it("contained", () => {
			setup({ variant: "contained", colorScheme: "warning" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").contained.warning);
		});

		it("outlined", () => {
			setup({ variant: "outlined", colorScheme: "warning" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").outlined.warning);
		});

		it("underlined", () => {
			setup({ variant: "underlined", colorScheme: "warning" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").underlined.warning);
		});
	});

	// Hata renk şeması varyantları testleri
	context("Error Variants", () => {
		it("contained", () => {
			setup({ variant: "contained", colorScheme: "error" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").contained.error);
		});

		it("outlined", () => {
			setup({ variant: "outlined", colorScheme: "error" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").outlined.error);
		});

		it("underlined", () => {
			setup({ variant: "underlined", colorScheme: "error" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").underlined.error);
		});
	});

	// Bilgi renk şeması varyantları testleri
	context("Info Variants", () => {
		it("contained", () => {
			setup({ variant: "contained", colorScheme: "info" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").contained.info);
		});

		it("outlined", () => {
			setup({ variant: "outlined", colorScheme: "info" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").outlined.info);
		});

		it("underlined", () => {
			setup({ variant: "underlined", colorScheme: "info" });

			cy.getByTestId("button").should("have.class", buttonColorScheme("dark").underlined.info);
		});
	});

	// Buton boyutları testleri
	context("Size", () => {
		// Küçük boyut testi
		it("sm", () => {
			setup({ size: "sm" });

			cy.getByTestId("button").should("have.class", buttonSizeScheme.sm);
		});

		// Orta boyut testi
		it("md", () => {
			setup({ size: "md" });

			cy.getByTestId("button").should("have.class", buttonSizeScheme.md);
		});

		// Büyük boyut testi
		it("lg", () => {
			setup({ size: "lg" });

			cy.getByTestId("button").should("have.class", buttonSizeScheme.lg);
		});

		// Çok büyük boyut testi
		it("xl", () => {
			setup({ size: "xl" });

			cy.getByTestId("button").should("have.class", buttonSizeScheme.xl);
		});

		// En büyük boyut testi
		it("2xl", () => {
			setup({ size: "2xl" });

			cy.getByTestId("button").should("have.class", buttonSizeScheme["2xl"]);
		});
	});
});
