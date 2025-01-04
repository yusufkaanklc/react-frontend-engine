import { tabs } from "#/cypress/fixtures/stories/ExampleTabData";
import { Tab } from "@/components/Tab";
import type { ITab } from "@/interfaces/components/ITab";
import { color } from "@/styles/tailwind/colors/Color";
import { common } from "@/styles/tailwind/colors/Common";
import { primary } from "@/styles/tailwind/colors/Primary";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";

// Tab bileşenini test için hazırlayan yardımcı fonksiyon
const setup = (props: ITab) => {
	cy.mount(
		<div className="h-screen flex justify-center items-center">
			<Tab {...props} />
		</div>,
	);
};

describe("Tab Component", () => {
	// Varsayılan özelliklerle render testi
	it("should render with default props", () => {
		setup({ tabs, selectedTab: tabs[0].value });

		cy.getByTestId("tab")
			.should("be.visible")
			.haveCSS({
				display: "flex",
				overflowY: "hidden",
				overflowX: "auto",
				gap: `${remToPx(1.5)}px`,
				flexDirection: "row",
			});

		cy.getByTestId("tab-item")
			.should("be.visible")
			.and("have.length", 2)
			.each((item, index) => {
				const commonStyles = {
					flexShrink: "0",
					borderRadius: `${remToPx(0.5)}px`,
					cursor: "pointer",
					padding: `${remToPx(0.5)}px ${remToPx(1)}px`,
					fontSize: `${remToPx(0.875)}px`,
				};
				cy.wrap(item)
					.and("have.text", `${tabs[index].label} `)
					.should("have.attr", "data-activated", index === 0 ? "true" : "false")
					.haveCSS(
						index === 0
							? {
									...commonStyles,
									opacity: "1",
									backgroundColor: getCSSVariableValue(primary.main),
									color: getCSSVariableValue(common.white),
								}
							: {
									...commonStyles,
									opacity: "0.8",
									color: getCSSVariableValue(color.primary),
								},
					);
			});
	});

	// Dikey yönde render testi
	it("should render with vertical direction", () => {
		setup({ tabs, selectedTab: tabs[0].value, direction: "vertical" });

		cy.getByTestId("tab")
			.should("be.visible")
			.haveCSS({
				flexDirection: "column",
				gap: `${remToPx(0.75)}px`,
			});
	});

	// Farklı boyutlarda render testi
	it("should render with size", () => {
		setup({ tabs, selectedTab: tabs[0].value, size: "sm" });

		cy.getByTestId("tab-item").haveCSS({
			padding: `${remToPx(0.25)}px ${remToPx(0.5)}px`,
			fontSize: `${remToPx(0.75)}px`,
		});

		setup({ tabs, selectedTab: tabs[0].value, size: "md" });

		cy.getByTestId("tab-item").haveCSS({
			padding: `${remToPx(0.5)}px ${remToPx(1)}px`,
			fontSize: `${remToPx(0.875)}px`,
		});

		setup({ tabs, selectedTab: tabs[0].value, size: "lg" });

		cy.getByTestId("tab-item").haveCSS({
			padding: `${remToPx(0.75)}px ${remToPx(1.5)}px`,
			fontSize: `${remToPx(0.875)}px`,
		});

		setup({ tabs, selectedTab: tabs[0].value, size: "xl" });

		cy.getByTestId("tab-item").haveCSS({
			padding: `${remToPx(1)}px ${remToPx(2)}px`,
			fontSize: `${remToPx(1)}px`,
		});

		setup({ tabs, selectedTab: tabs[0].value, size: "2xl" });

		cy.getByTestId("tab-item").haveCSS({
			padding: `${remToPx(1.25)}px ${remToPx(2.5)}px`,
			fontSize: `${remToPx(1)}px`,
		});
	});

	// onChange olayının çalışma testi
	it("should render with onChange", () => {
		setup({ tabs, selectedTab: tabs[0].value, onChange: cy.stub().as("onChange") });

		cy.getByTestId("tab-item").first().click();
		cy.get("@onChange").should("have.been.calledWith", tabs[0].value);
	});

	// Klavye etkileşimi testi
	it("should render with onKeyDown", () => {
		setup({ tabs, selectedTab: tabs[0].value, onChange: cy.stub().as("onChange") });

		cy.getByTestId("tab-item").each((item, index) => {
			if (index === 1) {
				cy.wrap(item).click();
				cy.get("@onChange").should("have.been.calledWith", tabs[1].value);
			}
		});
	});
});
