import { Toggle } from "@/index";
import type { IRadioBox } from "@/interfaces/components/inputs/IRadioBox";
import { common } from "@/styles/tailwind/colors/Common";
import { custom } from "@/styles/tailwind/colors/Custom";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";

const setup = (props: Omit<IRadioBox, "name">) => {
	cy.mount(<Toggle {...props} name="test-toggle" />);
};

describe("Toggle Component", () => {
	it("should render correctly", () => {
		setup({});

		cy.getByTestId("toggle-label")
			.should("be.visible")
			.haveCSS({
				position: "relative",
				display: "inline-block",
				cursor: "pointer",
				borderRadius: "9999px",
				backgroundColor: getCSSVariableValue(custom.divider),
				height: remToPx(1.5),
				width: remToPx(2.5),
			});

		cy.getByTestId("toggle-input").should("exist");

		cy.getByTestId("toggle-icon")
			.should("be.visible")
			.haveCSS({
				position: "absolute",
				top: "0px",
				bottom: "0px",
				display: "flex",
				justifyContent: "center",
				borderRadius: "9999px",
				backgroundColor: getCSSVariableValue(common.white),
				height: remToPx(1),
				width: remToPx(1),
			});
	});

	it("should toggle when onClick", () => {
		setup({});

		cy.wait(500);

		cy.getByTestId("toggle-icon").should("be.visible");
		cy.getByTestId("toggle-input").should("not.be.checked");

		// İlk tıklama
		cy.getByTestId("toggle-label").click();
		cy.getByTestId("toggle-input").should("be.checked");

		// İkinci tıklama
		cy.getByTestId("toggle-label").click();
		cy.getByTestId("toggle-input").should("not.be.checked");
	});
});
