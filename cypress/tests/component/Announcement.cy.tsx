import { Announcement } from "@/components/Announcement";
import type { IAnnouncement } from "@/interfaces/components/IAnnouncement";
import { common } from "@/styles/tailwind/colors/Common";
import { error } from "@/styles/tailwind/colors/Error";
import { info } from "@/styles/tailwind/colors/Info";
import { primary } from "@/styles/tailwind/colors/Primary";
import { secondary } from "@/styles/tailwind/colors/Secondary";
import { success } from "@/styles/tailwind/colors/Success";
import { warning } from "@/styles/tailwind/colors/Warning";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";
import { MemoryRouter } from "react-router-dom";

// Test kurulumu için yardımcı fonksiyon
const setup = (props: IAnnouncement) => {
	cy.mount(
		<MemoryRouter>
			<Announcement {...props} />
		</MemoryRouter>,
	);
};

describe("Announcement", () => {
	// Temel duyuru bileşeninin doğru şekilde render edildiğini kontrol eder
	it("should render", () => {
		setup({ id: "1", content: "Test" });

		cy.getByTestId("announcement-1")
			.should("be.visible")
			.and("have.id", "1")
			.and("have.text", "Test")
			.haveCSS({
				// CSS özelliklerinin doğru uygulandığını kontrol eder
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: `${innerWidth}px`,
				padding: `${remToPx(0.5)} ${remToPx(1)}`,
				backgroundColor: getCSSVariableValue(primary.main),
				color: getCSSVariableValue(common.white),
			});
	});

	// Kapatma butonu olmadan render edildiğini kontrol eder
	it("should render not closable", () => {
		setup({ id: "1", content: "Test", isClosable: false });

		cy.getByTestId("announcement-1-closable").should("not.exist");
	});

	// Kapatma butonuna tıklandığında duyurunun kaybolduğunu kontrol eder
	it("should close to announcement when clicking on the close button", () => {
		setup({ id: "1", content: "Test" });

		cy.getByTestId("announcement-1-closable").click();

		cy.getByTestId("announcement-1").should("not.exist");
	});

	// Link içeren duyurunun doğru şekilde render edildiğini kontrol eder
	it("should render with link", () => {
		setup({ id: "1", content: { to: "/test", label: "Test" } });

		cy.getByTestId("announcement-1-link").should("have.attr", "href", "/test");
	});

	// Renk şemasına göre duyurunun doğru şekilde render edildiğini kontrol eder
	it("should render corectly based on colorScheme", () => {
		setup({ id: "1", content: "Test", colorScheme: "primary" });

		cy.getByTestId("announcement-1").should("have.css", "background-color", getCSSVariableValue(primary.main));

		setup({ id: "1", content: "Test", colorScheme: "secondary" });

		cy.getByTestId("announcement-1").should("have.css", "background-color", getCSSVariableValue(secondary.main));

		setup({ id: "1", content: "Test", colorScheme: "success" });

		cy.getByTestId("announcement-1").should("have.css", "background-color", getCSSVariableValue(success.main));

		setup({ id: "1", content: "Test", colorScheme: "error" });

		cy.getByTestId("announcement-1").should("have.css", "background-color", getCSSVariableValue(error.main));

		setup({ id: "1", content: "Test", colorScheme: "warning" });

		cy.getByTestId("announcement-1").should("have.css", "background-color", getCSSVariableValue(warning.main));

		setup({ id: "1", content: "Test", colorScheme: "info" });

		cy.getByTestId("announcement-1").should("have.css", "background-color", getCSSVariableValue(info.main));
	});
});
